import express from "express"
import TutorController from "../controller/tutoresController.js"

const router = express.Router()

router 
    .post("/tutores", TutorController.cadastrarTutor)
    
export default router