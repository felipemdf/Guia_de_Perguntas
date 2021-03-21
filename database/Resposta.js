const Sequelize = require ('sequelize');
const connection = require ('./database');

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});


Resposta.sync({force: false}).then(() =>{ //force nao força a criação da tabela caso exista
    console.log("tabela  reposta criada");
});

module.exports = Resposta; //exporta a variavel Resposta