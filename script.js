// =========================================================
// NÚMERO DE WHATSAPP
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
        tonos: ["Tono 1A", "Tono 4", "Tono 6","Tono 7"]
    },
    {
        id: 1,
        nombre: "Base Matte Liquida Dolce Bella",
        descripcion: "Base líquida de acabado mate, cobertura media a alta y larga duración. Contenido 30ml.",
        precio: 24000,
        categoria: "rostro",
        imagen: "img/Base-Dolce-Bella.jpeg",
        badge: "hot",
        badgeText: "Más Vendido",
        tonos: ["Tono 2", "Tono 3", "Tono 4","Tono 5"]
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
        imagen: "img/Base-4en1.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 1", "Tono 2","Tono 3","Tono 4","Tono 5","Tono 6","Tono 7"]
    },
    {
        id: 4,
        nombre: "Corrector Bloomshell",
        descripcion: "Alta cobertura para ojeras e imperfecciones.",
        precio: 22000, 
        categoria: "rostro",
        imagen: "img/Corrector-Bloomshell.jpeg",
        badge: null,
        badgeText: "Nuevo",
        tonos: ["Tono 20", "Tono 30", "Tono 50"]
    },
    {
        id: 5,
        nombre: "Bases Economicas Versatile",
        descripcion: "Base económica de uso diario.",
        precio: 8000,
        categoria: "rostro",
        imagen: "img/Base-Economica.jpeg",
        badge: "hot",
        badgeText: "Oferta",
        tonos: ["Tono 01", "Tono 4"]
    },
    {
        id: 7,
        nombre: "Base Mate Only Beauty",
        descripcion: "Diseñada para proporcionar un acabado suave y sin brillos.",
        precio: 15000,
        categoria: "rostro",
        imagen: "img/Base-only-beauty-mate.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 10", "Tono 12"]
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
        tonos: ["Tono 1", "Tono 2", "Tono 3", "Tono 4","Tono 6","Tono 7"]
    },
    {
        id: 9,
        nombre: "BB Cream Trendy",
        descripcion: "Base ligera hidratante de uso diario.",
        precio: 15000,
        categoria: "rostro",
        imagen: "img/IMG_1457.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 4"]
    },
    {
        id: 10,
        nombre: "Corrector Dolce Bella liquido",
        descripcion: "Corrector de ojeras de alta cobertura y larga duración.",
        precio: 18000,
        categoria: "rostro",
        imagen: "img/Corrector-DolceBella-Liquido.jpeg",
        badge: "glow",
        badgeText: "Popular",
        tonos: ["Tono Honey","Tono Beige","Tono Yvori","Tono Tan"]
    },
    {
        id: 11,
        nombre: "Corrector Economico",
        descripcion: "Corrector Versatil.",
        precio: 8000,
        categoria: "rostro",
        imagen: "img/Corrector-Economico.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 105","Tono 04","Tono 06"]
    },
    {
        id: 12,
        nombre: "Corrector Pro.conceal",
        descripcion: "Base ligera hidratante de uso diario.",
        precio: 10000,
        categoria: "rostro",
        imagen: "img/Corrector-Pro-Conceal.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 1","Tono 2","Tono 3","Tono 4"]
    },
    {
        id: 13,
        nombre: "Corrector Trendy Mate",
        descripcion: "Resalta tu belleza natural con nuestros correctores líquidos y productos Trendy.",
        precio: 20000,
        categoria: "rostro",
        imagen: "img/Corrector-Trendy.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono 00"]
    },
    {
        id: 14,
        nombre: "Corrector Miss Cosmetics ",
        descripcion: "Corrector de alta cobertura.",
        precio: 15000,
        categoria: "rostro",
        imagen: "img/Corrector-Miss-Cosmetics.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono 1","Tono 2","Tono 3"]
    },
    {
        id: 15,
        nombre: "Corrector en Barra Dolce Bella",
        descripcion: "Ofrecer una alta cobertura para ocultar ojeras e imperfecciones con un acabado luminoso.",
        precio: 10000,
        categoria: "rostro",
        imagen: "img/Corrector-Barra-DolceBella.jpeg",
        badge: "glow",
        badgeText: "",
        tonos: ["Tono Honey"]
    },
    {
        id: 16,
        nombre: "Corrector Trendy Magic Mini",
        descripcion: "Corrector de maquillaje líquido de alta cobertura, larga duración y resistencia al agua en un tamaño compacto ideal para viajes o llevar en el bolso.",
        precio: 10000,
        categoria: "rostro",
        imagen: "img/Corrector-Trendy-Mini.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono 00","Tono 01"]
    },
    {
        id: 17,
        nombre: "Compacto Vogue",
        descripcion: "Sella la base, matifica la piel y controla el brillo durante varias horas con un acabado natural.",
        precio: 15000,
        categoria: "rostro",
        imagen: "img/Compacto-Vogue.jpeg",
        badge: "glow",
        badgeText: "Hot",
        tonos: ["Tono Natural","Tono Durazno","Tono Canela"]
    },
    {
        id: 18,
        nombre: "Compacto Nailen",
        descripcion: "Polvo facial compacto y ligero que da un efecto matte suave, brillante y sin poros para la belleza de la piel.",
        precio: 10000,
        categoria: "rostro",
        imagen: "img/Compacto-Nailen.jpeg",
        badge: "glow",
        badgeText: "Mas vendido",
        tonos: ["Tono 0","Tono 1","Tono 2","Tono 3"]
    },
    {
        id: 19,
        nombre: "Compacto Raquel con Filtro Solar ",
        descripcion: "Contienen filtro solar, que ayuda a proteger contra los efectos dañinos de la radiación UV. Especialmente diseñados para piel grasa, Cobertura ligera a media.",
        precio: 19000,
        categoria: "rostro",
        imagen: "img/Compacto-Raquel-Filtro-solar.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono 2","Tono 3","Tono 4"]
    },
    {
        id: 20,
        nombre: "Compacto Hudavioji ",
        descripcion: "Ayuda a sellar la base, controlar el brillo y dar un aspecto más suave y uniforme al rostro.",
        precio: 6000,
        categoria: "rostro",
        imagen: "img/Copacto-Hudavioji.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 4"]
    },
    {
        id: 21,
        nombre: "Compacto MAC",
        descripcion: "Ilumina, esculpe o broncea con el maquillaje en polvo de M∙A∙C.",
        precio: 12000,
        categoria: "rostro",
        imagen: "img/Compacto-Mac.jpeg",
        badge: "glow",
        badgeText: "",
        tonos: ["Tono 30","Tono 40"]
    }
];

// Formateador de precios en miles
function formatearPrecio(precio) {
    return precio.toLocaleString('es-CO');
}

// =========================================================
// RENDERIZADO DEL CATÁLOGO (ORDEN ALFABÉTICO AUTOMÁTICO)
// =========================================================

const catalogGrid = document.getElementById("catalog-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

// Generador del HTML para cada tarjeta de producto
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
    return card;
}

function renderProducts(categoryFilter = "todos") {
    if (!catalogGrid) return;
    
    catalogGrid.innerHTML = "";

    // 1. Ordenar la lista alfabéticamente de A a Z
    const productosOrdenados = [...productos].sort((a, b) => 
        a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })
    );

    // 2. Filtrar por categoría seleccionada
    const filteredProducts = categoryFilter === "todos" 
        ? productosOrdenados 
        : productosOrdenados.filter(p => p.categoria === categoryFilter);

    if (filteredProducts.length === 0) {
        catalogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 2rem;">No hay productos en esta categoría por el momento.</p>`;
        return;
    }

    // 3. Renderizar productos en pantalla
    filteredProducts.forEach(prod => {
        const cardNode = generarCardHTML(prod);
        catalogGrid.appendChild(cardNode);
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

    // Buscar si ya existe el producto con el mismo tono en el carrito
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
    if (cartCount) cartCount.innerText = totalCantidad;

    // Calcular total
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    if (cartTotal) cartTotal.innerText = `$${formatearPrecio(totalPrecio)}`;

    // Renderizar lista en modal
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
    if (!modal) return;
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
// LÓGICA DEL BUSCADOR DE PRODUCTOS
// =========================================================

function filtrarPorNombre() {
    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search");

    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    // Mostrar/ocultar el botón de limpiar
    if (clearBtn) {
        clearBtn.style.display = query.length > 0 ? "block" : "none";
    }

    // Manejar estilo activo en los botones de categoría
    if (query.length > 0) {
        filterButtons.forEach(b => b.classList.remove("active"));
    } else {
        const btnTodos = document.querySelector('.filter-btn[data-category="todos"]');
        if (btnTodos) btnTodos.classList.add("active");
    }

    if (!catalogGrid) return;

    // 1. Filtrar coincidencia
    const resultados = productos.filter(p => 
        p.nombre.toLowerCase().includes(query) || 
        p.descripcion.toLowerCase().includes(query)
    );

    // 2. Ordenar resultados alfabéticamente (A-Z)
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

    // 3. Renderizar resultados ordenados
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

// Event Listeners para Filtros por Categoría
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

// Carga inicial al estar listo el DOM
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
});