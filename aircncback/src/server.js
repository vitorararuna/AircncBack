const express = require('express'); // require é ára importar uma dependencia externa
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app); // estou pegando o nosso servidor http e extraindo ele de dentro do meu express
const io = socketio(server); // Cara que vamos utilizar para enviar msg ou receber msg lá de dentro do nosso frontend ou do mobile... agora o meu server passa a ouvir também o protocolo web socket -> agr lá em baixo vai ficar server.listen


mongoose.connect('mongodb+srv://vitorararuna:anonimo789@semana2-vigqg.mongodb.net/semana2back?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => {  //estou ouvindo a informação de todo usuário que se logar na minha aplicação e o "socket" representa a conexão que eu tenho com esse usuário. Seja na web, seja no mobile
//  console.log('Usuário conectado', socket.id); // no terminal vai retornar esse log, com um id de um socket conectado. Esse usuário conectado pode receber informações em tempo real !!
    //agr preciso relacionar esse socket.id com o usuário que está conectado (o front guarda isso no localstorage) -> olhar useEffect do index.js do front. depois de mudar as coisas lá, basta:
//  console.log(socket.handshake.query); // obtem o nosso user id
    const {user_id} = socket.handshake.query;
    connectedUsers[user_id] = socket.id; //aqui estou relacionando o id do usuário com o id de conexão dele 
});

//para adicionar uma funcionalidade em toda a rota uso o app.use O 'next' quer dizer que eu quero continuar o fluxo normal da aplicação
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers; //deixando disponivel para todas as minhas rotas, os usuários connectados na minha aplicação
    return next();
}) 




app.use(cors()); //poderia ter passado cors('http://localhost:3333') para passar qual endereço que pode acessar, mas deixei livre pra qualquer aplicação
app.use(express.json()); //estou informando que o express utiliza um formato json 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);  

server.listen(3333); //porta que quero executar minha aplicação. Agora minha aplicação está pronta paraouvir tanto requisições com protocolo http quanto req com protocolo websocket
// node src/server.js = comando para ligar o servidor
// para não ter que fazer isso adicionei um yarn add nodemon -D
// devDependences são dep. que vamos usar off (dev desenvolvendo)
// adicionei um "scripts" no meu package.json e coloque uma "dev" (ver lá) para a gente executar só "yarn dev" e o servidor ficar aberto elivereaload