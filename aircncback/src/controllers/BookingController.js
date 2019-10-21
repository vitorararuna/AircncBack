//INDEX: Listagem de seções
//SHOW: listar um unica seção
//STORE: Criar uma seção
//UPDATE: Alterar uma seção
//DESTROY: Deletar uma seção
//Esses são os métodos que podemos ter dentro de um controller

//BOOKING = RESERVA --> VOU TER UMA ROTA DE CRIAÇÃO DE UMA NOVA RESERVA E NÃO TEM COMO FAZER UMA RESERVA SEM UM SPOT

const Booking = require('../models/Booking');


module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params; //parametro que vem da rota. OLhar na em routes como é essa rota
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,  //usuario que criou a solicitação
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate(); // --> para no meu insomnia não mostrat apenas o id de spot e user, mas parece que n funcionou

        const ownerSocket = req.connectedUsers[booking.spot.user];      
        if (ownerSocket){ //se existir uma conexão em tempo real com esse id, vou enviar uma msg pra ele 
            req.io.to(ownerSocket).emit('booking_request', booking); // no meu front, vou ouvir esse booking_request
        }  

        return res.json(booking);
    }
};