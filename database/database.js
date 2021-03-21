const Sequelize = require ('sequelize');
//cria a objeto de conexao com o db (nome do bd,usuario,senha{host/Servidor,dialect/QualBd})
const connection = new Sequelize('guiaperguntas','root','162001',{
    host:'localhost',
    dialect: 'mysql'
});

//exporta o modulo com a conexao para ser usada em outros arquivos
module.exports = connection; 