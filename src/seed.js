import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { closeDb, getDb } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "..", "data", "documentos-ejemplo.json");

async function seed() {
  const file = await readFile(dataPath, "utf8");
  const data = JSON.parse(file);
  const db = await getDb();

  for (const collectionName of ["clientes", "productos", "pedidos"]) {
    const collection = db.collection(collectionName);
    await collection.deleteMany({});
    await collection.insertMany(data[collectionName]);
    console.log(`${collectionName}: ${data[collectionName].length} documentos insertados`);
  }

  await db.collection("clientes").createIndex({ correo_electronico: 1 }, { unique: true });
  await db.collection("productos").createIndex({ nombre: 1 });
  await db.collection("pedidos").createIndex({ "cliente.id_cliente": 1 });
  await db.collection("pedidos").createIndex({ estado: 1, fecha: -1 });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await closeDb();
  });
