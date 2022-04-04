import { useState } from 'react';
import backgroundImage from '../assets/background.jpg';

function Gamescreen(props){

    const [coordinates, setCoordinates] = useState(null);

    function createCurorOutline(e){
        setCoordinates([e.pageX, e.pageY]);

    }

    return(<div className='gamescreen' onClick={createCurorOutline}>
        <img className="background-img" src={backgroundImage}/>
        {coordinates ? <div className="coordinate-select">
            <div className="cursor-outline" style={{top: coordinates[1], left: coordinates[0]}}></div>
        </div> : null}
    </div>)
}

export default Gamescreen