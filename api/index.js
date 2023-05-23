// Conexão com o servidor

const restify = require("restify");
const errors = require("restify-errors")

const servidor = restify.createServer({
    name: "loja_dsapi",
    version: "1.0.0"
})

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001, function(){
    console.log("%s executando em %s", servidor.name, servidor.url);
});

// Conexão com o banco de dados

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'loja_dsapi'
    }
});

// Get de boas vindas

servidor.get('/', (req, res, next) => {
    res.send('Bem-vindo(a) à API loja');   
});

// Get para mostrar todos os produtos

servidor.get('/produtos', (req, res, next) => {
    knex('produtos').then((dados) =>{
        res.send(dados);
    },next);
    
});

// Get para mostrar os produtos por id

servidor.get('/produtos/:id', (req, res, next) => {
    const idProduto = req.params.id;
    knex('produtos')
    .where('id', idProduto)
    .first()
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Este produto não foi encontrado'))
        }
        res.send(dados);
    },next);
});

// Post para cadastrar clientes

servidor.post('/clientes', (req, res, next) => {
    const idProd = req.params.idProd;
    knex('clientes')
    .where('id', idProd)
    .insert(req.body)
    .then((dados) =>{
        res.send(dados);
    },next);
});



// admins

// servidor.post('/clientes', (req, res, next) => {
//     const idProd = req.params.idProd;
//     knex('clientes')
//     .where('id', idProd)
//     .insert(req.body)
//     .then((dados) =>{
//         res.send(dados);
//     },next);
// });

servidor.put('/produtos/:idProd', (req, res, next) => {
    const idProd = req.params.idProd;
    knex('produto')
    .where('id', idProduto)
    .update(req.body)
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Este produto não foi encontrado'))
        }
        res.send('Produto atualizado');
    },next);

});

servidor.del('/produtos/:idProd', (req, res, next) => {
    const idProd = req.params.idProd;
    knex('produto')
    .where('id', idProduto)
    .delete()
    .then((dados) =>{
        if(!dados){
            return res.send(new errors.BadRequestError('Este produto não foi encontrado'))
        }
        res.send('Produto deletado');
    },next);

});