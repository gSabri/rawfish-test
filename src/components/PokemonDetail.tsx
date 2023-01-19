import React from "react"
import { Move, Pokemon, Ability } from "../entities/Pokemon"

interface PokemonDetailProps {
    pokemon: Pokemon
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {

    const propDivClass = "flex items-center"
    const labelClass = "text-left font-bold text-red-600 mr-2"

    const moves : string = pokemon.moves.map((m: Move) : string => m.move.name).join(', ')
    const abilities : string = pokemon.abilities.map((a: Ability) : string => a.ability.name).join(', ')

    return (
        <div className="max-w-[95%] md:max-w-[75%] lg:max-w-[60%] mx-auto rounded-xl border-2 border-red-600 shadow-lg shadow-red-600 p-4 pt-0 flex flex-col">

            <div className="w-full flex items-center justify-between flex-wrap font-bold text-red-600 capitalize text-xl md:text-3xl border-b border-red-600">
                <img src={pokemon.sprites.front_default} />
                <h2> {pokemon.name} </h2>
                <span className="w-[6rem]"> #{pokemon.id} </span>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                <div className={propDivClass}>
                    <label className={labelClass}>Order:</label>
                    <span>{pokemon.order}</span>
                </div>
                <div className={propDivClass}>
                    <label className={labelClass}>Base experience:</label>
                    <span>{pokemon.base_experience}</span>
                </div>
                <div className={propDivClass}>
                    <label className={labelClass}>Height:</label>
                    <span>{pokemon.height} dm</span>
                </div>
                <div className={propDivClass}>
                    <label className={labelClass}>Weight:</label>
                    <span>{pokemon.weight} hg</span>
                </div>
                <div className={`md:col-span-2 ${propDivClass}`} >
                    <label className={labelClass}>Abilities:</label>
                    <span>{abilities}</span>
                </div>
                <div className={`md:col-span-2 !items-start ${propDivClass}`}>
                    <label className={labelClass}>Moves:</label>
                    <span>{moves}</span>
                </div>
            </div>
        </div>
    )
}