import { MongoClient } from "mongodb"

const MONGO_URI = "mongodb://127.0.0.1:27017"

const cliente = new MongoClient(MONGO_URI)
const db = cliente.db("AH20232CP1")
const resenas = db.collection("Resenas")

// validacion de reseñas
export function validarResena(datos = {}) {
    const errores = []
    const resena = {}

    const nombre = String(datos.nombre || "").trim()
    if (nombre == "") errores.push("Falta el nombre de quien escribe la reseña")
    else resena.nombre = nombre

    const foto = String(datos.foto || "").trim()
    if (!foto.startsWith("http")) errores.push("La foto tiene que ser una URL que empiece con http")
    else resena.foto = foto

    const descripcion = String(datos.descripcion || "").trim()
    if (descripcion == "") errores.push("Falta la descripción de la reseña")
    else resena.descripcion = descripcion

    const puntaje = parseInt(datos.puntaje)
    if (isNaN(puntaje) || puntaje < 1 || puntaje > 5) errores.push("El puntaje tiene que ser un número del 1 al 5")
    else resena.puntaje = puntaje

    return { errores, resena }
}

export async function listarResenas() {
    return await resenas.find().toArray()
}

export async function crearResena(resena) {
    await resenas.insertOne(resena)
    return resena
}
