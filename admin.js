import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
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
const db = getFirestore(app);

let listaProductos = [];

// Elementos DOM
const form = document.getElementById("productForm");
const tablaProductos = document.getElementById("tabla-productos");
const formTitle = document.getElementById("form-title");
const btnSave = document.getElementById("btnSave");
const btnCancel = document.getElementById("btnCancel");

// Cargar inventario al iniciar
async function cargarProductosAdmin() {
    try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        listaProductos = [];
        querySnapshot.forEach((documento) => {
            listaProductos.push({ id: documento.id, ...documento.data() });
        });
        renderTablaAdmin();
    } catch (error) {
        console.error("Error al cargar productos en el panel:", error);
        tablaProductos.innerHTML = `<tr><td colspan="5" style="color: red; text-align: center;">Error al cargar datos.</td></tr>`;
    }
}

// Renderizar tabla HTML
function renderTablaAdmin() {
    if (!tablaProductos) return;
    tablaProductos.innerHTML = "";

    if (listaProductos.length === 0) {
        tablaProductos.innerHTML = `<tr><td colspan="5" style="text-align: center;">No hay productos registrados.</td></tr>`;
        return;
    }

    listaProductos.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));

    listaProductos.forEach((prod) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${prod.imagen}" alt="${prod.nombre}"></td>
            <td><strong>${prod.nombre}</strong></td>
            <td>${prod.categoria}</td>
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

        const editId = document.getElementById("productId").value;
        const tonosRaw = document.getElementById("tonos").value.trim();
        const tonosArray = tonosRaw ? tonosRaw.split(",").map(t => t.trim()).filter(t => t !== "") : [];

        const productoData = {
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            precio: parseFloat(document.getElementById("precio").value) || 0,
            categoria: document.getElementById("categoria").value.trim().toLowerCase(),
            imagen: document.getElementById("imagen").value.trim(),
            badge: document.getElementById("badge").value.trim().toLowerCase(),
            badgeText: document.getElementById("badgeText").value.trim(),
            tonos: tonosArray
        };

        try {
            if (editId) {
                // Actualizar producto existente
                const docRef = doc(db, "productos", editId);
                await updateDoc(docRef, productoData);
                alert("¡Producto actualizado exitosamente!");
            } else {
                // Crear nuevo producto
                await addDoc(collection(db, "productos"), productoData);
                alert("¡Producto guardado exitosamente!");
            }
            
            cancelarEdicion();
            cargarProductosAdmin();
        } catch (error) {
            console.error("Error al procesar el producto:", error);
            alert("Ocurrió un error. Revisa la consola.");
        }
    });
}

// Cargar datos en el formulario para editar
function prepararEdicion(id) {
    const prod = listaProductos.find(p => p.id === id);
    if (!prod) return;

    document.getElementById("productId").value = prod.id;
    document.getElementById("nombre").value = prod.nombre || "";
    document.getElementById("descripcion").value = prod.descripcion || "";
    document.getElementById("precio").value = prod.precio || 0;
    document.getElementById("categoria").value = prod.categoria || "";
    document.getElementById("imagen").value = prod.imagen || "";
    document.getElementById("badge").value = prod.badge || "";
    document.getElementById("badgeText").value = prod.badgeText || "";
    document.getElementById("tonos").value = prod.tonos ? prod.tonos.join(", ") : "";

    formTitle.innerText = "Editar Producto";
    btnSave.innerText = "Actualizar Producto";
    btnCancel.style.display = "inline-block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Resetear formulario
function cancelarEdicion() {
    form.reset();
    document.getElementById("productId").value = "";
    formTitle.innerText = "Agregar Nuevo Producto";
    btnSave.innerText = "Guardar Producto";
    btnCancel.style.display = "none";
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
            alert("Error al eliminar el producto.");
        }
    }
}

// Exponer funciones globales para interactuar con botones onclick
window.prepararEdicion = prepararEdicion;
window.eliminarProducto = eliminarProducto;
window.cancelarEdicion = cancelarEdicion;

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    cargarProductosAdmin();
});