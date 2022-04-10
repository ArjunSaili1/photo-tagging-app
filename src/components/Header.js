import { useContext } from "react"
import { CharactersContext } from "../context/CharactersContext"
function Header(){

    const {unfoundCharacters} = useContext(CharactersContext);

    return(
        <header>
            <h1>Find Em'</h1>
            <div className="character-count-container">
                <h4>Characters Remaining: </h4>
                <div className="character-count">
                    <h3>{unfoundCharacters ? unfoundCharacters.length : null}</h3>
                </div>
            </div>
        </header>
    )
}

export default Header