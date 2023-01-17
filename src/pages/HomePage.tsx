import React from "react";
import { Header } from "../components/Header";
import { PokemonList } from "../components/PokemonList";

export const HomePage = (): JSX.Element => {

    return (
        <>
            <Header/>
            <div className="pt-24">
                <PokemonList/>
            </div>
        </>
    )
}