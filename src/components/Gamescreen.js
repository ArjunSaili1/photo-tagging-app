import { useState, useRef, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { getTime } from '../utils/getTime';
import { CharactersContext } from '../context/CharactersContext';
import backgroundImage from '../assets/background.jpg';
import Dropdown from './Dropdown';
import db from '../utils/firebase'
import { collection, query, where, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import FoundMessage from './FoundMessage';

function Gamescreen({setShowWinScreen}){

    const {setUnfoundCharacters, unfoundCharacters} = useContext(CharactersContext);
    const {userDoc} = useContext(UserContext);
    const [coordinates, setCoordinates] = useState(null);
    const [found, setFound] = useState('unset');
    const locationsColRef = collection(db, "locations");
    const cursorOutlineRef = useRef(null);

    const dropdownStyles = coordinates ? {
        top: coordinates[1] + 15,
        left: coordinates[0] + 15
    } : null;

    useEffect(()=>{
        if(unfoundCharacters){
            setUnfoundCharacters(unfoundCharacters.filter(unFound => {
                return unFound.name !== found
            }));
        }
    },[found])

    useEffect(()=>{
        if(unfoundCharacters !== null && unfoundCharacters.length === 0){
            async function finishGame(){
                await updateDoc(userDoc, {
                    endTime: serverTimestamp()
                });
                const time = await getTime(userDoc)
                await updateDoc(userDoc, {
                    time: time
                })
            }
            finishGame().then(()=>{
                setShowWinScreen(true)
            });
        }
    }, [unfoundCharacters, userDoc, setShowWinScreen])



    function createCursorOutline(e){
        coordinates ? setCoordinates(null) : setCoordinates([e.pageX, e.pageY]);
    }

    function targetBoxIntersect(left, right, top, bottom){
        const { left: viewPortCursorLeft, 
                right: viewPortCursorRight, 
                top: viewportCursorTop, 
                bottom: viewportCursorBottom } = cursorOutlineRef.current.getBoundingClientRect();

        const cursorTop = viewportCursorTop - document.body.getBoundingClientRect().top;
        const cursorBottom = viewportCursorBottom - document.body.getBoundingClientRect().bottom;
        const cursorLeft = viewPortCursorLeft + window.scrollX;
        const cursorRight = viewPortCursorRight + window.scrollX;

        function checkX(cursorLeft, cursorRight){
            return (cursorLeft > left && cursorLeft < right) || 
            (cursorRight > left && cursorRight < right);
        }

        function checkY(cursorTop, cursorBottom){
            return (cursorTop > top && cursorTop < bottom) || 
            (cursorBottom > top && cursorBottom < bottom);
        }

        return checkX(cursorLeft, cursorRight) && checkY(cursorTop, cursorBottom);
    }

    async function selectCharacter(e){
        e.stopPropagation();
        const characterQuery = query(locationsColRef, where("name", "==" , e.target.textContent));
        const characterQuerySnapshot = await getDocs(characterQuery);
        characterQuerySnapshot.forEach((character)=>{
            const {left, right, top, bottom} = character.data();
            if(targetBoxIntersect(left, right, top, bottom)){
                setFound(character.data().name);
            }
            else{
                setFound(null)
            }
        })
        setCoordinates(0);
    }

    function renderTarget(){
        return (coordinates ? 
        <div className="coordinate-select">
            <div ref={cursorOutlineRef} className="cursor-outline" 
            style={{top: coordinates[1], left: coordinates[0]}}></div>
            <Dropdown selectCharacter={selectCharacter} style={dropdownStyles}/>
        </div> : null)
    }

    return(<div className='gamescreen' onClick={createCursorOutline} 
    style={!unfoundCharacters || (unfoundCharacters.length === 0 && found) ? 
        {position: "fixed"} : {position: "relative"}}>
        {renderTarget()}
        {coordinates === 0 ? <FoundMessage character={found}/> : null}
        <img alt="background" className="background-img" src={backgroundImage}/>
    </div>)
}

export default Gamescreen;