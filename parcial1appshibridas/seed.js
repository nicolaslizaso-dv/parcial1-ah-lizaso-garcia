import { MongoClient } from "mongodb"
import { readFile } from "fs/promises"

// La misma dirección que usan los services
const MONGO_URI = "mongodb://127.0.0.1:27017"

const cliente = new MongoClient(MONGO_URI)
const db = cliente.db("AH20232CP1")

async function sembrar() {
    try {
        const platos = JSON.parse(await readFile("./data/Platos.json", "utf8"))
        const resenas = JSON.parse(await readFile("./data/Resenas.json", "utf8"))

        // Se vacían antes de cargar: así correr el seed dos veces no duplica los datos
        await db.collection("Platos").deleteMany({})
        await db.collection("Resenas").deleteMany({})

        await db.collection("Platos").insertMany(platos)
        await db.collection("Resenas").insertMany(resenas)

        console.log(`Base cargada: ${platos.length} platos y ${resenas.length} reseñas`)
    } catch (error) {
        console.log("No se pudo cargar la base:", error.message)
    } finally {
        await cliente.close() // sin esto el script queda abierto y no termina
    }
}

sembrar()