import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Components/Header'
import Footer from './Components/Footer'
import SearchByNumber from './Components/SearchByNumber'
import PokemonList from './Components/PokemonList'
import Pagination from './Components/Pagination'

function App() {

  const [loading, setLoading] = useState(false)
  const [pokemon, setPokemon] = useState([])
  const [currPageUrl, setCurrPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [nextPageUrl, setNextPageUrl] = useState()

  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(response => {
      setLoading(false)
      setPrevPageUrl(response.data.previous)
      setNextPageUrl(response.data.next)
      setPokemonData(response.data.results)
    })

    return () => {
      cancel()
    }
  }, [currPageUrl])


  function gotoPrevPage() {
    setCurrPageUrl(prevPageUrl)
  }

  function gotoNextPage() {
    setCurrPageUrl(nextPageUrl)
  }

  function searchByPokedex(pokedex) {
    let offset = 0

    if (pokedex >= 20) {
      offset = Math.floor(pokedex / 20) * 20 - 1
    }
    else {
      offset = Math.floor(pokedex / 20) * 20
    }

    if (pokedex < 1 || pokedex > 898) {
      setCurrPageUrl('https://pokeapi.co/api/v2/pokemon/')
    }
    else {
      setCurrPageUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
    }
  }

  async function getPokemonData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          resolve(data)
        })
    })
  }

  async function setPokemonData(data) {
    const pokemonData = await Promise.all(data.map(async pokemon => {
      const pokemonRecord = await getPokemonData(pokemon.url)
      return pokemonRecord
    }))
    setPokemon(pokemonData)
  }

  if (loading) return "Loading..."
  return (
      <div className='main-container'>
        <div className='container'>
          <Header />
          <SearchByNumber searchByNumber={searchByPokedex}/>
          <PokemonList pokemon={pokemon}/>
          <Pagination prevPage={prevPageUrl ? gotoPrevPage : null} nextPage={nextPageUrl ? gotoNextPage : null}/>
          <Footer />
        </div>
      </div>
  );
}

export default App;
