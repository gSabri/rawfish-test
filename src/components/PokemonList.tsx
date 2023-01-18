import React, {useState, useEffect, useMemo, useRef, useCallback} from "react"
import axios  from "axios"
import {Pokemon} from "../entities/Pokemon"
import {PokemonItem} from "./PokemonItem"

interface RequestData {
    name: string
    url: string
}

export const PokemonList: React.FC = () => {
    const pageItems = 10
    const lastItemRef = useRef<HTMLDivElement>(null)
    const [list, setList] = useState<Array<Pokemon>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [next, setNext] = useState<string>()
    const [lastCursor, setLastCursor] = useState<number>(0)

    const fetchData = useCallback(async () => {   
        try {
            setLoading(true)
            const {data: response} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageItems}&offset=${lastCursor}`)
            setNext(response.next)
            const pokemonList : Array<RequestData> = response.results
            const completeList : Array<Pokemon> = []
            for (const item of pokemonList) {
                const completePokemon : Pokemon = await fetchPokemonData(item.url)
                completeList.push(completePokemon)
            }
            setLastCursor(completeList[completeList.length-1]?.id || 0)        
            setList(list => [...list, ...completeList] )
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }  
    }, [lastCursor])

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
        fetchData()
    }, []);

    const pokemonItems = useMemo (() => {
        return (
            list &&
            list.map((p : Pokemon, index) => <PokemonItem key={index} pokemon={p}/>) 
        )
    }, [list])

    const intersectionCallback = useCallback((entries: any) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loading && next) {
            fetchData();
        }
    }, [loading, list, next])

    useEffect(() => {
		const observer = new IntersectionObserver(intersectionCallback, 
			{
				root: null,
				threshold:1
			}
		);
		const lastItem = lastItemRef.current;
		if (lastItem) {
			observer.observe(lastItem);
		}

		return () => {
			if (lastItem) {
				observer.unobserve(lastItem);
			}
		}
	}, [lastItemRef, lastCursor]);

    return (
        <div className="max-w-[75%] md:max-w-[50%] mx-auto">
            { pokemonItems }
            { next && (
                <div role="status" className="w-full animate-pulse mb-4" ref={lastItemRef}>
                    <div className="w-full bg-gray-300 rounded-xl p-6 border border-gray-400"> Loading... </div>              
                </div>)
            }
        </div>
    )

}