import tutores from "../models/Tutor.js";
import cadastroValidacao from "../validations/cadastroTutoresValidations.js";
import { ObjectId } from 'mongodb';

class TutorController {
    static cadastrarTutor = async (req, res) => {
        const tutor = new tutores(req.body)

        try{    
            const resultadoValidacao = cadastroValidacao.validacaoTutor(tutor)
            await tutor.save()

            if(resultadoValidacao) {
                return res
                    .status(resultadoValidacao.statusCode)
                    .json({error: resultadoValidacao.error})
            }
        
            return res.status(201).send(tutor.toJSON())
            
        } catch(err) {
            if(err.code == 11000) {
                res.status(400).json({message: 'O email já está em uso'})
            }else{
                res.status(500).send({ message: `${err.message} - Falha ao cadastrar o tutor` })
            }
        }
        
    }

    static atualizarTutor = async (req, res) => {
        const tutorId = new ObjectId(req.params.id)
        
        try {
            const tutor = await tutores.findById(tutorId)
            const dadosAtualizacao = req.body 

            if(tutor.email !== dadosAtualizacao.email) {
                const validarEmail = await tutores.findOne({email: dadosAtualizacao.email})
                
                if(validarEmail) {
                    return res.status(400).json({message: 'O email já está em uso'})
                }     
            }

            Object.assign(tutor, dadosAtualizacao)
            const validacaoTutorAtualizacao = cadastroValidacao.validacaoTutor(tutor)
            
            if(validacaoTutorAtualizacao) {
                return res
                    .status(validacaoTutorAtualizacao.statusCode)
                    .json({error: validacaoTutorAtualizacao.error})
            }

            await tutor.save()

            res.status(200).send(tutor.toJSON())

        } catch(err) {
            res.status(500).send({message: `Falha ao atualizar`})
        }
    }
}

export default TutorController