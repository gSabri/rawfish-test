import React from "react"
import { Pokemon } from "../entities/Pokemon"

interface PokemonItemProps {
    key: number
    pokemon: Pokemon
}

export const PokemonItem: React.FC<PokemonItemProps> = ({pokemon}) => {
    return (
        <div className="p-4 my-2 w-full rounded-xl shadow-xl font-bold text-center capitalize truncate 
            border odd:border-green-800 odd:bg-green-300 odd:text-green-800 even:border-blue-800 even:bg-blue-300 even:text-blue-800
            hover:cursor-pointer hover:scale-110 ease-in duration-200
            hover:border-red-800 hover:bg-red-300 hover:text-red-800">
            {pokemon.name}
        </div>
    )
}