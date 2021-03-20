const express = require("express");
const app = express();
const sequelize = require("sequelize"); //biblioteca para conectar ao banco de dado


app.set("view engine","ejs") //Diz ao express para usar o View engine como o ejs
app.use(express.static('public')); //usa um pasta com arquivos estaticos como css, imagem, html, etc

app.use(express.urlencoded({ extended: true })); //funcionalidade que capta os dados para traduzilos em dado js
app.use(express.json()); //permite que leia dados de formulario json
app.get("/",(req,res) => {
    res.render("index");   //desenha na tela o arquivo ejs, não precisa adicionar o diretorio views nem a extensao
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res) => { //recebe o formulario pelo post
    var titulo = req.body.titulo; //pega o valor do titulo pois está utilizando o  express.urlencoded e express.json
    var descricao = req.body.descricao;
    res.send("Fomulario recebido!<br> Titulo: " + titulo + "<br>" + " Descrição: " + descricao);
});

app.listen(8080,() => {console.log("App rodando");})