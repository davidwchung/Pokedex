import { useState } from 'react'

export default function SearchByNumber( { searchByNumber }) {

    const [pokedexNumber, setPokedexNumber] = useState('')

    function onSubmit(e) {
        e.preventDefault()

        searchByNumber(pokedexNumber)
        setPokedexNumber('')
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Search By Pokedex Number </label>
            <input type="text" maxLength="3" size="3" placeholder='1-898' value={pokedexNumber} onChange={(e) => setPokedexNumber(e.target.value)}/>
        </form>
    )
}
