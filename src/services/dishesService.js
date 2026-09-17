import { supabase } from "../supabaseClient";

const DISHES_TABLE = "dishes";
const DISH_IMAGES_BUCKET = "dish-images";

// Todas las consultas de datos se resuelven a traves de la API
// (server -> Prisma -> PostgreSQL de Supabase). En desarrollo Vite
// redirige /api a la API local (vite.config.js -> proxy).
const API_BASE = "/api";

async function fetchJson(url, options) {
  const response = await fetch(url, options);

  let body = null;

  try {
    body = await response.json();
  } catch {
    // Respuesta sin JSON (p.ej. index.html servido fuera del proxy /api).
  }

  if (!response.ok) {
    const message = body?.error ?? `Error ${response.status}`;
    throw new Error(message);
  }

  if (body === null) {
    throw new Error("La API no respondió correctamente.");
  }

  return body;
}

// Lee los platillos desde la API. Supabase sigue como infraestructura:
// el canal de realtime de "dishes" solo avisa que algo cambio y aqui se
// vuelve a consultar; los datos siempre provienen de Prisma.
export function subscribeToDishes(onChange, onError) {
  let isActive = true;

  async function loadDishes() {
    try {
      const data = await fetchJson(`${API_BASE}/dishes`);

      if (!Array.isArray(data)) {
        throw new Error("La API respondió con un formato inesperado.");
      }

      if (isActive) {
        onChange(data);
      }
    } catch (error) {
      if (isActive) {
        onError?.(error);
      }
    }
  }

  loadDishes();

  let channel = null;

  if (supabase) {
    channel = supabase
      .channel("dishes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: DISHES_TABLE },
        loadDishes,
      )
      .subscribe();
  }

  return () => {
    isActive = false;
    if (channel) {
      supabase.removeChannel(channel);
    }
  };
}

// El archivo de imagen se sube directamente a Supabase Storage (infraestructura)
// y a la API/Prisma se envia la URL publica resultante.
async function uploadDishImage(file) {
  if (!supabase) {
    throw new Error("Supabase no está configurado (faltan variables de entorno).");
  }

  const fileExt = file.name.split(".").pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from(DISH_IMAGES_BUCKET)
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(DISH_IMAGES_BUCKET).getPublicUrl(filePath);

  return publicUrl;
}

async function resolveImage(image) {
  if (image instanceof File) {
    return uploadDishImage(image);
  }

  return image;
}

export async function createDish({ category, ...dish }) {
  const image = await resolveImage(dish.image);

  // La API resuelve category_id por nombre y crea el platillo con Prisma.
  return fetchJson(`${API_BASE}/dishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...dish, image, category }),
  });
}

export async function updateDish(id, { category, ...dish }) {
  const payload = { ...dish };

  if ("image" in payload) {
    payload.image = await resolveImage(payload.image);
  }

  if (category !== undefined) {
    payload.category = category;
  }

  return fetchJson(`${API_BASE}/dishes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteDish(id) {
  const response = await fetch(`${API_BASE}/dishes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `Error ${response.status}`);
  }
}