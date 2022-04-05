function Dropdown({selectCharacter, characters, style}){
    return(
        <div className="dropdown-menu" style={style}>
            {characters.map((character)=>{
                return <button key={character} onClick={selectCharacter} className="character-option">{character}</button>
            })}
        </div>
    )
}

export default Dropdown