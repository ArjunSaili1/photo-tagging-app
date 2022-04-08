import neoImg from '../assets/characterImages/neo.png';
import jabbaImg from '../assets/characterImages/jabba.png';
import bowserImg from '../assets/characterImages/bowser.png'
import benderImg from '../assets/characterImages/bender.png'
import kratosImg from '../assets/characterImages/kratos.png'
import yubabaImg from '../assets/characterImages/yubaba.png'
import batmanImg from '../assets/characterImages/batman.png'
import theKnightImg from '../assets/characterImages/theknight.png';
import aangImg from '../assets/characterImages/aang.png'

function StartModal(){

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

    return(<div className="start-modal-container">
        <div className="start-modal">
            <h2>Choose a Difficulty</h2>
            <div className="dif-opitions">
                <button>Easy</button>
                <button>Medium</button>
                <button>Hard</button>
            </div>
        </div>
    </div>)
}

export default StartModal