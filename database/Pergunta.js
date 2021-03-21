const Sequelize = require ('sequelize');
const connection = require ('./database');

//cria tabela chamada pergunta e os itens são criados em json
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false //não permite valor nulo
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});


//sincroniza o model com o banco de dados
Pergunta.sync({force: false}).then(() =>{ //force nao força a criação da tabela caso exista
    console.log("tabela  criada");
})


module.exports = Pergunta; //exporta o model Pergunta