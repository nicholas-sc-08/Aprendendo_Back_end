const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const app = express();
const porta = 3000;

app.use(body_parser.json());
app.use(cors());

let produtos = [];

app.get(`/produtos`, (req, res) => {

    res.status(200).json(produtos);
});

app.get(`/produtos/:id`, (req, res) => {

    const { id } = req.params;
    const encontrar_produto = produtos.find(produto => produto.id === parseInt(id));

    if(encontrar_produto){

        res.status(200).json(encontrar_produto);

    } else {

        res.status(404).json(`Erro ao buscar produto`);
    };
});

app.post(`/produtos`, (req, res) => {

    const { nome, categoria, preco } = req.body;
    const produto_a_cadastrar = {

        id: produtos.length + 1,
        nome: nome,
        categoria: categoria,
        preco: preco
    };

    produtos.push(produto_a_cadastrar);
    res.status(200).json(produto_a_cadastrar);
});

app.put(`/produtos/:id`, (req, res) => {

    const { id } = req.params;
    const { nome, categoria, preco } = req.body;

    const index_do_produto = produtos.findIndex(produto => produto.id === parseInt(id));

    if(index_do_produto != -1){

        const produto_atualizado = {

            id: parseInt(id),
            nome: nome,
            categoria: categoria,
            preco: preco
        };

        produtos.splice(index_do_produto, 1, produto_atualizado);
        res.status(200).json(`Produto atualizado com sucesso!`);

    } else {

        res.status(404).json(`Erro ao encontrar o produto para atualizar`);
    };
});

app.delete(`/produtos/:id`, (req, res) => {

    const { id } = req.params;

    const index_produto = produtos.findIndex(produto => produto.id === parseInt(id));

    if(index_produto != -1){

        produtos.splice(index_produto, 1);
        res.status(200).json(`Produto excluido com sucesso!`);

    } else {

        res.status(404).json(`Erro ao encontrar produto para deletar!`);
    };
});

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));