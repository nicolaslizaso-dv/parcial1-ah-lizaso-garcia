import { MongoClient, ObjectId } from "mongodb"
import { secciones } from "../data/secciones.js"

const MONGO_URI = "mongodb://127.0.0.1:27017"

const cliente = new MongoClient(MONGO_URI)
const db = cliente.db("AH20232CP1")
const platos = db.collection("Platos")

const SOLO_ACTIVOS = { eliminado: { $ne: true } }

// validación de platos
export function validarPlato(datos = {}, parcial = false) {
    const errores = []
    const plato = {}

    if (!parcial || datos.nombre !== undefined) {
        const nombre = String(datos.nombre || "").trim()
        if (nombre == "") errores.push("Falta el nombre del plato")
        else plato.nombre = nombre
    }

    if (!parcial || datos.descripcion !== undefined) {
        const descripcion = String(datos.descripcion || "").trim()
        if (descripcion == "") errores.push("Falta la descripción")
        else plato.descripcion = descripcion
    }

    if (!parcial || datos.precio !== undefined) {
        const precio = parseInt(datos.precio)
        if (isNaN(precio) || precio <= 0) errores.push("El precio tiene que ser un número mayor a 0")
        else plato.precio = precio
    }

    if (!parcial || datos.etiquetas !== undefined) {
        let lista = datos.etiquetas
        if (!Array.isArray(lista)) lista = String(lista || "").split(",")
        const etiquetas = []
        lista.forEach(etiqueta => {
            const texto = String(etiqueta).trim().toLowerCase()
            if (texto != "") etiquetas.push(texto)
        })
        if (etiquetas.length == 0) errores.push("Poné al menos una etiqueta")
        else plato.etiquetas = etiquetas
    }

    if (!parcial || datos.link !== undefined) {
        const link = String(datos.link || "").trim()
        if (!link.startsWith("http")) errores.push("El link tiene que empezar con http")
        else plato.link = link
    }

    if (!parcial || datos.imagen !== undefined) {
        const imagen = String(datos.imagen || "").trim()
        if (!imagen.startsWith("http")) errores.push("La imagen tiene que ser una URL que empiece con http")
        else plato.imagen = imagen
    }

    if (!parcial || datos.seccion !== undefined) {
        const seccion = secciones.find(seccion => seccion.slug == datos.seccion)
        if (!seccion) errores.push("Esa sección no existe en la carta")
        else plato.seccion = seccion.slug
    }

    if (parcial && errores.length == 0 && Object.keys(plato).length == 0) {
        errores.push("No mandaste ningún campo para cambiar")
    }

    return { errores, plato }
}


// coleccion de platos con filrtos
export async function listarPlatos(filtros = {}) {
    const consulta = { ...SOLO_ACTIVOS }

    if (filtros.seccion) consulta.seccion = filtros.seccion
    if (filtros.etiqueta) consulta.etiquetas = { $regex: filtros.etiqueta, $options: "i" }

    return await platos.find(consulta).toArray()
}
//buscar platos
export async function buscarPlato(id) {
    return await platos.findOne({ _id: new ObjectId(id), ...SOLO_ACTIVOS })
}
//crear platos
export async function crearPlato(plato) {
    await platos.insertOne(plato)
    return plato
}

// PUT reemplaza el documento entero
export async function reemplazarPlato(id, plato) {
    const existente = await buscarPlato(id)
    if (!existente) return null
    await platos.replaceOne({ _id: new ObjectId(id) }, plato)
    return await buscarPlato(id)
}

// PATCH solo updatea los campos que recibe
export async function modificarPlato(id, cambios) {
    const existente = await buscarPlato(id)
    if (!existente) return null
    await platos.updateOne({ _id: new ObjectId(id) }, { $set: cambios })
    return await buscarPlato(id)
}

// eliminar platos
export async function borrarPlato(id) {
    const plato = await buscarPlato(id)
    if (!plato) return null
    await platos.updateOne({ _id: new ObjectId(id) }, { $set: { eliminado: true } })
    return plato
}
