const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router(); //cara que separa as rotas do express
const upload = multer(uploadConfig);


//1 
///routes.post('/users', (req, res) => {
///    return res.json({idade: req.query.idade});  
///});

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'),SpotController.store);  //upload.silgle pois estou passando uma só imagem e então passo o nome do campo que vai conter minha img (só olhar no insomnia)

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

//criar rotas de aceitar e rejeitar uma solicitação:
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);



//2
module.exports = routes; 












//1
// primeiro eu passei a rota e depois uma função:
// req (requisição) vou pegar qualquer tipo de parametro que o usuário esteja enviando na minha requisição 
// res (resposta) para devolver uma resposta à essa requisição

//req.query = Acessar query params (para filtros) GET
//req.params = Acessar route params (para edição e delete) PUT
//req.body = Acessar corpo da requisição (criação e edição de registros) POST



//2
// exportando nossas rotas desse arquivo para que a nossa aplicação conheça essas rotas