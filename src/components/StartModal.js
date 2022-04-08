import { useState } from 'react';
import { serverTimestamp, addDoc, collection } from '@firebase/firestore';
import db from '../firebase'
import neoImg from '../assets/characterImages/neo.png';
import jabbaImg from '../assets/characterImages/jabba.png';
import bowserImg from '../assets/characterImages/bowser.png'
import benderImg from '../assets/characterImages/bender.png'
import kratosImg from '../assets/characterImages/kratos.png'
import yubabaImg from '../assets/characterImages/yubaba.png'
import batmanImg from '../assets/characterImages/batman.png'
import theKnightImg from '../assets/characterImages/theknight.png';
import aangImg from '../assets/characterImages/aang.png'

function StartModal({setUnfoundCharacters, setUserDoc}){

    const [difficultyCharacters, setDifficultyCharacters] = useState(null);
    const [showStart, setShowStart] = useState(true)

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
                <>  
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
                    <button onClick={startGame} className="start-btn">Start</button>
                </>
            )
        }
        else{
            return(
            <>
                <h2>Choose a Difficulty</h2>
                <div className="dif-opitions">
                    <button onClick={createCharacterDisplay}>Easy</button>
                    <button onClick={createCharacterDisplay}>Medium</button>
                    <button onClick={createCharacterDisplay}>Hard</button>
                </div>
            </>)
        }
    }

    return(showStart ? 
    <div className="start-modal-container">
        <div className="start-modal">
            {renderStart()}
        </div>
    </div> : null)
}

export default StartModal