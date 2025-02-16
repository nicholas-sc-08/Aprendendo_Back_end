const express = require(`express`);
const cors = require(`cors`);
const body_parser = require(`body-parser`);
const app = express();
const porta = 3000;

app.use(body_parser.json());
app.use(cors());

let carros = [{numero_de_serie: 1, nome: `a`, marca: `a`, ano_de_lanc: `a`}];

app.get(`/carros`, (req, res) => {

    res.status(200).json(carros);
});

app.get(`/carros/:numero_de_serie`, (req, res) => {

    const { numero_de_serie } = req.params;
    const achar_carro = carros.find(carro => carro.numero_de_serie === parseInt(numero_de_serie));

    if(achar_carro){

        res.status(200).json(achar_carro);
    } else {

        res.status(404).json(`Erro ao encontrar o carro!`);
    };
});

app.post(`/carros`, (req, res) => {

    const { nome, marca, ano_de_lanc } = req.body;

    const carro_a_cadastrar = {

        numero_de_serie: carros.length + 1,
        nome: nome,
        marca: marca,
        ano_de_lanc: ano_de_lanc
    };

    carros.push(carro_a_cadastrar);
    res.status(200).json(carro_a_cadastrar);
});

app.put(`/carros/:numero_de_serie`, (req, res) => {

    const { numero_de_serie } = req.params;
    const { nome, marca, ano_de_lanc } = req.body;

    const index_carro = carros.findIndex(carro => carro.numero_de_serie === parseInt(numero_de_serie));

    if(index_carro != -1){

        const carro_atualizado = {

            numero_de_serie: carros[index_carro].numero_de_serie,
            nome: nome,
            marca: marca,
            ano_de_lanc: ano_de_lanc
        };

        carros.splice(index_carro, 1, carro_atualizado);
        res.status(200).json(carro_atualizado);
    } else {

        res.status(404).json(`Carro não encontrado!`);
    };
});

app.delete(`/carros/:numero_de_serie`, (req, res) => {

    const { numero_de_serie } = req.params;
    const encontrar_carro = carros.findIndex(carro => carro.numero_de_serie === parseInt(numero_de_serie));

    if(encontrar_carro != -1){

        carros.splice(encontrar_carro, 1);
        res.status(200).json(`Carro excluido com sucesso!`);

    } else {

        res.status(404).json(`Carro não encontrado!`);
    };
});

app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
