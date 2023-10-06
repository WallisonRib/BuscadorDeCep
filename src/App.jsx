import './App.css'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'
import api from './services/API'

function App() {

  const [entrada, setInput] = useState('')
  const [cep, setCep] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  const handleSearch = async (e)=> {
    if (entrada == '') {
      alert("Digite algum cep para continuar");
      return;
    }
    try {
      const response = await api.get(`${entrada}/json`)
      setCep(response.data)
      setInput('')
    }
    catch {
      alert("Erro :(")
      setInput('')
    }
  }

  return (
    <>
      <div className='container'>

        <h1 className='title'>BUSCADOR DE CEP</h1>


        <div className="inputdiv">
          <input
            type="text"
            placeholder='Digite seu CEP aqui'
            value={entrada}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            />
          <button className='buttonSearch' onClick={handleSearch}><FiSearch size={25} color='white' />
          </button>
        </div>
        {Object.keys(cep).length > 0 && (

          <main>
            <h2>CEP : {cep.cep}</h2>
            {Object.keys(cep.logradouro).length > 0 && (<span>Logradouro : {cep.logradouro}</span>)}
            {Object.keys(cep.complemento).length > 0 && (<span>Complemento : {cep.complemento}</span>)}
            {Object.keys(cep.bairro).length > 0 && (<span>Bairro : {cep.bairro}</span>)}
            <span>Cidade : {cep.localidade} - {cep.uf} </span>
            <span>DDD: {cep.ddd}</span>
          </main>
        )}

      </div>

    </>
  )
}

export default App
