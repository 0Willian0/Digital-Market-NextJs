const bcrypt = require('bcrypt-nodejs')

module.exports= app=>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res)=>{
        const user = {...req.body}
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try{
            existsOrError(user.name, `Nome nao informado`)
            existsOrError(user.email, 'E-mail nao informado')
            existsOrError(user.password, 'Senha nao informada')
            existsOrError(user.confirmPassword, 'Confirmacao de Senha invalida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas nao conferem')

            const userFromDB = await app.db('users')
            .where({email: user.email}).first()

            if(!user.id){
                notExistsOrError(userFromDB, 'Usuario ja cadastrado')
            }
            

        }catch(msg){
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(req.body.password)
        delete user.confirmPassword

        if(user.id){
            app.db('users')
            .update(user)
            .where({id: user.id})
            .whereNull('deletedAt')
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err));
        }
    }
    
    const get = (req, res)=>{
        app.db('users')
        .select('id', 'name', 'email', 'admin', 'balance', 'imageUrl')
        .whereNull('deletedAt')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    const putBalance = (req, res)=>{
        const { balance } = req.body; // Obtenha o novo saldo do corpo da requisição

        // Verifique se o valor do balance foi fornecido
        if (balance === undefined) {
            return res.status(400).send({ error: 'Balance is required' });
        }
    
        // Atualize o saldo no banco de dados
        app.db('users')
            .where({ id: req.params.id })
            .update({ balance }) // Atualize a coluna balance com o valor fornecido
            .then(() => res.status(204).send()) // Retorna 204 No Content em caso de sucesso
            .catch(err => res.status(500).send(err)); // Lida com erros no servidor
    };

    const getById = (req, res)=>{
        app.db('users')
        .select('id', 'name', 'email', 'admin', 'balance')
        .where({id: req.params.id})
        .whereNull('deletedAt')
        .first()
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
    }

    const remove = async(req,res)=>{
        try{
                const rowUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({id: req.params.id})
                
                existsOrError(rowUpdated, 'Usuario nao foi encontrado')
                res.status(204).send()
            }catch(msg){
                res.status(400).send(msg)
            }
    }
    return {save, putBalance, get, getById, remove}
}