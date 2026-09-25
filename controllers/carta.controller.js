import * as platoService from "../services/plato.service.js"
import * as resenaService from "../services/resena.service.js"
import * as cartaView from "../views/carta.view.js"
import { obtenerSeccion } from "../data/secciones.js"

// GET /
export async function verPortada(req, res) {
    try {
        const resenas = await resenaService.listarResenas()
        res.send(cartaView.portada(resenas))
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo cargar la portada"))
    }
}

// GET /carta/:seccion
export async function verSeccion(req, res) {
    try {
        const seccion = obtenerSeccion(req.params.seccion)
        if (seccion) {
            const platos = await platoService.listarPlatos({ seccion: seccion.slug })
            res.send(cartaView.cartaSeccion(seccion, platos))
        } else {
            res.status(404).send(cartaView.paginaError("Esa sección no está en la carta"))
        }
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo cargar la carta"))
    }
}

// GET /platos
export async function verPanel(req, res) {
    try {
        const platos = await platoService.listarPlatos()
        res.send(cartaView.panelPlatos(platos))
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudieron cargar los platos"))
    }
}

// GET /platos/:id
export async function verPlato(req, res) {
    try {
        const plato = await platoService.buscarPlato(req.params.id)
        if (plato) res.send(cartaView.fichaPlato(plato))
        else res.status(404).send(cartaView.paginaError("Ese plato no existe"))
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo cargar el plato"))
    }
}

// GET /platos/nuevo
export function formularioAlta(req, res) {
    res.send(cartaView.formularioPlato("Agregar plato", "/platos/nuevo"))
}

// POST /platos/nuevo
export async function guardarAlta(req, res) {
    try {
        const { errores, plato } = platoService.validarPlato(req.body)
        if (errores.length > 0) {
            res.status(400).send(cartaView.formularioPlato("Agregar plato", "/platos/nuevo", req.body, errores))
        } else {
            const creado = await platoService.crearPlato(plato)
            res.send(cartaView.fichaPlato(creado))
        }
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo guardar el plato"))
    }
}

// GET /platos/editar/:id
export async function formularioEdicion(req, res) {
    try {
        const id = req.params.id
        const plato = await platoService.buscarPlato(id)
        if (plato) res.send(cartaView.formularioPlato("Editar plato", `/platos/editar/${id}`, plato))
        else res.status(404).send(cartaView.paginaError("Ese plato no existe"))
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo cargar el plato"))
    }
}

// POST /platos/editar/:id
export async function guardarEdicion(req, res) {
    try {
        const id = req.params.id
        const { errores, plato } = platoService.validarPlato(req.body)
        if (errores.length > 0) {
            res.status(400).send(cartaView.formularioPlato("Editar plato", `/platos/editar/${id}`, req.body, errores))
        } else {
            const editado = await platoService.reemplazarPlato(id, plato)
            if (editado) res.send(cartaView.fichaPlato(editado))
            else res.status(404).send(cartaView.paginaError("Ese plato no existe"))
        }
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo editar el plato"))
    }
}

// GET /platos/eliminar/:id
export async function confirmarBaja(req, res) {
    try {
        const plato = await platoService.buscarPlato(req.params.id)
        if (plato) res.send(cartaView.confirmarBaja(plato))
        else res.status(404).send(cartaView.paginaError("Ese plato no existe"))
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo cargar el plato"))
    }
}

// POST /platos/eliminar/:id
export async function darDeBaja(req, res) {
    try {
        const plato = await platoService.borrarPlato(req.params.id)
        if (plato) {
            const platos = await platoService.listarPlatos()
            res.send(cartaView.panelPlatos(platos))
        } else {
            res.status(404).send(cartaView.paginaError("Ese plato no existe"))
        }
    } catch (error) {
        res.status(500).send(cartaView.paginaError("No se pudo eliminar el plato"))
    }
}
