//INDEX: Listagem de seções
//SHOW: listar um unica seção
//STORE: Criar uma seção
//UPDATE: Alterar uma seção
//DESTROY: Deletar uma seção
//Esses são os métodos que podemos ter dentro de um controller
const User = require('../models/User');
const Spot = require("../models/Spot");


//Comunicando aplicação com o banco Mongo
module.exports = {

    async index(req, res){
        const {tech} = req.query;

        const spots = await Spot.find({techs: tech}); // listagem de spots baseado por tecnologia

        return res.json(spots);
       },




    async store(req, res){
        const {filename} = req.file;
        const {company, techs, price} = req.body;
        const {user_id} = req.headers;                      // o header serve pra gente definir o contexto da nossa requisição, geralmente para autenticação, idioma do usuário, etc

        const user = await User.findById(user_id);
        if(!user){
            return res.status(400).json({error: 'Usuario não existe'});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()), //split para cortar meu array e o map para caso haja espaço em branco apos as virgulas
            price
        })

        return res.json(spot);
    }
};