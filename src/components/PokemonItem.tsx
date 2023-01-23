import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom"

interface PokemonItemProps {
	key: number,
	id: number,
	name: string,
	img: string
}

export const PokemonItem: React.FC<PokemonItemProps> = ({ id, name, img }) => {
	const navigate = useNavigate();

	const navigateDetail = useCallback(() => {
		navigate(`pokemon/${id}`);
	}, [id])

	return (
		<div className="py-1 px-4 my-2 w-full rounded-xl shadow-xl flex items-center justify-between gap-1
			border odd:border-green-800 odd:bg-green-300 odd:text-green-800 even:border-blue-800 even:bg-blue-300 even:text-blue-800
			hover:cursor-pointer hover:scale-110 ease-in duration-200
			hover:border-red-800 hover:bg-red-300 hover:text-red-800"
			onClick={navigateDetail}>

			<span className="font-bold text-md md:text-xl">
				#{id}
			</span>            
			<h4 className="flex-1 font-bold text-center capitalize truncate text-lg md:text-2xl">
				{name}
			</h4>
			<img src={img} alt={`img_pokemon_${id}`}/>

		</div>
	)
}