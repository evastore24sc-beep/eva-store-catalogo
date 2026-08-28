// =========================================================
// NÚMERO DE WHATSAPP (Cámbialo por tu número con código de país)
// =========================================================
const TEL_WHATSAPP = "+584149765297"; 

// =========================================================
// LISTA DE PRODUCTOS (Agrega la propiedad `tonos: [...]` si el producto los tiene)
// =========================================================
const productos = [
    {
        id: 6,
        nombre: "Base Raquel Detox",
        descripcion: "Ideal para quienes buscan un cubrimiento eficiente sin sensación pesada en todo el día.",
        precio: "34.000",
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
        precio: "24.000",
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
        precio: "32.000",
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
        precio: "10.000",
        categoria: "rostro",
        imagen: "img/Base-4en1.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 01", "Tono 02","Tono 03", "Tono 04","Tono 05", "Tono 06"]
    },
    {
        id: 4,
        nombre: "Corrector Bloomshell",
        descripcion: "Alta cobertura para ojeras e imperfecciones.",
        precio: "22.000", 
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
        precio: "8.000 c/u",
        categoria: "rostro",
        imagen: "img/Base-economica.jpg",
        badge: "hot",
        badgeText: "Oferta",
        tonos: ["Tono 1", "Tono 4"]
    },
    {
        id: 7,
        nombre: "Base Mate Only Beauty",
        descripcion: "Diseñada para proporcionar un acabado suave y sin brillos.",
        precio: "15.000",
        categoria: "rostro",
        imagen: "img/Base-only-beauty-mate.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono 10", "Tono 12"]
    },
    {
        id: 8,
        nombre: "Base Ruby Rose Look Natural",
        descripcion: "Base ligera de cobertura media con acabado natural.",
        precio: "32.000",
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
        precio: "15.000",
        categoria: "rostro",
        imagen: "img/IMG_1457.jpeg",
        badge: "glow",
        badgeText: "Oferta",
        tonos: ["Tono 4"]
    },
    {
        id: 10,
        nombre: "Corrector Majikal",
        descripcion: "Consigue una piel uniforme y duradera con nuestro corrector.",
        precio: "37.000",
        categoria: "rostro",
        imagen: "img/Corrector-Magikal-Mate.jpeg",
        badge: "glow",
        badgeText: "Nuevo",
        tonos: ["Tono 00","Tono 1","Tono 3","Tono 4"]
    }
];

// =========================================================
// LÓGICA DE RENDERIZADO Y WHATSAPP DINÁMICO
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
        // Generar selector de tonos si el producto tiene lista de tonos
        let selectTonosHTML = "";
        let textoTonoMensaje = "";

        if (prod.tonos && prod.tonos.length > 0) {
            const options = prod.tonos.map(t => `<option value="${t}">${t}</option>`).join('');
            selectTonosHTML = `
                <div class="shade-select-box">
                    <label for="select-${prod.id}" class="shade-label">Selecciona tu tono:</label>
                    <select id="select-${prod.id}" class="shade-dropdown" onchange="actualizarMensajeWS(${prod.id})">
                        ${options}
                    </select>
                </div>
            `;
            // Por defecto toma el primer tono de la lista
            textoTonoMensaje = ` (Tono: ${prod.tonos[0]})`;
        }

        const mensajeWS = encodeURIComponent(`Hola Eva Store, quiero pedir: ${prod.nombre}${textoTonoMensaje} ($${prod.precio})`);
        const urlWS = `https://wa.me/${TEL_WHATSAPP}?text=${mensajeWS}`;

        // Badge HTML
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
                        <span class="price">${prod.precio}</span>
                    </div>
                    <a href="${urlWS}" class="btn-card-ws" target="_blank" rel="noopener noreferrer">
                        <span>Pedir</span>
                        <svg class="btn-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                </div>
            </div>
        `;
        catalogGrid.appendChild(card);
    });
}

// Función que actualiza el enlace de WhatsApp al cambiar el tono en el desplegable
function actualizarMensajeWS(idProducto) {
    const prod = productos.find(p => p.id === idProducto);
    if (!prod) return;

    const select = document.getElementById(`select-${idProducto}`);
    const tonoSeleccionado = select ? select.value : "";
    
    // Buscar el botón 'Pedir' dentro de la tarjeta del producto
    const card = document.querySelector(`.product-card[data-id="${idProducto}"]`);
    if (!card) return;
    
    const btnWS = card.querySelector('.btn-card-ws');

    const textoTono = tonoSeleccionado ? ` (Tono: ${tonoSeleccionado})` : "";
    const nuevoMensaje = encodeURIComponent(`Hola Eva Store, quiero pedir: ${prod.nombre}${textoTono} ($${prod.precio})`);
    
    btnWS.href = `https://wa.me/${TEL_WHATSAPP}?text=${nuevoMensaje}`;
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