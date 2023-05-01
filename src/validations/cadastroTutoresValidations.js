class cadastroValidacao {
    static validacaoTutor(dadosCadastro) {
        if(!dadosCadastro.nome.trim()) {
            return { error: 'O nome é obrigatório.', statusCode: 400 }
        }

        if(!dadosCadastro.email.trim()) {
            return { error: 'O email é obrigatório.', statusCode: 400 }
        }

        if (!dadosCadastro.senha.trim()) {
            return { error: 'A senha é obrigatória.', statusCode: 400 };
        }

        if (dadosCadastro.senha.trim() !== dadosCadastro.confirmacaoSenha) {
            return { error: 'As senhas não coincidem.', statusCode: 400 };
        }

        return null
    }

}

export default cadastroValidacao