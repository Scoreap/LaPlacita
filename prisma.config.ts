import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Se usa fallback "" para que comandos offline como `prisma generate`
    // funcionen sin credenciales. Comandos que tocan la base de datos
    // (db pull, migrate, db push) requieren DATABASE_URL en .env.
    url: process.env.DATABASE_URL ?? "",
  },
});