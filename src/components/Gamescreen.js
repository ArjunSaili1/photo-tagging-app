import { useState, useRef } from 'react';
import backgroundImage from '../assets/background.jpg';
import Dropdown from './Dropdown';
import db from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

function Gamescreen(props){

    const [coordinates, setCoordinates] = useState(null);
    const [unfoundCharacters, setUnfoundCharacters] = useState(["Neo", "Patrick Star", "Kratos"])
    const locationsColRef = collection(db, "locations")
    const cursorOutlineRef = useRef(null);

    const dropdownStyles = coordinates ? {
        top: coordinates[1] + 15,
        left: coordinates[0] + 15
    } : null;

    function createCurorOutline(e){
        if(coordinates)(setCoordinates(null))
        else{setCoordinates([e.pageX, e.pageY])}
    }

    async function selectCharacter(e){
        e.stopPropagation();
        const {top, bottom, left: minX , right: maxX} = cursorOutlineRef.current.getBoundingClientRect();
        const minY = top - document.body.getBoundingClientRect().top;
        const maxY = bottom - document.body.getBoundingClientRect().bottom
        const characterQuery = query(locationsColRef, where("name", "==" , e.target.textContent))
        const characterQuerySnapshot = await getDocs(characterQuery);
        characterQuerySnapshot.forEach((character)=>{
            const xCoord = character.data().coordinates[0];
            const yCoord = character.data().coordinates[1];
            if(xCoord > minX && xCoord < maxX && yCoord < maxY && yCoord > minY){
                setUnfoundCharacters(unfoundCharacters.filter(unFound => unFound !== character.data().name))    
            }
            else{
                console.log(false)
            }
        })
        setCoordinates(null);
    }

    return(<div className='gamescreen' onClick={createCurorOutline}>
        {coordinates ? <div className="coordinate-select">
            <div ref={cursorOutlineRef} className="cursor-outline" style={{top: coordinates[1], left: coordinates[0]}}></div>
            <Dropdown selectCharacter={selectCharacter} characters={unfoundCharacters} style={dropdownStyles}/>
        </div> : null}
        <img alt="background" className="background-img" src={backgroundImage}/>
    </div>)
}

export default Gamescreen