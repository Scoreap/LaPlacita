import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Cliente Prisma reutilizable (instancia unica por proceso).
// Prisma 7 conecta via driver adapter a PostgreSQL de Supabase.
// La conexion usa DATABASE_URL desde el entorno (.env).
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export default prisma;