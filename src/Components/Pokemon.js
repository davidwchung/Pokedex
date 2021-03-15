import { useState } from 'react'

export default function Pokemon( { p }) {

    function capitalizeFirst(name) {
        return name.charAt(0).toUpperCase() + name.slice(1)
    }

    const [showDescription, setShowDescription] = useState(false)

    return (
        <div className='pokemon' onClick={() => setShowDescription(!showDescription)}>
            <div className='pokemon-id'>{p.id}</div>
            <img src={p.sprites.front_default} alt={capitalizeFirst(p.name)}></img>
            {p.types.map((type) => (
                <div className={`pokemon-types pokemon-types-${type.type.name}`} key={type.type.name}>{capitalizeFirst(type.type.name)}</div>
            ))}
            <h3>{capitalizeFirst(p.name)}</h3>
            <div className='pokemon-stats'>
                {showDescription && 
                    <div>
                        <div>
                            <div className='text-bold'>Height:</div>
                            <div className='text-normal'>{p.height}</div>
                            <div className='text-bold'>Weight:</div>
                            <div className='text-normal'>{p.weight}</div>
                        </div>
                        <div>
                            <div className='text-bold'>HP:</div>
                            <div className='text-normal'>{p.stats[0].base_stat}</div>
                        </div>
                        <div>
                            <div className='text-bold'>Attack:</div>
                            <div className='text-normal'>{p.stats[1].base_stat}</div>
                        </div>
                        <div>
                            <div className='text-bold'>Defense:</div>
                            <div className='text-normal'>{p.stats[2].base_stat}</div>
                        </div>
                        <div>
                            <div className='text-bold'>Special Attack:</div>
                            <div className='text-normal'>{p.stats[3].base_stat}</div>
                        </div>
                        <div>
                            <div className='text-bold'>Special Defense:</div>
                            <div className='text-normal'>{p.stats[4].base_stat}</div>
                        </div>
                        <div>
                            <div className='text-bold'>Speed:</div>
                            <div className='text-normal'>{p.stats[5].base_stat}</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
