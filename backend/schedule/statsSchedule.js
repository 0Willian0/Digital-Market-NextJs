const schedule = require('node-schedule')

module.exports = app =>{
    schedule.scheduleJob('*/1 * * * *', async function(){
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const productsCount = await app.db('products').count('id').first()
    
        const {Stat} = app.api.stat

        const lastStat = await Stat.findOne({},{},
            {sort: {'createAt': -1}}
        )

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            products: productsCount.count,
            createAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeProducts = !lastStat || stat.products !== lastStat.products

        if(changeUsers || changeCategories || changeProducts){
            stat.save().then(()=> console.log('[Stats] Estatisticas atualizadas!'))
        }
    })
}