import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de Firebase
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
const auth = getAuth(app);
const db = getFirestore(app);

let listaProductos = [];
let categoriaActivaAdmin = "todos";

// Elementos DOM
const loginSection = document.getElementById("login-section");
const adminContent = document.getElementById("admin-content");
const loginForm = document.getElementById("loginForm");

const form = document.getElementById("productForm");
const tablaProductos = document.getElementById("tabla-productos");
const formTitle = document.getElementById("form-title");
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");

// Control de Sesión en Tiempo Real
onAuthStateChanged(auth, (user) => {
    if (user) {
        if (loginSection) loginSection.style.display = "none";
        if (adminContent) adminContent.style.display = "block";
        cargarProductosAdmin();
    } else {
        if (loginSection) loginSection.style.display = "block";
        if (adminContent) adminContent.style.display = "none";
    }
});

// Manejo del Login
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            loginForm.reset();
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert("Credenciales incorrectas: " + error.message);
        }
    });
}

// Cerrar Sesión
function cerrarSesion() {
    signOut(auth).then(() => {
        alert("Sesión cerrada correctamente.");
    });
}

// Cargar inventario al iniciar
async function cargarProductosAdmin() {
    try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        listaProductos = [];
        querySnapshot.forEach((documento) => {
            listaProductos.push({ id: documento.id, ...documento.data() });
        });
        aplicarFiltrosAdmin();
    } catch (error) {
        console.error("Error al cargar productos en el panel:", error);
        if (tablaProductos) {
            tablaProductos.innerHTML = `<tr><td colspan="5" style="color: red; text-align: center;">Error al cargar datos.</td></tr>`;
        }
    }
}

// Renderizar tabla HTML
function renderTablaAdmin(productosARenderizar = listaProductos) {
    if (!tablaProductos) return;
    tablaProductos.innerHTML = "";

    if (productosARenderizar.length === 0) {
        tablaProductos.innerHTML = `<tr><td colspan="5" style="text-align: center;">No se encontraron productos.</td></tr>`;
        return;
    }

    productosARenderizar.sort((a, b) => (a.nombre || "").localeCompare(b.nombre || "", 'es', { sensitivity: 'base' }));

    productosARenderizar.forEach((prod) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${prod.imagen || ''}" alt="${prod.nombre || ''}"></td>
            <td><strong>${prod.nombre || ''}</strong></td>
            <td>${prod.categoria || ''}</td>
            <td>$${Number(prod.precio || 0).toLocaleString('es-CO')}</td>
            <td>
                <button class="btn-edit" onclick="prepararEdicion('${prod.id}')">Editar</button>
                <button class="btn-delete" onclick="eliminarProducto('${prod.id}')">Eliminar</button>
            </td>
        `;
        tablaProductos.appendChild(tr);
    });
}

// Guardar o Actualizar producto
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const editId = document.getElementById("productId") ? document.getElementById("productId").value : "";
        const tonosRaw = document.getElementById("tonos") ? document.getElementById("tonos").value.trim() : "";
        const tonosArray = tonosRaw ? tonosRaw.split(",").map(t => t.trim()).filter(t => t !== "") : [];

        const productoData = {
            nombre: document.getElementById("nombre") ? document.getElementById("nombre").value.trim() : "",
            descripcion: document.getElementById("descripcion") ? document.getElementById("descripcion").value.trim() : "",
            precio: parseFloat(document.getElementById("precio") ? document.getElementById("precio").value : 0) || 0,
            categoria: document.getElementById("categoria") ? document.getElementById("categoria").value.trim().toLowerCase() : "",
            imagen: document.getElementById("imagen") ? document.getElementById("imagen").value.trim() : "",
            badge: document.getElementById("badge") ? document.getElementById("badge").value.trim().toLowerCase() : "",
            badgeText: document.getElementById("badgeText") ? document.getElementById("badgeText").value.trim() : "",
            tonos: tonosArray
        };

        try {
            if (editId) {
                const docRef = doc(db, "productos", editId);
                await updateDoc(docRef, productoData);
                alert("¡Producto actualizado exitosamente!");
            } else {
                await addDoc(collection(db, "productos"), productoData);
                alert("¡Producto guardado exitosamente!");
            }
            
            cancelarEdicion();
            cargarProductosAdmin();
        } catch (error) {
            console.error("Error al procesar el producto:", error);
            alert("Error: " + error.message);
        }
    });
}

// LÓGICA DE BÚSQUEDA Y FILTRADO COMBINADO EN ADMIN
function aplicarFiltrosAdmin() {
    const searchInput = document.getElementById("admin-search-input");
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";

    const resultados = listaProductos.filter(prod => {
        const nombre = (prod.nombre || "").toLowerCase();
        const categoria = (prod.categoria || "").toLowerCase();

        const coincideTexto = nombre.includes(query) || categoria.includes(query);
        const coincideCategoria = categoriaActivaAdmin === "todos" || categoria === categoriaActivaAdmin;

        return coincideTexto && coincideCategoria;
    });

    renderTablaAdmin(resultados);
}

function filtrarProductosAdmin() {
    aplicarFiltrosAdmin();
}

function filtrarPorCategoriaAdmin(categoria, btnElement) {
    categoriaActivaAdmin = categoria.toLowerCase();

    const botones = document.querySelectorAll("#admin-category-filters .btn-filter");
    botones.forEach(b => b.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");

    aplicarFiltrosAdmin();
}

// Cargar datos en el formulario para editar
function prepararEdicion(id) {
    const prod = listaProductos.find(p => p.id === id);
    if (!prod) return;

    if (document.getElementById("productId")) document.getElementById("productId").value = prod.id;
    if (document.getElementById("nombre")) document.getElementById("nombre").value = prod.nombre || "";
    if (document.getElementById("descripcion")) document.getElementById("descripcion").value = prod.descripcion || "";
    if (document.getElementById("precio")) document.getElementById("precio").value = prod.precio || 0;
    if (document.getElementById("categoria")) document.getElementById("categoria").value = prod.categoria || "";
    if (document.getElementById("imagen")) document.getElementById("imagen").value = prod.imagen || "";
    if (document.getElementById("badge")) document.getElementById("badge").value = prod.badge || "";
    if (document.getElementById("badgeText")) document.getElementById("badgeText").value = prod.badgeText || "";
    if (document.getElementById("tonos")) document.getElementById("tonos").value = prod.tonos ? prod.tonos.join(", ") : "";

    if (formTitle) formTitle.innerText = "Editar Producto";
    if (btnSave) btnSave.innerText = "Actualizar Producto";
    if (btnCancel) btnCancel.style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Resetear formulario
function cancelarEdicion() {
    if (form) form.reset();
    if (document.getElementById("productId")) document.getElementById("productId").value = "";
    if (formTitle) formTitle.innerText = "Agregar Nuevo Producto";
    if (btnSave) btnSave.innerText = "Guardar Producto";
    if (btnCancel) btnCancel.style.display = "none";
}

// Eliminar producto
async function eliminarProducto(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto de la base de datos?")) {
        try {
            await deleteDoc(doc(db, "productos", id));
            alert("Producto eliminado.");
            cargarProductosAdmin();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            alert("Error al eliminar: " + error.message);
        }
    }
}

// Exposición global
window.prepararEdicion = prepararEdicion;
window.eliminarProducto = eliminarProducto;
window.cancelarEdicion = cancelarEdicion;
window.cerrarSesion = cerrarSesion;
window.filtrarProductosAdmin = filtrarProductosAdmin;
window.filtrarPorCategoriaAdmin = filtrarPorCategoriaAdmin;