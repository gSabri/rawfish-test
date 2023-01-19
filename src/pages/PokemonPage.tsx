import React, {useEffect, useState} from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { PokemonDetail } from "../components/PokemonDetail"
import { Pokemon } from "../entities/Pokemon"

export const PokemonPage = (): JSX.Element => {

    // retrieve selected pokemon from store

    const { id } = useParams<{id: string}>()
    const [pokemon, setPokemon] = useState<Pokemon>()

    useEffect(() => {
        const fetchPokemon = async () => {   
            try {
                const {data: response} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)              
                setPokemon(response)         
            } catch (error) {
                console.error(error);
            }
        }

        fetchPokemon()
    }, [id])


    return (
        <>
            <Header showBack={true}/>
            <div className="pt-28 pb-8">
                { pokemon &&
                    <PokemonDetail pokemon={pokemon}/>
                }
            </div>
        </>
    )
}