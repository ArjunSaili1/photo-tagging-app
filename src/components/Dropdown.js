import { useContext } from "react"
import { CharactersContext } from "../context/CharactersContext"
import { motion } from 'framer-motion';
function Dropdown({selectCharacter, style}){
    const {unfoundCharacters} = useContext(CharactersContext);
    return(
        <motion.div 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="dropdown-menu" 
        style={style}>
            {unfoundCharacters.map(({name, img})=>{
                return(
                    <motion.button 
                    whileHover={{ scale: 1.01,
                    backgroundColor: "#90EE90" }} 
                    whileTap={{ scale: 0.99 }}
                    key={name} 
                    onClick={selectCharacter} 
                    className="character-option">
                        {name}
                        <img className="dropdown-img" alt={name} src={img}></img>
                    </motion.button>
                )
            })}
        </motion.div>
    ) 
}

export default Dropdown