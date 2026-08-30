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
// VARIABLES GLOBALES
// =========================================================
const TEL_WHATSAPP = "+584149765297"; 
let carrito = [];
let productos = []; // Se llena dinámicamente desde Firestore

// Elementos del DOM
const catalogGrid = document.getElementById("catalog-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

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
        renderProducts();
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

// =========================================================
// RENDERIZADO DEL CATÁLOGO
// =========================================================
function generarCardHTML(prod) {
    let selectTonosHTML = "";

    if (prod.tonos && prod.tonos.length > 0) {
        const options = prod.tonos.map(t => `<option value="${t}">${t}</option>`).join('');
        selectTonosHTML = `
            <div class="shade-select-box">
                <label for="select-${prod.id}" class="shade-label">Selecciona tu tono:</label>
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

    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-id", prod.id);
    card.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
            <img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy">
            <div class="image-overlay"></div>
        </div>
        <div class="product-info">
            <span class="category-tag">${prod.categoria}</span>
            <h3 class="product-title">${prod.nombre}</h3>
            <p class="product-description">${prod.descripcion || ""}</p>

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

function renderProducts(categoryFilter = "todos") {
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = "";

    // 1. Ordenar la lista alfabéticamente (A-Z)
    const productosOrdenados = [...productos].sort((a, b) => 
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

    // 2. Filtrar por categoría
    const filteredProducts = categoryFilter === "todos" 
        ? productosOrdenados 
        : productosOrdenados.filter(p => p.categoria === categoryFilter);

    if (filteredProducts.length === 0) {
        catalogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No hay productos en esta categoría por el momento.</p>`;
        return;
    }

    // 3. Renderizar en pantalla
    filteredProducts.forEach(prod => {
        const cardNode = generarCardHTML(prod);
        catalogGrid.appendChild(cardNode);
    });
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
// LÓGICA DEL BUSCADOR
// =========================================================
function filtrarPorNombre() {
    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search");

    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    if (clearBtn) {
        clearBtn.style.display = query.length > 0 ? "block" : "none";
    }

    if (query.length > 0) {
        filterButtons.forEach(b => b.classList.remove("active"));
    } else {
        const btnTodos = document.querySelector('.filter-btn[data-category="todos"]');
        if (btnTodos) btnTodos.classList.add("active");
    }

    if (!catalogGrid) return;

    const resultados = productos.filter(p => 
        p.nombre.toLowerCase().includes(query) || 
        (p.descripcion && p.descripcion.toLowerCase().includes(query))
    );

    resultados.sort((a, b) => 
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

    catalogGrid.innerHTML = "";

    if (resultados.length === 0) {
        catalogGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem;">
                <p style="font-size: 1.1rem; color: var(--dark, #222); font-weight: 600;">No encontramos productos con "${query}"</p>
                <p style="font-size: 0.85rem; color: var(--text-gray, #666); margin-top: 5px;">Intenta buscar con otra palabra como "Base", "Ruby Rose" o "Dolce Bella".</p>
            </div>
        `;
        return;
    }

    resultados.forEach(prod => {
        const cardNode = generarCardHTML(prod);
        catalogGrid.appendChild(cardNode);
    });
}

function limpiarBuscador() {
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.value = "";
        filtrarPorNombre();
    }
}

// =========================================================
// REGISTRO GLOBAL Y EVENT LISTENERS
// =========================================================

// Exposición al objeto window para soportar eventos HTML (onclick, oninput)
window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.toggleCartModal = toggleCartModal;
window.enviarPedidoWhatsApp = enviarPedidoWhatsApp;
window.filtrarPorNombre = filtrarPorNombre;
window.limpiarBuscador = limpiarBuscador;

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const searchInput = document.getElementById("search-input");
        const clearBtn = document.getElementById("clear-search");
        
        if (searchInput) searchInput.value = "";
        if (clearBtn) clearBtn.style.display = "none";

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-category");
        renderProducts(category);
    });
});

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
    obtenerProductosFirestore();
});