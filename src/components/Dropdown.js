function Dropdown({selectCharacter, characters, style}){
    return(
        <div className="dropdown-menu" style={style}>
            {characters.map(({name, img})=>{
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