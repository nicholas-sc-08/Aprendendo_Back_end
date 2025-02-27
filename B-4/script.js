const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const pg = require(`pg`);

require("dotenv").config();  // carrega as variaveis do arquivo .env
const port = process.env.PORT; // armazena o número da porta

const app = express();
const db = require(`./db`);


app.use(body_parser.json());
app.use(cors());


app.get(`/USUARIOS`, async (req, res) => {

    const usuarios = await db.selecionar_usuarios();
    res.json(usuarios);
});

app.get(`/`, async (req, res) => {

    try {

        res.json();

    } catch (erro) {
      
        console.error(erro);
    };
});

app.listen(port, () => console.log(`Servidor HTTP rodando na porta ${port}`));