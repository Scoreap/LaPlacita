import { readFileSync } from "fs";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../src/firebase.js";

const IMG_DIR =
  "C:/Users/herre/AppData/Local/Temp/claude/c--Users-herre-OneDrive-Escritorio-Personal-Universidad-2026-Segundo-Ciclo-ProgramacionWeb-LaPlacita/9eb18e6d-3d34-4409-abfc-617fc2cd41dc/scratchpad/imgs";

// docId -> { file, name } (for logging)
const dishImages = {
  "0Kbs03EWl75q0AwspsUj": { file: "chalupas.jpg", name: "Chalupas" },
  "0MrYu6MtPfoWUGGfrpFU": { file: "tacosdorados.jpg", name: "Tacos Dorados" },
  "1c4TNttu6q5Pip7jkR30": { file: "ceviche.jpg", name: "Ceviche de Camarón" },
  "1pvP7GKD1VAHokL6lpe9": { file: "kakik.jpg", name: "Kak'ik" },
  "2PAoH6y0RNY0cItUVPIu": { file: "batidobanano.jpg", name: "Batido de Banano" },
  "3BGZuILXVu7iMYWOVZPH": { file: "atolshuco.jpg", name: "Atol Shuco" },
  "5006r7BloAyH87QcBueU": { file: "frijolesvolteados.jpg", name: "Frijoles Volteados" },
  "5Ro2hf3obMrbUSy5OcsI": { file: "carneguisada.jpg", name: "Carne Guisada con Arroz" },
  "7odlkVFZNd1FDEyQF3Y3": { file: "nachosqueso.jpg", name: "Nachos con Queso" },
  "7tIky3HwW0Xf5TYdmNXG": { file: "empanadascarne.jpg", name: "Empanadas de Carne" },
  "84mt5r7EevWpaCpx5HZn": { file: "frescotamarindo.jpg", name: "Fresco de Tamarindo" },
  "8Epp10Nc4YNxAcDbUxLD": { file: "pepian.jpg", name: "Pepián de Pollo" },
  DQkWvwOmoI0CFiUTPsas: { file: "tortillasmaiz.jpg", name: "Tortillas de Maíz (orden)" },
  Fq7drLVCFxeglTZ7N3zj: { file: "platanosmole.jpg", name: "Plátanos en Mole con Crema" },
  HqjddF7Nej9DeRnpfv11: { file: "chilesrellenos.jpg", name: "Chiles Rellenos" },
  IWgOxFGRStqdjYoiE9sX: { file: "arrozblanco.jpg", name: "Arroz Blanco" },
  JVLoljqndpCYMAMbGNV0: { file: "guacamole.jpg", name: "Guacamole" },
  N98o6nbxpaqD480x3Mcu: { file: "curtido.jpg", name: "Curtido de Verduras" },
  PtWvgu5LEbG6kEmhTuX5: { file: "pollodorado.jpg", name: "Pollo Dorado con Papas" },
  QRbBtQpdNvjLXYSvRmzh: { file: "chilaquiles.jpg", name: "Chilaquiles Guatemaltecos" },
  Thpd7oQy5pn6zsG79nnk: { file: "tehelado.jpg", name: "Té Helado de Jamaica" },
  U6nkguaGOzBwoLDxphyc: { file: "atolelote.jpg", name: "Atol de Elote con Pan" },
  UPXUSHN5w2E6Hxa6zJtP: { file: "chirmol.jpg", name: "Chirmol" },
  UgbOqlOOxxE7nDT8qNTr: { file: "moshavena.jpg", name: "Mosh de Avena" },
  WBunubfRwanaQRQ7q6XK: { file: "huevosrancheros.jpg", name: "Huevos Rancheros" },
  WW2ABfYpthTX395mndrH: { file: "tostadasguac.jpg", name: "Tostadas de Guacamole" },
  YQxEwIuPkHaVDSQSibci: { file: "sopatortilla.jpg", name: "Sopa de Tortilla" },
  g8loSVEQEogsFS3XyFBd: { file: "tostadasfrijol.jpg", name: "Tostadas de Frijol" },
  gzNFuqErYo0tlHpdWz5J: { file: "quesofresco.jpg", name: "Queso Fresco" },
  hW2Y9m0KGz5fuZICKU0d: { file: "filetepescado.jpg", name: "Filete de Pescado a la Plancha" },
  havySjDvnRpCsqwIKg2g: { file: "caldores.jpg", name: "Caldo de Res" },
  jtzNxvYmgsWlZFtoD6OR: { file: "desayunoamericano.jpg", name: "Desayuno Americano" },
  n5n3uhl3LQYzjveGQdmL: { file: "limonadamenta.jpg", name: "Limonada con Menta" },
  rVQHt51a0VoWU45LwB4Z: { file: "panfrijolqueso.jpg", name: "Pan con Frijol y Queso" },
  tfAHbVMyJWAdCSTRoOqh: { file: "platanosfritos.jpg", name: "Plátanos Fritos" },
  xF9tZAT4Zin00s2EeFFi: { file: "desayunochapin.jpg", name: "Desayuno Chapín" },
  y30wip4BcSH5T8e4ATfi: { file: "sopaverduras.jpg", name: "Sopa de Verduras" },
  ypqEpPIK2uvp5Xt9QpRd: { file: "jugonaranja.jpg", name: "Jugo de Naranja Natural" },
  zq4H9JBIGZt0GbA8r7cz: { file: "horchata.jpg", name: "Horchata" },
  zyjCXmLHfCxdjCRWuuhD: { file: "cafeolla.jpg", name: "Café de Olla" },
};

const entries = Object.entries(dishImages);
let updated = 0;
let totalBytes = 0;

for (const [docId, { file, name }] of entries) {
  const filePath = `${IMG_DIR}/${file}`;
  const buffer = readFileSync(filePath);
  const base64 = buffer.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;
  totalBytes += dataUri.length;

  await updateDoc(doc(db, "dishes", docId), { image: dataUri });
  updated += 1;
  console.log(
    `(${updated}/${entries.length}) ${name} [${docId}] - ${(buffer.length / 1024).toFixed(
      1
    )} KB image, ${(dataUri.length / 1024).toFixed(1)} KB as data URI`
  );
}

console.log(`\nListo: ${updated} platillos actualizados con imagen.`);
console.log(`Total data URI payload: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
process.exit(0);
