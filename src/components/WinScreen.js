import { updateDoc } from "@firebase/firestore";
import { useContext } from "react"
import { UserContext } from "../context/UserContext";
import { ShowLeaderboardContext } from '../context/ShowLeaderboardContext';

function WinScreen({setShowWinScreen}){

    const {setShowLeaderboard} = useContext(ShowLeaderboardContext)
    const {userDoc} = useContext(UserContext);
    
    async function nameAdd(e){
        e.preventDefault();
        await updateDoc(userDoc, {
            name: e.target[0].value
        });
        setShowWinScreen(false)
        setShowLeaderboard(true)
    }

    return(
        <div className="modal-container">
            <div className="modal">
                <div className="win-modal">
                    <h1>You found all the characters!</h1>
                    <h3>Enter your name to add your score to the leaderboard</h3>
                    <form onSubmit={nameAdd}>
                        <input className="name-field" type="text"></input>
                        <button className="submit-name" type="submit">Join The Cool Kids</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default WinScreen