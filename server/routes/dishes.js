import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

// "category" viene normalizado en su propia tabla (relacion 1-a-muchos:
// una categoria tiene muchos platillos). Aqui se hace el join y se
// aplana el resultado para que el resto de la app siga viendo
// dish.category como un string, igual que antes (Firestore/Supabase).
function flattenDish({ categories, ...dish }) {
  return { ...dish, category: categories?.name ?? null };
}

async function resolveCategoryId(categoryName) {
  if (categoryName === undefined || categoryName === null) {
    return null;
  }

  const category = await prisma.categories.findUnique({
    where: { name: categoryName },
    select: { id: true },
  });

  if (!category) {
    const err = new Error(`Categoria desconocida: ${categoryName}`);
    err.status = 400;
    throw err;
  }

  return category.id;
}

// GET /api/dishes -> lista todos los platillos ordenados por created_at (asc),
// con su categoria aplanada. Conserva el comportamiento de
// supabase.from("dishes").select("*, categories(name)").
router.get("/", async (req, res, next) => {
  try {
    const dishes = await prisma.dishes.findMany({
      include: { categories: true },
      orderBy: { created_at: "asc" },
    });

    res.json(dishes.map(flattenDish));
  } catch (error) {
    next(error);
  }
});

// GET /api/dishes/:id -> platillo individual con su categoria aplanada.
router.get("/:id", async (req, res, next) => {
  try {
    const dish = await prisma.dishes.findUnique({
      where: { id: req.params.id },
      include: { categories: true },
    });

    if (!dish) {
      return res.status(404).json({ error: "Platillo no encontrado." });
    }

    res.json(flattenDish(dish));
  } catch (error) {
    next(error);
  }
});

// POST /api/dishes -> crea un platillo.
// Body esperado: { name, description, price, category, image, visible }.
// "category" es el nombre de la categoria (igual que en el frontend).
router.post("/", async (req, res, next) => {
  try {
    const { name, description, price, category, image, visible } = req.body ?? {};

    if (!name) {
      return res.status(400).json({ error: "El campo 'name' es obligatorio." });
    }

    const category_id = await resolveCategoryId(category);

    const dish = await prisma.dishes.create({
      data: {
        name,
        description: description ?? null,
        price: price ?? 0,
        category_id,
        image: image ?? null,
        visible: visible ?? true,
      },
      include: { categories: true },
    });

    res.status(201).json(flattenDish(dish));
  } catch (error) {
    next(error);
  }
});

// PATCH /api/dishes/:id -> actualiza campos parciales.
// (PUT tambien se soporta como alias para completar el CRUD clasico.)
router.patch("/:id", updateDish);
router.put("/:id", updateDish);

async function updateDish(req, res, next) {
  try {
    const { name, description, price, category, image, visible } = req.body ?? {};

    const data = {};

    if (name !== undefined) {
      data.name = name;
    }

    if (description !== undefined) {
      data.description = description;
    }

    if (price !== undefined) {
      data.price = price;
    }

    if (image !== undefined) {
      data.image = image;
    }

    if (visible !== undefined) {
      data.visible = visible;
    }

    if (category !== undefined) {
      data.category_id = await resolveCategoryId(category);
    }

    const dish = await prisma.dishes.update({
      where: { id: req.params.id },
      data,
      include: { categories: true },
    });

    res.json(flattenDish(dish));
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Platillo no encontrado." });
    }

    next(error);
  }
}

// DELETE /api/dishes/:id -> elimina un platillo.
router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.dishes.delete({ where: { id: req.params.id } });

    res.status(204).end();
  } catch (error) {
    if (error?.code === "P2025") {
      return res.status(404).json({ error: "Platillo no encontrado." });
    }

    next(error);
  }
});

export default router;