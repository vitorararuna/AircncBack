//INDEX: Listagem de seções
//SHOW: listar um unica seção
//STORE: Criar uma seção
//UPDATE: Alterar uma seção
//DESTROY: Deletar uma seção
//Esses são os métodos que podemos ter dentro de um controller

const Spot = require('../models/Spot');


module.exports = {
    async show(req, res){
        const { user_id } = req.headers;

        const spots = await Spot.find({ user: user_id });  //Estou buscando todos os spots que o campo user lá dentro do meu BD é = user_id do meu header 

        return res.json(spots);
    }
}