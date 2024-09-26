const queries = require('./queries')

module.exports = app =>{
    const  {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) =>{
        const product = { ...req.body}
        if(req.params.id) product.id = req.params.id

        try{
            existsOrError(product.name, 'Nome nao informado')
            existsOrError(product.price, 'Preco nao informado')
            existsOrError(product.categoryId, 'Cartegoria nao informada')
        }catch(msg){
            res.status(400).send(msg)
        }

        if(product.id){
            app.db('products')
            .update(product)
            .where({id: product.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('products')
            .insert(product)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res)=>{
        try{
            const rowsDeleted = await app.db('products')
            .where({id: req.params.id}).del()
            
            try{
                existsOrError(rowsDeleted, 'Produto nao foi encontrado')
            }catch(msg){
                res.status(400).send(msg)
            }

            res.status(204).send()
        }catch(msg){
            res.status(500).send(msg)
        }
    }

    const limit = 5 // usado para paginacao
    const get = async (req, res) =>{
        const page = req.query.page || 1

        const result = await app.db('products').count('id').first()
        const count = parseInt(result.count)

        app.db('products')
            .select('id', 'name', 'price', 'imageUrl')
            .limit(limit).offset(page * limit - limit)
            .then(products => res.json({data: products, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    const getAll = (req, res)=>{
        app.db('products')
        .select('id', 'name', 'price', 'imageUrl')
        .then(product => res.json(product)
        )
        .catch(err=> res.status(500).send(err))
    }

    const getById = (req, res)=>{
        app.db('products')
        .where({id:req.params.id})
        .first()
        .then(product => res.json(product)
        )
        .catch(err=> res.status(500).send(err))
    }

    const getByCategory = async(req, res)=>{
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c=>c.id)

        app.db({p: 'products'})
        .select('p.id', 'p.name', 'p.price', 'p.imageUrl')
        .limit(limit).offset(page * limit - limit)
        .whereIn('categoryId', ids)
        .orderBy('p.id', 'desc')
        .then(products => res.json(products))
        .catch(err => res.status(500).send(err))
    }

    return {save, remove, get, getById, getByCategory, getAll}
}