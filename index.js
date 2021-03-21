const express = require("express");
const app = express();
const connection = require("./database/database"); //importa o objeto que esta conectado ao bd
const Pergunta = require("./database/Pergunta") //Model que representa a tabela perguntas
const Resposta = require("./database/Resposta") //Model que representa a tabela de resposta

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
app.get('/', (req, res) => {
    //procura todas os itens da tabela, equivale ao SELECT *
    Pergunta
      .findAll({ 
        raw: true,  //raw:true faz uma pesquisa com as informações básicas.
        order: [['id', 'DESC']] //porque podem ser aplicados outras ordenações
      })
      .then(perguntas => { //o then recebe as perguntas,
        res.render('index', { perguntas }); //desenha na tela o arquivo ejs e envia os itens da tabela na variavel perguntas
      })
      .catch((err) => console.log(err));;
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


app.get('/pergunta/:id',(req,res) =>{
    var id = req.params.id; 
    Pergunta.findOne({ //busca um dado com condição
        where: {id:id}
    }).then(pergunta => { //chama o then se achar a pergunta
        if(pergunta != undefined){ //pergunta achada
            Resposta.findAll({ //pega as respostas que possuem o mesmo id da pergunta
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }
        else{ //pergunta nao achada
            res.redirect("/"); //o redirect e quando uma pagina ja foi renderizada antes
        }
    });
})

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo; //pega o textarea de nome corpo
    var perguntaId = req.body.pergunta; //pega o input de nome pergunta

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {res.redirect("/pergunta/"+perguntaId);}); //depois de responder redireciona para a pergunta que respondeu
});

//CRIA SERVIDOR
app.listen(8080,() => {console.log("App rodando");})