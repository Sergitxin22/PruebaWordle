import { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Header() {
    // Obtener language y setLanguage del contexto
    const { language, setLanguage } = useContext(AppContext);

    // Efecto para cargar el idioma desde localStorage al inicio
    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
    }, [setLanguage]);

    // Función para manejar el cambio de idioma
    const handleChangeLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage); // Actualiza el estado del idioma en el contexto
        localStorage.setItem('language', selectedLanguage); // Almacena el idioma en localStorage
    };

    return (
        <header className="flex flex-row max-w-lg py-2 px-3 border-b dark:border-neutral-700">
            <button className="m-0 sm:my-2 flex-none" aria-label="cómo jugar">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-6 w-6 text-neutral-500 dark:text-neutral-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                    </path>
                </svg>
            </button>
            <div className="flex-auto text-center">
                <h1 className="uppercase font-extrabold text-2xl sm:text-3xl tracking-wider">Wordle (ES)</h1>
            </div>
            <button className="mx-3 text-xl" aria-label="estadísticas de juego">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-6 w-6 text-neutral-500 dark:text-neutral-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                    </path>
                </svg>
            </button>
            <button className="m-0 sm:my-2 flex-none" aria-label="opciones de juego">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-6 w-6 text-neutral-500 dark:text-neutral-600">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                    </path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                    </path>
                </svg>
            </button>


            {/* // En el JSX de tu componente: */}
            <select onChange={(e) => handleChangeLanguage(e.target.value)} value={language} className="text-black dark:text-white dark:bg-[#121212]">
                {/* <select> */}
                <option value="es" className="text-black dark:text-white">Español</option>
                <option value="en" className="text-black dark:text-white">English</option>
                <option value="eu" className="text-black dark:text-white">Euskara</option>
            </select>
        </header>
    )
}

export default Header