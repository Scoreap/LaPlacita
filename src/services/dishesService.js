import { supabase } from "../supabaseClient";

const DISHES_TABLE = "dishes";
const CATEGORIES_TABLE = "categories";
const DISH_IMAGES_BUCKET = "dish-images";

// "category" viene normalizado en su propia tabla (relacion 1-a-muchos:
// una categoria tiene muchos platillos). Aqui se hace el join y se
// aplana el resultado para que el resto de la app siga viendo
// dish.category como un string, igual que en Firestore.
function flattenDish({ categories, ...dish }) {
  return { ...dish, category: categories?.name ?? null };
}

export function subscribeToDishes(onChange, onError) {
  let isActive = true;

  async function loadDishes() {
    const { data, error } = await supabase
      .from(DISHES_TABLE)
      .select("*, categories(name)")
      .order("created_at", { ascending: true });

    if (!isActive) {
      return;
    }

    if (error) {
      onError?.(error);
      return;
    }

    onChange(data.map(flattenDish));
  }

  loadDishes();

  const channel = supabase
    .channel("dishes-changes")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: DISHES_TABLE },
      loadDishes,
    )
    .subscribe();

  return () => {
    isActive = false;
    supabase.removeChannel(channel);
  };
}

async function uploadDishImage(file) {
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

async function resolveCategoryId(categoryName) {
  const { data, error } = await supabase
    .from(CATEGORIES_TABLE)
    .select("id")
    .eq("name", categoryName)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    throw new Error(`Categoria desconocida: ${categoryName}`);
  }

  return data.id;
}

export async function createDish({ category, ...dish }) {
  const [image, category_id] = await Promise.all([
    resolveImage(dish.image),
    resolveCategoryId(category),
  ]);

  const { error } = await supabase
    .from(DISHES_TABLE)
    .insert({ ...dish, image, category_id });

  if (error) {
    throw error;
  }
}

export async function updateDish(id, { category, ...dish }) {
  const payload = { ...dish };

  if ("image" in payload) {
    payload.image = await resolveImage(payload.image);
  }

  if (category !== undefined) {
    payload.category_id = await resolveCategoryId(category);
  }

  const { error } = await supabase
    .from(DISHES_TABLE)
    .update(payload)
    .eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteDish(id) {
  const { error } = await supabase.from(DISHES_TABLE).delete().eq("id", id);

  if (error) {
    throw error;
  }
}
