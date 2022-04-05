import { useState } from 'react';
import backgroundImage from '../assets/background.jpg';
import Dropdown from './Dropdown';
import db from '../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

function Gamescreen(props){

    const [coordinates, setCoordinates] = useState(null);
    const [unfoundCharacters, setUnfoundCharacters] = useState(["Neo", "Patrick Star", "Kratos"])
    const locationsRef = collection(db, "locations")

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
        const characterQuery = query(locationsRef, where("name", "==" , e.target.textContent))
        const characterQuerySnapshot = await getDocs(characterQuery);
        characterQuerySnapshot.forEach((character)=>{
            const XDifference = character.data().coordinates[0] - coordinates[0]
            const yDifference = character.data().coordinates[1] - coordinates[1];
            if(-50 < XDifference && XDifference < 50 && -50 < yDifference && yDifference < 50){
                setUnfoundCharacters(unfoundCharacters.filter(character => character !== e.target.textContent))    
            }
            else{
                console.log(false)
            }
        })
        setCoordinates(null);
    }

    return(<div className='gamescreen' onClick={createCurorOutline}>
        {coordinates ? <div className="coordinate-select">
            <div className="cursor-outline" style={{top: coordinates[1], left: coordinates[0]}}></div>
            <Dropdown selectCharacter={selectCharacter} characters={unfoundCharacters} style={dropdownStyles}/>
        </div> : null}
        <img alt="background" className="background-img" src={backgroundImage}/>
    </div>)
}

export default Gamescreen