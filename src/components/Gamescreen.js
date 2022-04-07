import { useState, useRef } from 'react';
import backgroundImage from '../assets/background.jpg';
import Dropdown from './Dropdown';
import db from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import FoundMessage from './FoundMessage';

function Gamescreen(){

    const [coordinates, setCoordinates] = useState(null);
    const [unfoundCharacters, setUnfoundCharacters] = useState(["Neo", "Jabba The Hut", "Kratos"]);
    const [found, setFound] = useState('unset');
    const locationsColRef = collection(db, "locations");
    const cursorOutlineRef = useRef(null);

    const dropdownStyles = coordinates ? {
        top: coordinates[1] + 15,
        left: coordinates[0] + 15
    } : null;

    function createCurorOutline(e){
        coordinates ? setCoordinates(null) : setCoordinates([e.pageX, e.pageY]);
    }

    function targetBoxIntersect(left, right, top, bottom){
        const { left: cursorLeft, 
                right: cursorRight, 
                top: viewportCursorTop, 
                bottom: viewportCursorBottom} = cursorOutlineRef.current.getBoundingClientRect();

        const cursorTop = viewportCursorTop - document.body.getBoundingClientRect().top;
        const cursorBottom = viewportCursorBottom - document.body.getBoundingClientRect().bottom;

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
                setUnfoundCharacters(unfoundCharacters.filter(unFound => unFound !== character.data().name));
                setFound(character.data().name);
            }
            else{
                setFound(null)
            }
        })
        setCoordinates(null);
    }

    function renderTarget(){
        return (coordinates ? 
        <div className="coordinate-select">
            <div ref={cursorOutlineRef} className="cursor-outline" style={{top: coordinates[1], left: coordinates[0]}}></div>
            <Dropdown selectCharacter={selectCharacter} characters={unfoundCharacters} style={dropdownStyles}/>
        </div> : null)
    }

    return(<div className='gamescreen' onClick={createCurorOutline}>
        {renderTarget()}
        <FoundMessage character={found}/>
        <img alt="background" className="background-img" src={backgroundImage}/>
    </div>)
}

export default Gamescreen;