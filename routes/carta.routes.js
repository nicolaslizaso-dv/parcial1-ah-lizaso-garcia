import { Router } from "express"
import * as cartaController from "../controllers/carta.controller.js"

const router = Router()

router.get("/", cartaController.verPortada)
router.get("/carta/:seccion", cartaController.verSeccion)

// panel de platos (alta, baja y modificación con formularios)
router.get("/platos", cartaController.verPanel)
router.get("/platos/nuevo", cartaController.formularioAlta)
router.post("/platos/nuevo", cartaController.guardarAlta)
router.get("/platos/editar/:id", cartaController.formularioEdicion)
router.post("/platos/editar/:id", cartaController.guardarEdicion)
router.get("/platos/eliminar/:id", cartaController.confirmarBaja)
router.post("/platos/eliminar/:id", cartaController.darDeBaja)
router.get("/platos/:id", cartaController.verPlato)

export default router
