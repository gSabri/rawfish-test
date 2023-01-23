import React from "react"
import { Header } from "../components/Header"
import { PokemonList } from "../components/PokemonList"

export const HomePage = (): JSX.Element => {

  return (
    <>
			<Header showBack={false} />
			<div className="pt-24 pb-8">
				<PokemonList/>
			</div>
    </>
  )
}