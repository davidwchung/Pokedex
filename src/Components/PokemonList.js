import Pokemon from './Pokemon'

export default function PokemonList( { pokemon } ) {
    return (
        <div className='pokemon-container'>
            {pokemon.map(p => (
                <Pokemon key={p.id} p={p}/>
            ))}
        </div>
    )
}
