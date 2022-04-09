import { useContext } from "react"
import { CharactersContext } from "../context/CharactersContext"
function Dropdown({selectCharacter, style}){
    const {unfoundCharacters} = useContext(CharactersContext);
    return(
        <div className="dropdown-menu" style={style}>
            {unfoundCharacters.map(({name, img})=>{
                return(
                    <button key={name} onClick={selectCharacter} className="character-option">
                        {name}
                        <img className="dropdown-img" alt={name} src={img}></img>
                    </button>
                )
            })}
        </div>
    )
}

export default Dropdown