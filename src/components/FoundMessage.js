import { motion } from "framer-motion"
import uniqid from 'uniqid'
function FoundMessage({character}){

    return(
    <div className={"found-msg-container"}>
        {character === "unset" ? null :
        character ? 
            <motion.h2             
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1.09  }}
            exit={{ opacity: 0 }}  
            className="found-msg">You found {character}!</motion.h2> : 
        <motion.h2
        key={uniqid()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: 1.09 }}
        exit={{ opacity: 0 }}     
        className="found-msg">Nothing Here... Keep Looking!</motion.h2>}
    </div>
    )
}

export default FoundMessage