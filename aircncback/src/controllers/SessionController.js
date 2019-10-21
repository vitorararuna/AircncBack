//INDEX: Listagem de seções
//SHOW: listar um unica seção
//STORE: Criar uma seção
//UPDATE: Alterar uma seção
//DESTROY: Deletar uma seção
//Esses são os métodos que podemos ter dentro de um controller

const User = require('../models/User');



//Comunicando aplicação com o banco Mongo
module.exports = {
   async store(req, res){
        const {email} = req.body;

        let user = await User.findOne({email});  //vendo se tem um usuário já com o email, se não tiver:
        
        if(!user){
           user = await User.create({email});
        }

        return res.json(user);
    }
};


//logo
//só importei o meu user e estou na rota que faz login/cadastro no me BD