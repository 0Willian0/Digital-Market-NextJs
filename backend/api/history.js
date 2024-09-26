const queries = require('./queries')

module.exports = app =>{
    const  {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) =>{
        const history = req.body

            app.db('productDateHistory')
            .insert(history)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }


    const getData = async(req, res)=>{
        const userId = req.params.id

        app.db('productDateHistory')
        .select(app.db.raw('DISTINCT "dateBuyed"::DATE as "dateBuyed"'))
        .where('user_id', userId)
        .then(history => {
            res.json(history)
        })
        .catch(err => {
            console.error('Database query error:', err);
            res.status(500).send('An error occurred');
        });
    }

    const getProducts = async(req,res)=>{

        const dateBuyed = req.query.dateBuyed 
        const userId = req.query.userId

        app.db('productDateHistory as pd')
        .select('p.id', 'p.name', 'p.imageUrl', 'p.price', 'pd.dateBuyed')
        .join('products as p', 'pd.product_id', '=', 'p.id')
        .whereRaw('TO_CHAR(pd."dateBuyed", \'DD/MM/YYYY\') = ?', [dateBuyed])
        .andWhere('pd.user_id', userId)
        .then(result => res.json(result))
        .catch(err => {
        console.error('Database query error:', err);
        res.status(500).send('An error occurred');
        });

    }

    const getTotalPrice = async(req, res)=>{

        const dateBuyed = req.query.dateBuyed 
        const userId = req.query.userId

        app.db('productDateHistory as pd')
        .join('products as p', 'pd.product_id', '=', 'p.id')
        .whereRaw('TO_CHAR(pd."dateBuyed", \'DD/MM/YYYY\') = ?', [dateBuyed])
        .andWhere('pd.user_id', userId)
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



    return {save, getData, getProducts, getTotalPrice}
}