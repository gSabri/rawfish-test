import React,  {useState, useEffect, useMemo, useRef, useCallback } from "react"
import axios  from "axios"
import { Pokemon} from "../entities/Pokemon"
import { PokemonItem } from "./PokemonItem"
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { addManyElements, setNext, setLastCursor } from '../features/list/listSlice'
//import { addElement } from '../features/list/listSlice'

interface RequestData {
  name: string
  url: string
}

export const PokemonList: React.FC = () => {
  const pageItems = 10
  const lastItemRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const listState = useSelector((state: RootState) => state.list)
  const list = listState.data
  const next = listState.next
  const lastCursor = listState.lastCursor
  //const [next, setNext] = useState<string>()
  //const [lastCursor, setLastCursor] = useState<number>(0)
  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {   
    try {
      setLoading(true)

      // if list in store contains lastcursor+1, data already loaded
      if (list.find((el : Pokemon) => el.id === lastCursor+1)) {
        setLoading(false)
        return
      }
      // else load data and save in store
      const {data: response} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageItems}&offset=${lastCursor}`)

      const pokemonList : Array<RequestData> = response.results
      const newPokemons : Array<Pokemon> = []
      let lastId = 0
      for (const item of pokemonList) {
        const completePokemon : Pokemon = await fetchPokemonData(item.url)
        newPokemons.push(completePokemon)        
        lastId = completePokemon.id
      }
      dispatch(addManyElements(newPokemons))
      dispatch(setNext(response.next))
      dispatch(setLastCursor(lastId || 0))
      //setNext(response.next)
      //setLastCursor(lastId || 0)
    
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }  
  }, [lastCursor, next])

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
      list.map((p : Pokemon, index) => <PokemonItem key={index} id={p.id} name={p.name} img={p.sprites.front_default}/>) 
    )
  }, [list])

  const intersectionCallback = useCallback((entries: Array<IntersectionObserverEntry>) => {
    const [entry] = entries;
    console.log(!loading && next)
    if (entry.isIntersecting && next) {
      fetchData();
    }
  }, [loading, list, next])

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, 
      {
        root: null,
        threshold: 0.75
      }
    )

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
        <div role="status" className="w-full animate-pulse" ref={lastItemRef}>
          <div className="w-full bg-gray-300 rounded-xl p-6 border border-gray-400"> Loading... </div>              
        </div>)
      }
    </div>
  )
}