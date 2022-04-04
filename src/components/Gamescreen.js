import backgroundImage from '../assets/background.jpg';

function Gamescreen(props){

    function getCoordinates(e){
        console.log(e.clientX, e.clientY)
    }

    return(<div className='gamescreen' onClick={getCoordinates}>
        <img className="background-img" src={backgroundImage}/>
    </div>)
}

export default Gamescreen