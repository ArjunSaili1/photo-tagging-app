function FoundMessage({character}){

    return(
    <div className={"found-msg-container"}>
        {character === "unset" ? null :
        character ? <h2 className="found-msg">You found {character}!</h2> : 
        <h2 className="found-msg">Keep Looking!</h2>}
    </div>
    )
}

export default FoundMessage