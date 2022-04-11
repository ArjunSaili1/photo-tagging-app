import { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CharactersContext } from '../context/CharactersContext';
import { UserContext } from '../context/UserContext';
import { ShowLeaderboardContext } from '../context/ShowLeaderboardContext';
import { serverTimestamp, addDoc, collection } from '@firebase/firestore';
import db from '../utils/firebase'
import neoImg from '../assets/characterImages/neo.png';
import jabbaImg from '../assets/characterImages/jabba.png';
import bowserImg from '../assets/characterImages/bowser.png'
import benderImg from '../assets/characterImages/bender.png'
import kratosImg from '../assets/characterImages/kratos.png'
import yubabaImg from '../assets/characterImages/yubaba.png'
import batmanImg from '../assets/characterImages/batman.png'
import theKnightImg from '../assets/characterImages/theknight.png';
import aangImg from '../assets/characterImages/aang.png'

function StartModal(){

    const [difficultyCharacters, setDifficultyCharacters] = useState(null);
    const {setShowLeaderboard} = useContext(ShowLeaderboardContext)
    const {setUserDoc} = useContext(UserContext)
    const {setUnfoundCharacters} =  useContext(CharactersContext);
    const [showStart, setShowStart] = useState(true)


    useEffect(()=>{
        setShowLeaderboard(false)
    }, [setShowLeaderboard])

    const easyCharacters = [
        {name: "Neo", img: neoImg},
        {name: "Jabba The Hutt", img:jabbaImg},
        {name: "Bowser", img: bowserImg}
    ]

    const mediumCharacters = [
        {name: "Bender", img: benderImg},
        {name: "Kratos", img: kratosImg},
        {name: "Yubaba", img: yubabaImg},
    ]

    const hardCharacters = [
        {name: "Batman", img: batmanImg},
        {name: "The Knight", img: theKnightImg},
        {name: "Aang", img: aangImg}
    ]

    function createCharacterDisplay(e){
        if(e.target.textContent === "Easy"){
            setDifficultyCharacters(easyCharacters)
        }
        else if(e.target.textContent === "Medium"){
            setDifficultyCharacters(mediumCharacters)
        }
        else{
            setDifficultyCharacters(hardCharacters)
        }
    }

    async function startGame(){
        setUnfoundCharacters(difficultyCharacters);
        setShowStart(false)
        const userDocRef = await addDoc(collection(db, "users"),{
            startTime: serverTimestamp()
        });
        setUserDoc(userDocRef);
    }

    function renderStart(){
        if(difficultyCharacters){
            return(
                <motion.div initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}>  
                    <h2>Find These Characters!</h2>
                    <div className="character-container">
                        {difficultyCharacters.map(({name, img}) => {
                            return(
                                <div key={name} className="character">
                                    <img className="character-img" alt={name} src={img}></img>
                                    <h3>{name}</h3>
                                </div>
                            )}
                        )}
                    </div>
                    <div className="start-modal-btn-ctn">
                        <motion.button
                         whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                         onClick={()=>{setShowLeaderboard(true); setShowStart(false)}}>Leaderboard</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={startGame} className="start-btn">Start</motion.button>
                    </div>
                </motion.div>
            )
        }
        else{
            return(
            <div>
                <h2>Choose a Difficulty</h2>
                <div className="dif-opitions">
                    <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }} 
                    style={{backgroundColor:"#90EE90"}}
                    onClick={createCharacterDisplay}>Easy</motion.button>
                    <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}  
                    style={{backgroundColor: "#feb05a"}}
                    onClick={createCharacterDisplay}>Medium</motion.button>
                    <motion.button 
                    whileHover={{ scale: 1.05 }} 
                    whileTap={{ scale: 0.95 }}  
                    style={{backgroundColor: "#ff6e40"}}
                    onClick={createCharacterDisplay}>Hard</motion.button>
                </div>
            </div>)
        }
    }

    return(
    <AnimatePresence>
        {showStart ?
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} 
            className="modal-container">
                <div className="modal">
                    {renderStart()}
                </div>
            </motion.div>
        : null}
    </AnimatePresence>)
}

export default StartModal