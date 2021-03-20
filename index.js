const express = require("express");
const app = express();

app.set("view engine","ejs") //Diz ao express para usar o View engine como o ejs
app.use(express.static('public')); //usa um pasta com arquivos estaticos como css, imagem, html, etc

app.get("/",(req,res) => {
    res.render("index");   //desenha na tela o arquivo ejs, não precisa adicionar o diretorio views nem a extensao
});

app.listen(8080,() => {console.log("App rodando");})