import { Router } from "express";
import prisma from "../lib/prisma.js";

const router = Router();

// GET /api/categories -> lista las categorias existentes.
router.get("/", async (req, res, next) => {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { name: "asc" },
    });

    res.json(categories);
  } catch (error) {
    next(error);
  }
});

export default router;