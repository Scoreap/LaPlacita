import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/firebase.js";

const dishes = [
  // Desayuno
  { name: "Desayuno Chapín", description: "Frijoles volteados, plátano frito, crema, queso fresco y tortillas.", price: 35, category: "Desayuno", image: null },
  { name: "Huevos Rancheros", description: "Huevos estrellados sobre tortilla con salsa ranchera y frijoles.", price: 28, category: "Desayuno", image: null },
  { name: "Mosh de Avena", description: "Avena caliente con canela y leche.", price: 15, category: "Desayuno", image: null },
  { name: "Pan con Frijol y Queso", description: "Pan francés relleno de frijol volteado y queso fresco.", price: 12, category: "Desayuno", image: null },
  { name: "Plátanos en Mole con Crema", description: "Plátano maduro bañado en mole dulce con crema.", price: 18, category: "Desayuno", image: null },
  { name: "Chilaquiles Guatemaltecos", description: "Tortilla frita bañada en salsa de tomate con huevo y queso.", price: 30, category: "Desayuno", image: null },
  { name: "Desayuno Americano", description: "Huevos al gusto, tocino, pan tostado y fruta de temporada.", price: 40, category: "Desayuno", image: null },
  { name: "Atol de Elote con Pan", description: "Atol caliente de elote acompañado de pan dulce.", price: 16, category: "Desayuno", image: null },

  // Almuerzo-Cena
  { name: "Pepián de Pollo", description: "Guiso tradicional guatemalteco con pollo, verduras y arroz.", price: 45, category: "Almuerzo-Cena", image: null },
  { name: "Kak'ik", description: "Caldo de chompipe con especias, servido con tamalitos.", price: 50, category: "Almuerzo-Cena", image: null },
  { name: "Pollo Dorado con Papas", description: "Pollo frito acompañado de papas fritas y ensalada.", price: 42, category: "Almuerzo-Cena", image: null },
  { name: "Carne Guisada con Arroz", description: "Carne de res guisada en salsa criolla con arroz blanco.", price: 48, category: "Almuerzo-Cena", image: null },
  { name: "Chiles Rellenos", description: "Chiles rellenos de carne y verduras bañados en salsa de tomate.", price: 38, category: "Almuerzo-Cena", image: null },
  { name: "Caldo de Res", description: "Caldo con verduras y carne de res, servido con tortillas.", price: 40, category: "Almuerzo-Cena", image: null },
  { name: "Tacos Dorados", description: "Tacos fritos rellenos de carne, con crema y queso.", price: 32, category: "Almuerzo-Cena", image: null },
  { name: "Filete de Pescado a la Plancha", description: "Filete de pescado con arroz y ensalada.", price: 55, category: "Almuerzo-Cena", image: null },

  // Bebida
  { name: "Horchata", description: "Bebida fría de arroz con canela.", price: 12, category: "Bebida", image: null },
  { name: "Fresco de Tamarindo", description: "Refresco natural de tamarindo.", price: 10, category: "Bebida", image: null },
  { name: "Café de Olla", description: "Café tradicional endulzado con panela y canela.", price: 10, category: "Bebida", image: null },
  { name: "Limonada con Menta", description: "Limonada fresca con hojas de menta.", price: 12, category: "Bebida", image: null },
  { name: "Atol Shuco", description: "Bebida tradicional de maíz fermentado.", price: 8, category: "Bebida", image: null },
  { name: "Jugo de Naranja Natural", description: "Jugo recién exprimido.", price: 14, category: "Bebida", image: null },
  { name: "Té Helado de Jamaica", description: "Té frío de flor de jamaica.", price: 10, category: "Bebida", image: null },
  { name: "Batido de Banano", description: "Batido cremoso de banano con leche.", price: 16, category: "Bebida", image: null },

  // Entrada
  { name: "Nachos con Queso", description: "Totopos bañados en queso derretido.", price: 25, category: "Entrada", image: null },
  { name: "Tostadas de Guacamole", description: "Tostadas crujientes con guacamole fresco.", price: 20, category: "Entrada", image: null },
  { name: "Sopa de Verduras", description: "Sopa ligera de verduras de temporada.", price: 18, category: "Entrada", image: null },
  { name: "Empanadas de Carne", description: "Empanadas fritas rellenas de carne molida.", price: 22, category: "Entrada", image: null },
  { name: "Ceviche de Camarón", description: "Camarón marinado en limón con cebolla y cilantro.", price: 35, category: "Entrada", image: null },
  { name: "Chalupas", description: "Tortillas fritas con carne deshebrada y curtido.", price: 24, category: "Entrada", image: null },
  { name: "Tostadas de Frijol", description: "Tostadas con frijol refrito y queso.", price: 18, category: "Entrada", image: null },
  { name: "Sopa de Tortilla", description: "Sopa de tomate con tiras de tortilla frita.", price: 20, category: "Entrada", image: null },

  // Extra
  { name: "Tortillas de Maíz (orden)", description: "Seis tortillas hechas a mano.", price: 5, category: "Extra", image: null },
  { name: "Arroz Blanco", description: "Porción extra de arroz.", price: 8, category: "Extra", image: null },
  { name: "Frijoles Volteados", description: "Porción extra de frijol.", price: 8, category: "Extra", image: null },
  { name: "Curtido de Verduras", description: "Verduras encurtidas caseras.", price: 6, category: "Extra", image: null },
  { name: "Guacamole", description: "Porción de guacamole fresco.", price: 10, category: "Extra", image: null },
  { name: "Plátanos Fritos", description: "Porción de plátano maduro frito.", price: 10, category: "Extra", image: null },
  { name: "Chirmol", description: "Salsa fresca de tomate para acompañar.", price: 5, category: "Extra", image: null },
  { name: "Queso Fresco", description: "Porción de queso fresco artesanal.", price: 12, category: "Extra", image: null },
];

const dishesCollection = collection(db, "dishes");

let created = 0;
for (const dish of dishes) {
  await addDoc(dishesCollection, dish);
  created += 1;
  console.log(`(${created}/${dishes.length}) ${dish.category} - ${dish.name}`);
}

console.log(`\nListo: ${created} platillos agregados a Firestore.`);
process.exit(0);
