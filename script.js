// =========================================================
// NÚMERO DE WHATSAPP (Cámbialo por tu número con código de país)
// =========================================================
const TEL_WHATSAPP = "+584149765297"; 

// Estructura del Carrito
let carrito = [];

// =========================================================
// LISTA DE PRODUCTOS
// =========================================================
const productos = [
    {
        id: 6,
        nombre: "Base Raquel Detox",
        descripcion: "Ideal para quienes buscan un cubrimiento eficiente sin sensación pesada en todo el día.",
        precio: 34000,
        categoria: "rostro",
        imagen: "img/Base-raquel-detox.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono 01 - Avellana", "Tono 02 - Canela", "Tono 03 - Piel Clara"]
    },
    {
        id: 1,
        nombre: "Base Matte Liquida Dolce Bella",
        descripcion: "Base líquida de acabado mate, cobertura media a alta y larga duración. Contenido 30ml.",
        precio: 15000,
        categoria: "rostro",
        imagen: "img/base-mate-dolcebella2.jpg",
        badge: "hot",
        badgeText: "Más Vendido",
        tonos: ["Tono Light 01", "Tono Medium 02", "Tono Tan 03"]
    },
    {
        id: 2,
        nombre: "Base Ruby Rose Soft Mate",
        descripcion: "Base suave de alta cobertura con acabado mate terciopelo.",
        precio: 32000,
        categoria: "rostro",
        imagen: "img/Base-ruby-rose-soft-mate.jpeg",
        badge: "glow",
        badgeText: "Popular",
        tonos: ["Tono 1", "Tono 2", "Tono 3", "Tono 4", "Tono 6", "Tono 7"]
    },
    {
        id: 3,
        nombre: "Base 4 en 1 Radiant",
        descripcion: "Multifuncional: Útil como base, primer, corrector e iluminador.",
        precio: 10000,
        categoria: "rostro",
        imagen: "img/Base-radiant-4ft.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono Claro 01", "Tono Medio 02"]
    },
    {
        id: 4,
        nombre: "Corrector Bloomshell",
        descripcion: "Alta cobertura para ojeras e imperfecciones.",
        precio: 22000, 
        categoria: "rostro",
        imagen: "img/Corrector-Bloomshell.jpeg",
        badge: null,
        badgeText: "",
        tonos: ["Tono 00", "Tono 0.5", "Tono 03", "Tono 05", "Tono 4.5"]
    },
    {
        id: 5,
        nombre: "Bases Economicas Versatile",
        descripcion: "Base económica de uso diario.",
        precio: 8000,
        categoria: "rostro",
        imagen: "img/Base-economica.jpg",
        badge: "hot",
        badgeText: "Oferta",
        tonos: ["Tono Beige", "Tono Natural", "Tono Nude"]
    },
    {
        id: 7,
        nombre: "Base Mate Only Beauty",
        descripcion: "Diseñada para proporcionar un acabado suave y sin brillos.",
        precio: 15000,
        categoria: "rostro",
        imagen: "img/Base-only-beauty-mate.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono Porcelain", "Tono Warm Beige"]
    },
    {
        id: 8,
        nombre: "Base Ruby Rose Look Natural",
        descripcion: "Base ligera de cobertura media con acabado natural.",
        precio: 32000,
        categoria: "rostro",
        imagen: "img/Base-Ruby-Rose-Natural-Look.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Nude 1", "Nude 2", "Beige 2", "Beige 3"]
    },
    {
        id: 9,
        nombre: "BB Cream Trendy",
        descripcion: "Base ligera hidratante de uso diario.",
        precio: 15000,
        categoria: "rostro",
        imagen: "img/BB-cream.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 4"]
    }
];

// Formateador de precios en miles
function formatearPrecio(precio) {
    return precio.toLocaleString('es-CO');
}

// =========================================================
// RENDERIZADO DEL CATÁLOGO
// =========================================================

const catalogGrid = document.getElementById("catalog-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderProducts(categoryFilter = "todos") {
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = "";

    const filteredProducts = categoryFilter === "todos" 
        ? productos 
        : productos.filter(p => p.categoria === categoryFilter);

    if (filteredProducts.length === 0) {
        catalogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No hay productos en esta categoría por el momento.</p>`;
        return;
    }

    filteredProducts.forEach(prod => {
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
            badgeHTML = `<span class="badge ${badgeClass}">${prod.badgeText}</span>`;
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
                <p class="product-description">${prod.descripcion}</p>

                ${selectTonosHTML}

                <div class="product-footer">
                    <div class="price-container">
                        <span class="currency">$</span>
                        <span class="price">${formatearPrecio(prod.precio)}</span>
                    </div>
                    <button class="btn-card-add" onclick="agregarAlCarrito(${prod.id})">
                        <span>+ Agregar</span>
                    </button>
                </div>
            </div>
        `;
        catalogGrid.appendChild(card);
    });
}

// =========================================================
// FUNCIONES DEL CARRITO DE COMPRAS
// =========================================================

function agregarAlCarrito(idProducto) {
    const prod = productos.find(p => p.id === idProducto);
    if (!prod) return;

    const select = document.getElementById(`select-${idProducto}`);
    const tonoSeleccionado = select ? select.value : "";

    // Buscar si ya existe el producto con el MISMO tono en el carrito
    const itemExistente = carrito.find(item => item.id === idProducto && item.tono === tonoSeleccionado);

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
    toggleCartModal(true); // Abre el modal automáticamente al agregar
}

function cambiarCantidad(id, tono, cambio) {
    const item = carrito.find(i => i.id === id && i.tono === tono);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => !(i.id === id && i.tono === tono));
    }

    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    // Contador de items
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    cartCount.innerText = totalCantidad;

    // Calcular total
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    cartTotal.innerText = `$${formatearPrecio(totalPrecio)}`;

    // Renderizar lista en modal
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
                <button onclick="cambiarCantidad(${item.id}, '${item.tono}', -1)">-</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, '${item.tono}', 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

// Abrir/Cerrar Modal
function toggleCartModal(forceOpen = false) {
    const modal = document.getElementById("cart-modal");
    if (forceOpen) {
        modal.classList.add("active");
    } else {
        modal.classList.toggle("active");
    }
}

// Enviar a WhatsApp
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega algunos productos primero.");
        return;
    }

    let textoPedido = "Hola Eva Store, me gustaría realizar el siguiente pedido:\n\n";

    carrito.forEach((item, index) => {
        const tonoTxt = item.tono ? ` (Tono: ${item.tono})` : "";
        textoPedido += `${index + 1}. *${item.nombre}*${tonoTxt}\n   Cantidad: ${item.cantidad} x $${formatearPrecio(item.precio)} = *$${formatearPrecio(item.precio * item.cantidad)}*\n\n`;
    });

    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    textoPedido += `*Total a pagar: $${formatearPrecio(totalPrecio)}*`;

    const url = `https://wa.me/${TEL_WHATSAPP}?text=${encodeURIComponent(textoPedido)}`;
    window.open(url, "_blank");
}

// Filtros
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.getAttribute("data-category");
        renderProducts(category);
    });
});

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});