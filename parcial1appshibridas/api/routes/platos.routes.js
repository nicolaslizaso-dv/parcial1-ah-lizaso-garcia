import { Router } from "express"
import * as platosController from "../controllers/platos.controller.js"

const router = Router()

router.get("/api/platos", platosController.listar)
router.get("/api/platos/:id", platosController.detalle)
router.post("/api/platos", platosController.crear)
router.put("/api/platos/:id", platosController.reemplazar)
router.patch("/api/platos/:id", platosController.modificar)
router.delete("/api/platos/:id", platosController.borrar)

export default router
