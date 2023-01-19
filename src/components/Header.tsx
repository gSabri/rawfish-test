import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    showBack: boolean
}

export const Header: React.FC<HeaderProps> = ({showBack}) => {

    const navigate = useNavigate();

    const navigateHome = useCallback(() => {
        navigate('/');
    }, [])

    return (
        <header className="w-full p-4 fixed z-10 shadow-lg border-b bg-white shadow-yellow-500 flex items-center">
            { showBack && 
                <button className="absolute inset-y-4 font-semibold text-sm text-blue-800 hover:text-yellow-500" type="button" onClick={navigateHome}>
                    Home
                </button>
            }
            <span className="mx-auto text-center font-bold text-4xl text-yellow-500">POKÈMON</span>                
        </header>
    )
}