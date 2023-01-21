import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { PokemonDetail } from "../components/PokemonDetail"
import { Pokemon } from "../entities/Pokemon"
import type { RootState } from '../store'
import { useSelector } from 'react-redux'
import axios from "axios"

export const PokemonPage = (): JSX.Element => {
	const { id } = useParams<{id: string}>()
	const listState = useSelector((state: RootState) => state.list)
	const list = listState.data
	const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | undefined>()
	
	//or reload in case of page refresh
	const reloadPokemon = async () => {
		try {			
			const { data: response } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
			setSelectedPokemon(response)
		} catch (error) {
			console.error(error);
			throw (error)
		}
	}

	useEffect(() => {
		const selected : Pokemon | undefined = list.find((p: Pokemon) => p.id === Number(id))
			if (selected) {
				setSelectedPokemon(selected)
			} else {
				reloadPokemon()
			}
	}, []);	

	return (
		<>
			<Header showBack={true}/>
				<div className="pt-28 pb-8">
					{ selectedPokemon &&
						<PokemonDetail pokemon={selectedPokemon}/>
					}
				</div>
		</>
	)
}