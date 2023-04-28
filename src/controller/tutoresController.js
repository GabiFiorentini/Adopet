import tutores from "../models/Tutor.js";
import cadastroValidacao from "../validations/cadastroTutoresValidations.js";

class TutorController {
    static cadastrarTutor = async (req, res) => {
        try{
            const tutor = new tutores(req.body)
            const resultadoValidacao = cadastroValidacao.validacaoTutor(tutor)
            await tutor.save()

            if(resultadoValidacao) {
                return res
                    .status(resultadoValidacao.statusCode)
                    .json({error: resultadoValidacao.error})
            }
        
            return res.status(200).send(tutor.toJSON())
            
        } catch(err) {
            console.log(err.code)
            if(err.code == 11000) {
                res.status(400).json({message: 'O email já está em uso'})
            }else{
                res.status(500).send({ message: `${err.message} - Falha ao cadastrar o tutor` })
            }
        }
        
    }

}

export default TutorController