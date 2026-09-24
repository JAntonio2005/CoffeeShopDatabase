import "dotenv/config";
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getDb } from "./db.js";

const app = express();
const port = Number(process.env.PORT || 3000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));

function normalizeId(document) {
  if (!document) {
    return document;
  }

  return {
    ...document,
    _id: document._id?.toString?.() ?? document._id
  };
}

app.get("/api/health", async (_request, response) => {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    response.json({
      ok: true,
      database: process.env.DB_NAME || "cafe_central"
    });
  } catch (error) {
    response.status(500).json({
      ok: false,
      message: "No se pudo conectar con MongoDB.",
      detail: error.message
    });
  }
});

app.get("/api/clientes", async (_request, response) => {
  const db = await getDb();
  const clientes = await db.collection("clientes").find({}).sort({ nombre: 1 }).toArray();
  response.json(clientes.map(normalizeId));
});

app.get("/api/productos", async (_request, response) => {
  const db = await getDb();
  const productos = await db.collection("productos").find({}).sort({ categoria: 1, nombre: 1 }).toArray();
  response.json(productos.map(normalizeId));
});

app.get("/api/pedidos", async (_request, response) => {
  const db = await getDb();
  const pedidos = await db.collection("pedidos").find({}).sort({ fecha: -1 }).toArray();
  response.json(pedidos.map(normalizeId));
});

app.get("/api/pedidos/cliente/:idCliente", async (request, response) => {
  const db = await getDb();
  const pedidos = await db
    .collection("pedidos")
    .find({ "cliente.id_cliente": request.params.idCliente })
    .sort({ fecha: -1 })
    .toArray();

  response.json(pedidos.map(normalizeId));
});

app.get("/api/reportes/productos-mas-vendidos", async (_request, response) => {
  const db = await getDb();
  const productos = await db
    .collection("pedidos")
    .aggregate([
      { $unwind: "$productos" },
      {
        $group: {
          _id: "$productos.id_producto",
          nombre: { $first: "$productos.nombre" },
          categoria: { $first: "$productos.categoria" },
          unidades_vendidas: { $sum: "$productos.cantidad" },
          importe_total: { $sum: "$productos.subtotal" }
        }
      },
      { $sort: { unidades_vendidas: -1, nombre: 1 } }
    ])
    .toArray();

  response.json(productos.map(normalizeId));
});

app.use((error, _request, response, _next) => {
  response.status(500).json({
    ok: false,
    message: "Error interno de la API.",
    detail: error.message
  });
});

app.listen(port, () => {
  console.log(`Cafe Central disponible en http://localhost:${port}`);
});
