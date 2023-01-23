import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom"
interface HeaderProps {
  showBack: boolean
}

export const Header: React.FC<HeaderProps> = ({ showBack }) => {

	const navigate = useNavigate();

	const navigateHome = useCallback(() => {
		navigate('/');
	}, [showBack])

	return (
		<header className="w-full p-4 fixed z-10 shadow-lg border-b bg-white shadow-yellow-500 flex items-center">
			{ showBack && (
				<button type="button" onClick={navigateHome}
					className="absolute inset-y-4 font-semibold text-sm text-red-600 hover:text-yellow-500 flex items-center">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
					</svg>
					<span className="hidden md:inline-block ml-1">
						Home
					</span>
				</button> )
			}
			<h1 className="mx-auto text-center font-bold text-4xl text-yellow-500">
				POKÈMON
			</h1>              
		</header>
	)
}