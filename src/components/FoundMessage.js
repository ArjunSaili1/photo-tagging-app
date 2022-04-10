function FoundMessage({character}){

    return(
    <div className={"found-msg-container"}>
        {character === "unset" ? null :
        character ? <h3 className="found-msg">You found {character}!</h3> : 
        <h2 className="found-msg">Nothing Here... Keep Looking!</h2>}
    </div>
    )
}

export default FoundMessage