import "dotenv/config";
import express from "express";
import cors from "cors";
import dishesRouter from "./routes/dishes.js";
import categoriesRouter from "./routes/categories.js";

const app = express();
const port = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/dishes", dishesRouter);
app.use("/api/categories", categoriesRouter);

// Manejo unificado de errores: nunca se filtran detalles internos.
app.use((error, req, res, _next) => {
  console.error(error);

  const status = error?.status ?? 500;
  const message =
    status < 500
      ? error?.message ?? "Solicitud invalida."
      : "Error interno del servidor.";

  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`API de La Placita escuchando en http://localhost:${port}`);
});