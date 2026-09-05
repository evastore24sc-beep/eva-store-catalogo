// =========================================================
// IMPORTACIONES Y CONFIGURACIÓN DE FIREBASE
// =========================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCDUZnd4TfgbU1qyIKzJGUWa02gtjWcVus",
    authDomain: "eva-store-catalogo.firebaseapp.com",
    projectId: "eva-store-catalogo",
    storageBucket: "eva-store-catalogo.firebasestorage.app",
    messagingSenderId: "1055387406352",
    appId: "1:1055387406352:web:ef5c3efe5025c65562ba95",
    measurementId: "G-93QPCD2QY7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========================================================
// VARIABLES GLOBALES Y ELEMENTOS DEL DOM
// =========================================================
const TEL_WHATSAPP = "+584149765297"; 
let carrito = [];
let productos = []; // Se llena dinámicamente desde Firestore
let categoriaSeleccionada = "todos";

const catalogGrid = document.getElementById("catalog-grid");

// =========================================================
// CARGA DESDE FIRESTORE
// =========================================================
async function obtenerProductosFirestore() {
    try {
        if (catalogGrid) {
            catalogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">Cargando productos...</p>`;
        }
        const querySnapshot = await getDocs(collection(db, "productos"));
        productos = [];
        querySnapshot.forEach((doc) => {
            productos.push({ id: doc.id, ...doc.data() });
        });
        aplicarFiltrosCatalogo();
    } catch (error) {
        console.error("Error al cargar productos desde Firestore:", error);
        if (catalogGrid) {
            catalogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #d32f2f; padding: 2rem;">Error al cargar el catálogo. Intenta de nuevo más tarde.</p>`;
        }
    }
}

// Formateador de precios en miles
function formatearPrecio(precio) {
    return Number(precio || 0).toLocaleString('es-CO');
}

// Helper para normalizar textos (elimina tildes y convierte a minúsculas)
function normalizarTexto(str) {
    if (!str) return "";
    return str.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// =========================================================
// RENDERIZADO DEL CATÁLOGO
// =========================================================
function generarCardHTML(prod) {
    let selectTonosHTML = "";

    if (prod.tonos && prod.tonos.length > 0) {
        const options = prod.tonos.map(t => `<option value="${t}">${t}</option>`).join('');
        selectTonosHTML = `
            <div class="shade-select-box">
                <label for="select-${prod.id}" class="shade-label">Tono:</label>
                <select id="select-${prod.id}" class="shade-dropdown">
                    ${options}
                </select>
            </div>
        `;
    }

    let badgeHTML = "";
    if (prod.badge) {
        const badgeClass = prod.badge.toLowerCase() === "hot" ? "badge-hot" : "badge-glow";
        badgeHTML = `<span class="badge ${badgeClass}">${prod.badgeText || prod.badge}</span>`;
    }

    // Botón desplegable para la descripción
    let descripcionHTML = "";
    if (prod.descripcion && prod.descripcion.trim() !== "") {
        descripcionHTML = `
            <details class="product-details-toggle">
                <summary class="btn-toggle-desc">Ver detalles</summary>
                <p class="product-description">${prod.descripcion}</p>
            </details>
        `;
    }

    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-id", prod.id);
    card.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
            <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy">
        </div>
        <div class="product-info">
            <span class="category-tag">${prod.categoria}</span>
            <h3 class="product-title">${prod.nombre}</h3>

            ${descripcionHTML}
            ${selectTonosHTML}

            <div class="product-footer">
                <div class="price-container">
                    <span class="currency">$</span>
                    <span class="price">${formatearPrecio(prod.precio)}</span>
                </div>
                <button class="btn-card-add" onclick="agregarAlCarrito('${prod.id}')">
                    <span>+ Agregar</span>
                </button>
            </div>
        </div>
    `;
    return card;
}

// Función principal que aplica Búsqueda + Categoría + Orden Alfabético
function aplicarFiltrosCatalogo() {
    if (!catalogGrid) return;

    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search");
    const query = searchInput ? normalizarTexto(searchInput.value) : "";

    if (clearBtn) {
        clearBtn.style.display = query.length > 0 ? "block" : "none";
    }

    // 1. Filtrar por Categoría y Texto de Búsqueda
    let resultados = productos.filter(p => {
        const catProducto = normalizarTexto(p.categoria);
        const catFiltro = normalizarTexto(categoriaSeleccionada);
        
        const coincideCategoria = (catFiltro === "todos" || catProducto === catFiltro);

        const nombreProd = normalizarTexto(p.nombre);
        const descProd = normalizarTexto(p.descripcion);
        const coincideTexto = query === "" || nombreProd.includes(query) || descProd.includes(query);

        return coincideCategoria && coincideTexto;
    });

    // 2. Ordenar alfabéticamente (A-Z)
    resultados.sort((a, b) => 
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

    // 3. Renderizar en el DOM
    catalogGrid.innerHTML = "";

    if (resultados.length === 0) {
        const msj = query 
            ? `No encontramos productos con "${searchInput.value}"`
            : `No hay productos disponibles en esta categoría.`;

        catalogGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;">
                <p style="font-size: 1.1rem; color: #222; font-weight: 600;">${msj}</p>
                <p style="font-size: 0.85rem; color: #666; margin-top: 5px;">Intenta explorar otras categorías o realizar una búsqueda diferente.</p>
            </div>
        `;
        return;
    }

    resultados.forEach(prod => {
        const cardNode = generarCardHTML(prod);
        catalogGrid.appendChild(cardNode);
    });
}

// =========================================================
// MENÚ LATERAL DE CATEGORÍAS
// =========================================================
function toggleMenuLateral(abrir) {
    const sidebar = document.getElementById("sidebar-menu");
    const overlay = document.getElementById("menu-overlay");

    if (sidebar && overlay) {
        if (abrir) {
            sidebar.classList.add("active");
            overlay.classList.add("active");
        } else {
            sidebar.classList.remove("active");
            overlay.classList.remove("active");
        }
    }
}

function filtrarCategoriaMain(categoria, btnElement) {
    categoriaSeleccionada = categoria;

    // Actualizar estilo activo en los botones del panel
    const botones = document.querySelectorAll(".btn-sidebar-cat");
    botones.forEach(btn => btn.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");

    // Reaplicar filtros y cerrar menú
    aplicarFiltrosCatalogo();
    toggleMenuLateral(false);

    // Desplazamiento fino hasta el buscador
    const searchContainer = document.querySelector(".search-container") || document.getElementById("search-input");
    
    if (searchContainer) {
        const offset = 190; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = searchContainer.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition < 0 ? 0 : offsetPosition,
            behavior: "smooth"
        });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

// =========================================================
// LÓGICA DEL BUSCADOR
// =========================================================
function filtrarPorNombre() {
    aplicarFiltrosCatalogo();
}

function limpiarBuscador() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.value = "";
        aplicarFiltrosCatalogo();
    }
}

// =========================================================
// FUNCIONES DEL CARRITO DE COMPRAS
// =========================================================
function agregarAlCarrito(idProducto) {
    const prod = productos.find(p => String(p.id) === String(idProducto));
    if (!prod) return;

    const select = document.getElementById(`select-${idProducto}`);
    const tonoSeleccionado = select ? select.value : "";

    const itemExistente = carrito.find(item => String(item.id) === String(idProducto) && item.tono === tonoSeleccionado);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: prod.id,
            nombre: prod.nombre,
            precio: prod.precio,
            tono: tonoSeleccionado,
            imagen: prod.imagen,
            cantidad: 1
        });
    }

    actualizarCarritoUI();
    toggleCartModal(true);
}

function cambiarCantidad(id, tono, cambio) {
    const item = carrito.find(i => String(i.id) === String(id) && i.tono === tono);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => !(String(i.id) === String(id) && i.tono === tono));
    }

    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (cartCount) cartCount.innerText = totalCantidad;

    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    if (cartTotal) cartTotal.innerText = `$${formatearPrecio(totalPrecio)}`;

    if (!cartItemsContainer) return;

    if (carrito.length === 0) {
        cartItemsContainer.innerHTML = `<p class="cart-empty-text">Tu carrito está vacío 🛍️</p>`;
        return;
    }

    cartItemsContainer.innerHTML = "";
    carrito.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.nombre}</h4>
                ${item.tono ? `<small class="cart-item-shade">Tono: ${item.tono}</small>` : ''}
                <span class="cart-item-price">$${formatearPrecio(item.precio * item.cantidad)}</span>
            </div>
            <div class="cart-item-controls">
                <button onclick="cambiarCantidad('${item.id}', '${item.tono}', -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad('${item.id}', '${item.tono}', 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

function toggleCartModal(forceOpen = false) {
    const modal = document.getElementById("cart-modal");
    if (!modal) return;
    if (forceOpen) {
        modal.classList.add("active");
    } else {
        modal.classList.toggle("active");
    }
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega algunos productos primero.");
        return;
    }

    let textoPedido = "Hola Eva Store 🦋, me gustaría realizar el siguiente pedido:\n\n";

    carrito.forEach((item, index) => {
        const tonoTxt = item.tono ? ` (Tono: ${item.tono})` : "";
        textoPedido += `${index + 1}. *${item.nombre}*${tonoTxt}\n   Cantidad: ${item.cantidad} x $${formatearPrecio(item.precio)} = *$${formatearPrecio(item.precio * item.cantidad)}*\n\n`;
    });

    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    textoPedido += `*Total a pagar: $${formatearPrecio(totalPrecio)}*`;

    const url = `https://wa.me/${TEL_WHATSAPP}?text=${encodeURIComponent(textoPedido)}`;
    window.open(url, "_blank");
}

// =========================================================
// REGISTRO GLOBAL Y CARGA INICIAL
// =========================================================
window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.toggleCartModal = toggleCartModal;
window.enviarPedidoWhatsApp = enviarPedidoWhatsApp;
window.filtrarPorNombre = filtrarPorNombre;
window.limpiarBuscador = limpiarBuscador;
window.toggleMenuLateral = toggleMenuLateral;
window.filtrarCategoriaMain = filtrarCategoriaMain;

// Carga inicial al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    obtenerProductosFirestore();
});