import React from "react"
import { useParams } from "react-router-dom"
import { Header } from "../components/Header"
import { PokemonDetail } from "../components/PokemonDetail"
import { Pokemon } from "../entities/Pokemon"
import type { RootState } from '../store'
import { useSelector } from 'react-redux'

export const PokemonPage = (): JSX.Element => {

	const { id } = useParams<{id: string}>()
	const listState = useSelector((state: RootState) => state.list)
	const list = listState.data

	// retrieve selected pokemon from store
	const selectedPokemon = list.find((p: Pokemon) => p.id === Number(id))

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