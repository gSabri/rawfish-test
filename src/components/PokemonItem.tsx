import React from "react"
import { Pokemon } from "../entities/Pokemon"

interface PokemonItemProps {
    key: number
    pokemon: Pokemon
}

export const PokemonItem: React.FC<PokemonItemProps> = ({pokemon}) => {
    return (
        <div className="p-4 my-2 w-full rounded-md shadow-lg font-bold text-center capitalize border odd:border-red-800 odd:bg-red-300 odd:text-red-800 even:border-blue-800 even:bg-blue-300 even:text-blue-800">
            {pokemon.name}
        </div>
    )
}