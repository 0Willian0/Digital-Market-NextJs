const mongoose = require('mongoose');
const uri = "mongodb://localhost/digital_market_stats";

// A configuração 'useUnifiedTopology' deve ser passada diretamente no connect
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true // Configuração correta aqui
})
.catch(e => {
    const msg = 'Não foi possível conectar com o MongoDB!';
    console.log("\x1b[41m%s\x1b[37m", msg, "\x1b[0m");
    console.error(e); // Opcional: logar o erro real para depuração
});

