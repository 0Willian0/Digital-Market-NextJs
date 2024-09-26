const queries = require('./queries')

module.exports = app =>{
    const  {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) =>{
        const cart = { 
            user_id: req.params.id1,
            product_id: req.params.id2
        }
            app.db('carts')
            .insert(cart)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res)=>{
        try {
            const record = await app.db('carts')
                .where({
                    user_id: req.params.id1,
                    product_id: req.params.id2
                })
                .first();  // Obtém o primeiro registro que corresponde às condições
        
            if (record) {
                const rowsDeleted = await app.db('carts')
                    .where({
                        id: record.id  // Usa o ID do registro para garantir a exclusão correta
                    })
                    .del();
        
                if (rowsDeleted > 0) {
                    res.status(204).send();  // Sucesso: 204 No Content
                } else {
                    res.status(404).send({ message: 'No matching record found' });  // Erro: 404 Not Found
                }
            } else {
                res.status(404).send({ message: 'No matching record found' });  // Erro: 404 Not Found
            }
        } catch (error) {
            console.error('Error:', error);  // Log de erro para depuração
            res.status(500).send({ error: 'Internal Server Error' });  // Erro: 500 Internal Server Error
        }
    }

    const pay = async (req, res)=>{
        try {
            const record = await app.db('carts')
                .where({
                    user_id: req.params.id,
                }).del()
                res.status(204).send();
        } catch (error) {
            console.error('Error:', error);  // Log de erro para depuração
            res.status(500).send({ error: 'Internal Server Error' });  // Erro: 500 Internal Server Error
        }
    }

    const getForHistory = async(req, res)=>{
        const userId = req.params.id

        const cart = await app.db('carts')
        .select('user_id','product_id')
        .where('user_id', userId)

        const history = cart.map(product=>({
            ...product,
            dateBuyed: new Date()
        }))

        res.json(history)

    }

    const getTotalPrice = async(req, res)=>{
        const userId = req.params.id

        app.db('carts as c')
        .join('products as p', 'c.product_id', '=', 'p.id')
        .where('c.user_id', userId)
        .sum('p.price as totalPrice')  // Soma dos preços
        .then(result => {
            // O resultado será um array com um objeto contendo a soma dos preços
            const totalPrice = result[0].totalPrice || 0;
            res.json({ totalPrice });
        })
        .catch(err => {
            console.error('Database query error:', err);
            res.status(500).send('An error occurred');
        });
    }

    const getUserCart = async(req, res)=>{

        const userId = req.params.id // ID do usuário passado na requisição

        app.db('carts as c')
        .select('p.id', 'p.name', 'p.imageUrl', 'p.price')
        .join('products as p', 'c.product_id', '=', 'p.id')
        .where('c.user_id', userId)
        .then(result => res.json(result))
        .catch(err => {
        console.error('Database query error:', err);
        res.status(500).send('An error occurred');
        });
    }


    return {save, remove, pay, getUserCart, getTotalPrice, getForHistory}
}