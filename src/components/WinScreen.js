import { updateDoc, getDoc } from "@firebase/firestore";
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext";
import { ShowLeaderboardContext } from '../context/ShowLeaderboardContext';
import { AnimatePresence, motion } from "framer-motion";

function WinScreen({setShowWinScreen}){

    const {setShowLeaderboard} = useContext(ShowLeaderboardContext)
    const {userDoc} = useContext(UserContext);
    const [score, setScore] = useState(0);

    
    async function nameAdd(e){
        e.preventDefault();
        const username = e.target[0].value
        await updateDoc(userDoc, {
            name: username !== "" ? username : "Anonymous Player"
        });
        setShowWinScreen(false)
        setShowLeaderboard(true)
    }
    
    useEffect(()=>{
        async function getScore(){
            const snap = await getDoc(userDoc)
            setScore(snap.data()["time"])
        }
        getScore();
    }, [userDoc])

    return(
        <AnimatePresence>
            <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-container">
                <div className="modal">
                    <div className="win-modal">
                        <h1>You found all the characters!</h1>
                        <h2>You took: {score}</h2>
                        <h3>Enter your name to add your score to the leaderboard</h3>
                        <form onSubmit={nameAdd}>
                            <motion.input 
                            whileFocus={{scale: 1.09}}
                            className="name-field" type="text"></motion.input>
                            <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                            className="submit-name" 
                            type="submit">Join The Cool Kids</motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default WinScreen