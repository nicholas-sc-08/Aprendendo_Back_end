import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [formulario, set_formulario] = useState({nome: ``, marca: ``, ano_de_lanc: ``});
  const [carros, set_carros] = useState([]);

  const resgatar_array_carros = async () => {

    try{

      const dados = await axios.get(`http://localhost:3000/carros`);
      set_carros(dados.data);
      console.log(carros);

    } catch(erro){

      console.error(erro);
    };
  };

  const atualizar_carro = async i => {

    try{

      const envio = await axios.put(`http://localhost:3000/carros/${i}`, formulario);    
      set_formulario({nome: ``, marca: ``, ano_de_lanc: ``});
    
    } catch(erro){

      console.error(erro);
    };
  };

  const deletar_carro = async i => {

    try {

      const envio = await axios.delete(`http://localhost:3000/carros/${i}`);
      
    } catch (erro) {
      
      console.error(erro);
    };
  };
  
  const lidar_com_envio = async e => {

    e.preventDefault();

    try{
 
      const envio = await axios.post(`http://localhost:3000/carros`, formulario);
      carros.push(formulario);
      resgatar_array_carros();
      
      set_formulario({nome: ``, marca: ``, ano_de_lanc: ``});
    } catch(erro){

      console.error(erro);
    };
  };

  useEffect(() => {

    resgatar_array_carros();
  }, [carros]);

  return (
    <>
      <div>
        <form onSubmit={lidar_com_envio}>

          <label>Nome do carro:</label>
          <input type="text" required onChange={e => set_formulario({...formulario, nome: e.target.value})} value={formulario.nome}/>

          <label>Marca:</label>
          <input type="text" required onChange={e => set_formulario({...formulario, marca: e.target.value})} value={formulario.marca}/>

          <label>Ano de Lançamento</label>
          <input type="text" required onChange={e => set_formulario({...formulario, ano_de_lanc: e.target.value})} value={formulario.ano_de_lanc}/>

          <button type='submit'>Cadastrar carro</button>
        </form>

        {carros.map((carro, i) => (

          <div key={i}>

              <p>Número de Série: {carro.numero_de_serie}</p>
              <p>Nome: {carro.nome}</p>
              <p>Marca: {carro.marca}</p>
              <p>Ano de lançamento: {carro.ano_de_lanc}</p>
              <button onClick={() => atualizar_carro(carro.numero_de_serie)}>Editar</button>
              <button onClick={() => deletar_carro(carro.numero_de_serie)}>Excluir</button>
          </div>
        ))};
      </div>
    </>
  )
}

export default App
