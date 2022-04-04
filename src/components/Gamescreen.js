import { useState } from 'react';
import backgroundImage from '../assets/background.jpg';

function Gamescreen(props){

    const [coordinates, setCoordinates] = useState(null);

    function createCurorOutline(e){
        setCoordinates([e.pageX, e.pageY]);
    }

    function selectCharacter(e){
        e.stopPropagation();
        console.log(e.target)
    }

    return(<div className='gamescreen' onClick={createCurorOutline}>
        {coordinates ? <div className="coordinate-select">
            <div className="cursor-outline" style={{top: coordinates[1], left: coordinates[0]}}></div>
            <div className="dropdown-menu" style={{top: coordinates[1] + 15, left: coordinates[0] + 15}}>
                <button onClick={selectCharacter} className="character-option">Neo</button>
                <button onClick={selectCharacter} className="character-option">Patrick Star</button>
                <button onClick={selectCharacter} className="character-option">Kratos</button>
            </div>
        </div> : null}
        <img className="background-img" src={backgroundImage}/>
    </div>)
}

export default Gamescreen