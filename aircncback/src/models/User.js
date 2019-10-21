const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email: String,
});

module.exports = mongoose.model('User', UserSchema); //Agora o mongo já sabe que ele precisa utilizar um campo de email quando for criar um usuário.





//logo
//Vou precisar só do mongoose para exportar minha tabela (model) User