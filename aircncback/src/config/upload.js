const multer = require('multer');
const path = require('path');







module.exports = {
    //1
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','uploads'),
        filename: (req, file, cb) =>{
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext); //retorna o nome de uma imagem sem a extensão, então eu passo ela como 2 parametro

            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};


//1
//como o multer vai armazenar as imagens ou os arquivos que a gente receber da nossa aplicação
//O multer tem vários tipos de storage (vários tipos de locais) que consegue salvar e um deles é no disco (disk)
//que são os arquivos fixos da nossa aplicação mesmo.
//"destination" = qual pasta que esses arquivos serão slavos -- vou importar um carinha chamado "path" e "path.resolve" para eu informar
//qual será a pasta que vou gravar esses meus arquivos
//Depois vou informar como o nome do arquivo vai ser formado com uma função onde:
//req=requisição ; file=arquivoEmSi, callback(cb)=funcaoQueDeveSerChamadaAssimQueONomeDoArquivoTiverPronto
// vou formar o nome do arquivo pela junção de varias variáveis: `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
// onde 1 é o nome do arquivo que veio do cliente, o 2 é a timestemp da data atual, o 3 é a extensão do meu arquivo