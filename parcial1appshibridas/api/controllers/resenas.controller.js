import * as resenaService from "../../services/resena.service.js"

// GET /api/resenas
export async function listar(req, res) {
    try {
        const lista = await resenaService.listarResenas()
        res.status(200).json(lista)
    } catch (error) {
        res.status(500).json({ message: "No se pudieron obtener las reseñas" })
    }
}

// POST /api/resenas
export async function crear(req, res) {
    try {
        const { errores, resena } = resenaService.validarResena(req.body)
        if (errores.length > 0) {
            res.status(400).json({ message: "Hay datos incorrectos", errores })
        } else {
            const creada = await resenaService.crearResena(resena)
            res.status(201).json(creada)
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo guardar la reseña" })
    }
}
