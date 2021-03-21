const express = require("express");
const app = express();
const connection = require("./database/database"); //importa o objeto que esta conectado ao bd
const Pergunta = require("./database/Pergunta") //importa o model que cria a tabela


//DATABASE
connection
    .authenticate() //tenta conectar
    .then(() => { //se conseguir 
        console.log("Conexão feita com o banco de dados!");
    })
    .catch((msgErro) =>{ //se não conseguir
        console.log("Erro ao conectar ao banco de dados!");
    })


//VIEW ENGINE
app.set("view engine","ejs") //Diz ao express para usar o View engine como o ejs
app.use(express.static('public')); //usa um pasta com arquivos estaticos como css, imagem, html, etc



//LEITURA DE DADOS
app.use(express.urlencoded({ extended: true })); //funcionalidade que capta os dados para traduzilos em dado js
app.use(express.json()); //permite que leia dados de formulario json



//RENDERIZAÇÃO
app.get("/",(req,res) => {
    //procura todas os itens da tabela, equivale ao SELECT *
    Pergunta.findAll({raw: true}).then(perguntas => { //raw:true faz uma pesquisa com as informações básicas, o then recene as perguntas
        res.render("index",{ //desenha na tela o arquivo ejs e envia os itens da tabela na variavel perguntas
            perguntas: perguntas
        }); 
    });
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) => { //recebe o formulario pelo post
    var titulo = req.body.titulo; //pega o valor do titulo pois está utilizando o  express.urlencoded e express.json
    var descricao = req.body.descricao;

    Pergunta.create({ //equivale ao INSERT do mysql
        titulo: titulo, //atribui a variavel na coluna titulo
        descricao: descricao //atribui a variavel na coluna descricao
    }).then(() => {res.redirect("/");});//redireciona o usuario para uma rota
});



//CRIA SERVIDOR
app.listen(8080,() => {console.log("App rodando");})