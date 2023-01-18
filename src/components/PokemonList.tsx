import React, {useState, useEffect, useMemo} from "react"
import axios  from "axios"
import {Pokemon} from "../entities/Pokemon"
import {PokemonItem} from "./PokemonItem"

interface RequestData {
    name: string
    url: string
}

export const PokemonList: React.FC = () => {
    const pageItems = 10
    const [list, setList] = useState<Array<Pokemon>>([])
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = async (limit : number, offset: number) => {
        setLoading(true);
        try {
            const {data: response} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            const pokemonList : Array<RequestData> = response.results
            const completeList : Array<Pokemon> = []
            for (const item of pokemonList) {
                const completePokemon : Pokemon = await fetchPokemonData(item.url)
                completeList.push(completePokemon)
            }
            
            setList(list => [...completeList] )
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    const fetchPokemonData = async (url: string) : Promise<Pokemon> => {
        try {
            const {data: response} = await axios.get(url)
            return response
        } catch (error) {
            console.error(error);
            throw (error)
        }        
    }

    useEffect(() => { 
        fetchData(pageItems, 0);
    }, []);

    const pokemonItems = useMemo (() => {
        return (
            list &&
            list.map((p : Pokemon, index) => <PokemonItem key={index} pokemon={p}/>) 
        )
    }, [list])

    return (
        <div className="max-w-[75%] md:max-w-[50%] mx-auto">
            {pokemonItems}
        </div>
    )

}