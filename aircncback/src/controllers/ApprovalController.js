const Booking = require('../models/Booking');


module.exports = {
    async store(req, res){
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user]; //procurar por uma conexão em webSocket do usuario que esta fzd a reserva  
        if (bookingUserSocket){ //se tiver disponivel essa informação, vou enviar um booking_response (resposta se foi aprovado ou não)
            req.io.to(bookingUserSocket).emit('booking_response', booking); 
        }  

        return res.json( booking );
    }
};