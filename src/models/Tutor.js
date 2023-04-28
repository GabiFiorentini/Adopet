import mongoose, { Schema } from "mongoose"

const tutorSchema = new mongoose.Schema(
    {
        id: {type: String},
        email: {type: String, require: true, unique: true},
        nome: {type: String, require: true},
        senha: {type: String, require: true},
        confirmacaoSenha: {type: String, require: true},
    }
)

const tutores = mongoose.model('tutores', tutorSchema)

export default tutores