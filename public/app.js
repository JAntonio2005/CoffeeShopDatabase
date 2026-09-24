const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN"
});

const state = {
  clientes: [],
  productos: [],
  pedidos: [],
  ranking: []
};

const $ = (selector) => document.querySelector(selector);

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `Error al consultar ${url}`);
  }
  return response.json();
}

function renderClientes() {
  $("#clientes-list").innerHTML = state.clientes
    .map((cliente) => {
      const direccion = cliente.direccion || {};
      return `
        <article class="document-card">
          <strong>${cliente.nombre} ${cliente.apellido}</strong>
          <small>${cliente.correo_electronico}</small>
          <p class="muted">${direccion.calle || ""} ${direccion.numero || ""}, ${direccion.colonia || ""}</p>
        </article>
      `;
    })
    .join("");
}

function renderProductos() {
  $("#productos-list").innerHTML = state.productos
    .map((producto) => {
      const disponibilidad = producto.disponibilidad ? "Disponible" : "No disponible";
      return `
        <article class="document-card">
          <strong>${producto.nombre}</strong>
          <small>${producto.categoria} · ${disponibilidad}</small>
          <p class="money">${formatter.format(producto.precio)}</p>
          <p class="muted">${(producto.ingredientes || []).join(", ")}</p>
        </article>
      `;
    })
    .join("");
}

function renderPedidos() {
  $("#pedidos-list").innerHTML = state.pedidos
    .map((pedido) => {
      const productos = pedido.productos
        .map(
          (producto) => `
            <div class="item-row">
              <span>${producto.cantidad} x ${producto.nombre}</span>
              <span class="money">${formatter.format(producto.subtotal)}</span>
            </div>
          `
        )
        .join("");

      return `
        <article class="order-card">
          <div class="order-top">
            <div>
              <strong>${pedido.cliente.nombre} ${pedido.cliente.apellido}</strong>
              <p class="muted">${pedido.fecha}</p>
            </div>
            <span class="badge">${pedido.estado}</span>
          </div>
          <div class="items">${productos}</div>
          <div class="item-row">
            <strong>Total</strong>
            <strong class="money">${formatter.format(pedido.total)}</strong>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderRanking() {
  $("#ranking-list").innerHTML = state.ranking
    .map(
      (producto, index) => `
        <div class="ranking-row">
          <div>
            <strong>${index + 1}. ${producto.nombre}</strong>
            <p class="muted">${producto.categoria} · ${producto.unidades_vendidas} unidades</p>
          </div>
          <span class="money">${formatter.format(producto.importe_total)}</span>
        </div>
      `
    )
    .join("");
}

function renderMetrics() {
  $("#metric-clientes").textContent = state.clientes.length;
  $("#metric-productos").textContent = state.productos.length;
  $("#metric-pedidos").textContent = state.pedidos.length;
  $("#metric-ventas").textContent = formatter.format(
    state.pedidos.reduce((total, pedido) => total + Number(pedido.total || 0), 0)
  );
}

function renderError(error) {
  $("#db-status").className = "status error";
  $("#db-status").textContent = error.message;
  $("#pedidos-list").innerHTML = `
    <div class="error-box">
      No se pudieron cargar los datos. Verifica que MongoDB este activo, que el archivo .env tenga MONGODB_URI y que hayas ejecutado npm run seed.
    </div>
  `;
}

async function init() {
  try {
    const health = await fetchJson("/api/health");
    $("#db-status").className = "status ok";
    $("#db-status").textContent = `Conectado a ${health.database}`;

    const [clientes, productos, pedidos, ranking] = await Promise.all([
      fetchJson("/api/clientes"),
      fetchJson("/api/productos"),
      fetchJson("/api/pedidos"),
      fetchJson("/api/reportes/productos-mas-vendidos")
    ]);

    state.clientes = clientes;
    state.productos = productos;
    state.pedidos = pedidos;
    state.ranking = ranking;

    renderMetrics();
    renderClientes();
    renderProductos();
    renderPedidos();
    renderRanking();
  } catch (error) {
    renderError(error);
  }
}

init();
