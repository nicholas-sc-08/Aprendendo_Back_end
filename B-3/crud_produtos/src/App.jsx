import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [produto, set_produto] = useState({nome: ``, categoria: ``, preco: ``});
  const [produtos, set_produtos] = useState([]);

  const buscar_produtos = async () => {

    try {
      
      const produtos = await axios.get(`http://localhost:3000/produtos`);
      set_produtos(produtos.data);

    } catch (error) {
      
      console.error(`Erro ao buscar produtos!`);
    };
  };

  useEffect(() => {

    buscar_produtos();
  }, []);

  const cadastrar_produto = async (e) => {

    e.preventDefault();

    try {
      
      const enviar_produto = await axios.post(`http://localhost:3000/produtos`, produto);
      buscar_produtos();

    } catch (error) {
      
      console.error(error);
    }
  };

  const atualizar_produto = async (id) => {

    try {
      
      const produto_atualizado = await axios.put(`http://localhost:3000/produtos/${id}`, produto);
      buscar_produtos();

    } catch (error) {
      
      console.error(error);
    };
  };

  const deletar_produto = async (id) => {

    try {
      
      const produto_a_deletar = await axios.delete(`http://localhost:3000/produtos/${id}`);
      buscar_produtos();

    } catch (error) {
      
      console.error(error);
    };
  };

  return (
    <>
      <div>
        <form onSubmit={cadastrar_produto}>

        <label>Nome: </label>
        <input type="text" required value={produto.nome} onChange={e => set_produto({...produto, nome: e.target.value})}/>

        <label>Categoria: </label>
        <input type="text" required value={produto.categoria} onChange={e => set_produto({...produto, categoria: e.target.value})}/>

        <label>Preço: </label>
        <input type="text" required value={produto.preco} onChange={e => set_produto({...produto, preco: e.target.value})}/>

        <button type='submit'>Cadastrar Produto</button>

        </form>

        {produtos.map((produto, i) => (

          <div key={i}>

            <p>Id: {produto.id}</p>
            <p>Nome: {produto.nome}</p>
            <p>Categoria: {produto.categoria}</p>
            <p>Preço: {produto.preco}</p>
            <button onClick={() => atualizar_produto(produto.id)}>Editar</button>
            <button onClick={() => deletar_produto(produto.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
