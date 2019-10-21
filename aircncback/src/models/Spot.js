const mongoose = require('mongoose');


const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId, //estou guardando o id do usuário que criou esse spot (local)
        ref: 'User' //referencia pra qual model é essa infotmação
    }
}, {
    toJSON: {  //  ou seja, toda vez que um spot for convertido em json, eu quero que calcule os virtuals automaticamente
        virtuals: true,
    },
});

//vou fzr ele criar um novo campo que vai ser computado pelo js, mas não existe no banco. Dentro do mongoo, isso é chamado de "virtual"
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})
//então agora eu preciso criar uma rota que devolve essa img pra gente. Então eu vou lá em server.js, importo o path ; app.use('/files', express.static .... ver lá como ficou)

module.exports = mongoose.model('Spot', SpotSchema); //Agora o mongo já sabe que ele precisa utilizar esses campos quando for criar um spot (local).



//logo
//Vou precisar só do mongoose para exportar minha tabela (model) spot