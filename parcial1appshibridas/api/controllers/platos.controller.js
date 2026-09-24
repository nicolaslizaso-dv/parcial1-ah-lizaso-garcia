import * as platoService from "../../services/plato.service.js"

// GET /api/platos  
export async function listar(req, res) {
    try {
        const lista = await platoService.listarPlatos(req.query)
        res.status(200).json(lista)
    } catch (error) {
        res.status(500).json({ message: "No se pudieron obtener los platos" })
    }
}

// GET /api/platos/:id
export async function detalle(req, res) {
    try {
        const plato = await platoService.buscarPlato(req.params.id)
        if (plato) res.status(200).json(plato)
        else res.status(404).json({ message: "No existe un plato con ese id" })
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener el plato" })
    }
}

// POST /api/platos
export async function crear(req, res) {
    try {
        const { errores, plato } = platoService.validarPlato(req.body)
        if (errores.length > 0) {
            res.status(400).json({ message: "Hay datos incorrectos", errores })
        } else {
            const creado = await platoService.crearPlato(plato)
            res.status(201).json(creado)
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo crear el plato" })
    }
}

// PUT /api/platos/:id 
export async function reemplazar(req, res) {
    try {
        const { errores, plato } = platoService.validarPlato(req.body)
        if (errores.length > 0) {
            res.status(400).json({ message: "Hay datos incorrectos", errores })
        } else {
            const resultado = await platoService.reemplazarPlato(req.params.id, plato)
            if (resultado) res.status(202).json(resultado)
            else res.status(404).json({ message: "No existe un plato con ese id" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo reemplazar el plato" })
    }
}

// PATCH /api/platos/:id 
export async function modificar(req, res) {
    try {
        const { errores, plato } = platoService.validarPlato(req.body, true)
        if (errores.length > 0) {
            res.status(400).json({ message: "Hay datos incorrectos", errores })
        } else {
            const resultado = await platoService.modificarPlato(req.params.id, plato)
            if (resultado) res.status(202).json(resultado)
            else res.status(404).json({ message: "No existe un plato con ese id" })
        }
    } catch (error) {
        res.status(500).json({ message: "No se pudo modificar el plato" })
    }
}

// DELETE /api/platos/:id
export async function borrar(req, res) {
    try {
        const plato = await platoService.borrarPlato(req.params.id)
        if (plato) res.status(202).json(plato)
        else res.status(404).json({ message: "No existe un plato con ese id" })
    } catch (error) {
        res.status(500).json({ message: "No se pudo borrar el plato" })
    }
}
