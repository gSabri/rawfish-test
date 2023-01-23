import React, { useState, useEffect, useMemo, useRef, useCallback } from "react"
import axios from "axios"
import type { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { addManyElements, setNext, setLastCursor } from '../features/list/listSlice'
import { Pokemon } from "../entities/Pokemon"
import { PokemonItem } from "./PokemonItem"

interface RequestData {
  name: string
  url: string
}

export const PokemonList: React.FC = () => {
  const pageItems = 10 // fixed number of elements for each request
  const loadingRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // read data from redux store: list, next values, last cursor
  const listState = useSelector((state: RootState) => state.list)
  const list = listState.data
  const next = listState.next
  const lastCursor = listState.lastCursor
  const dispatch = useDispatch()

  // data loading at first (re)rendering
  useEffect(() => {
    setLoading(true)
    fetchData(false)
  }, [])

  // callback to fetch data, at first loading/refresh or from intersectionObserver for infinire scroll
  const fetchData = useCallback(async (intersectionCall : boolean) => {
    try {
      // if not from infinite scroll and some data are aready loaded, stop
      if (!intersectionCall && list.length) {
        return
      }

      // else load next data and save in store
      const {data: response} = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageItems}&offset=${lastCursor}`)
      const pokemonList : Array<RequestData> = response.results
      
      // fetch complete data for new pokemons
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

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }, [lastCursor, next])

  // fetch complete data for a single pokemon
  const fetchPokemonData = async (url: string) : Promise<Pokemon> => {
    try {
      const {data: response} = await axios.get(url)
      return response
    } catch (error) {
      console.error(error);
      throw (error)
    }
  }

  // loading item of infinite scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback,
      {
        root: null,
        threshold: 0.75
      }
    )

    const loadingItem = loadingRef.current;
    if (loadingItem) {
      observer.observe(loadingItem);
    }

    return () => {
      if (loadingItem) {
        observer.unobserve(loadingItem);
      }
    }
	}, [loadingRef, lastCursor, loading])

  const intersectionCallback = useCallback((entries: Array<IntersectionObserverEntry>) => {
    const [entry] = entries
    if (entry.isIntersecting && !loading && next) {
      setLoading(true)
      fetchData(true)
    }
  }, [loading, list, next])

  // rendered list items
  // TODO could I easily process only new loaded pokemons?
  const pokemonItems = useMemo (() => {
    return (
      list &&
      list.map((p: Pokemon, index) => <PokemonItem key={index} id={p.id} name={p.name} img={p.sprites.front_default}/>)
    )
  }, [list])

  return (
    <div className="max-w-[75%] md:max-w-[50%] mx-auto">
      { pokemonItems }
      { next && (
        <div className="w-full animate-pulse" ref={loadingRef}>
          <div className="w-full rounded-xl p-6 bg-gray-300 border border-gray-400"> Loading... </div>
        </div> )
      }
    </div>
  )
}