import { useContext } from "react"
import { ShowLeaderboardContext } from '../context/ShowLeaderboardContext';

function WinScreen({toggle}){

    const {setShowLeaderboard} = useContext(ShowLeaderboardContext)
    
    function nameAdd(){
        toggle(false)
        setShowLeaderboard(true)
    }

    return(
        <div className="modal-container">
            <div className="modal">
                win screen
                <button onClick={nameAdd}>click</button>
            </div>
        </div>
    )
}

export default WinScreen