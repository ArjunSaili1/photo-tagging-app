function FoundMessage({character}){

    return(
    <div className={"found-msg-container"}>
        {character === "unset" ? null :
        character ? <h2 className="found-msg">You found {character}!</h2> : 
        <h3 className="found-msg">Nothing Here... Keep Looking!</h3>}
    </div>
    )
}

export default FoundMessage