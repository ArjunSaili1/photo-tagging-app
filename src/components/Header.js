import { useContext } from "react"
import { CharactersContext } from "../context/CharactersContext"
function Header(){

    const {unfoundCharacters} = useContext(CharactersContext);

    return(
        <header>
            <h1>Find Em'</h1>
            <div className="character-count">
                <h2>{unfoundCharacters ? unfoundCharacters.length : null}</h2>
            </div>
        </header>
    )
}

export default Header