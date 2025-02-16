const express = require("express");
const app = express();
const porta = 3000;
const body_parser = require(`body-parser`);
app.use(body_parser.json());

let casas = [{numero: 1, cep: "88031230", tipo: "casa"}];

app.get(`/casas`, (req, res) => res.status(201).json(casas));

app.get(`/casas/:numero`, (req, res) => {

    const { numero } = req.params;

    const casa_a_encontrar = casas.find(casa => casa.numero === parseInt(numero));

    if(casa_a_encontrar){

        res.status(200).json(casa_a_encontrar);

    } else {

        res.status(404).json({message: `Casa não encontrada!`});
    };
});

app.post(`/casas`, (req, res) => {

    const casa_a_cadastrar = {

        numero: casas.length + 1,
        cep: Date.now(),
        tipo: `Casa`
    };

    casas.push(casa_a_cadastrar);
    res.status(201).json({
        casa_cadastrada: casa_a_cadastrar,
        message: `Casa cadastrada com sucesso!`});
});

app.put(`/casas/:numero`, (req, res) => {

    const { numero } = req.params;
    const index_casa = casas.findIndex(casa => casa.numero === parseInt(numero));

    if(index_casa != -1){

    const casa_atualizada = {

        numero: casas[index_casa].numero,
        cep: Date.now(),
        tipo: "apartamento"
    };

    casas.splice(index_casa,1, casa_atualizada);
    res.status(200).json({
        casa_atualizada: casa_atualizada,
        message: `Atualizado com sucesso`});

    } else {

        res.status(404).json({message: `Erro ao encontrar a casa`});
    };
});

app.delete(`/casas/:numero`, (req, res) => {

    const { numero } = req.params;

    const index_casa = casas.findIndex(casa => casa.numero === parseInt(numero));

    if(index_casa != -1){

        casas.splice(index_casa, 1);
        res.status(200).json({message: `Casa deletada com sucesso!`});

    } else {

        res.status(404).json({message: `Casa não encontrada!`});
    };
});

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));