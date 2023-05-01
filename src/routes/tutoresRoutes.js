import express from "express"
import TutorController from "../controller/tutoresController.js"

const router = express.Router()

router 
    .post("/tutores", TutorController.cadastrarTutor)
    .put("/tutores/:id", TutorController.atualizarTutor)
    
export default router