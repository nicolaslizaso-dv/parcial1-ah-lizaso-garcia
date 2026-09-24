import { Router } from "express"
import * as resenasController from "../controllers/resenas.controller.js"

const router = Router()

router.get("/api/resenas", resenasController.listar)
router.post("/api/resenas", resenasController.crear)

export default router
