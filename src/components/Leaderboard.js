import db from "../utils/firebase"
import { collection, query, orderBy, getDocs } from "@firebase/firestore"
import { useEffect, useState } from "react";
import uniqid from "uniqid";

function Leaderboard(){

    const [users, setUsers] = useState(null);

    useEffect(()=>{

        let usersArray = [];  
        
        async function getUserDocs(){
            const usersCollectionRef = collection(db, "users");
            const usersQuery = query(usersCollectionRef, orderBy("time"))
            return await getDocs(usersQuery)
        }

        function getMinsAndSeconds(time){
            const colonIndex = time.indexOf(":")
            return{
                mins: time.substring(0, colonIndex), 
                seconds: time.substring(colonIndex + 1)
            }
        }

        function fasterTime(timeA, timeB){
            const timeAObj = getMinsAndSeconds(timeA)
            const timeBObj = getMinsAndSeconds(timeB)
            if(timeAObj["mins"] === timeBObj["mins"]){
                if(timeAObj["seconds"] < timeBObj["seconds"]){
                    return timeA
                }
                if(timeBObj["seconds"] < timeAObj["seconds"]){
                    return timeB
                }
            }
            if(timeBObj["mins"] < timeAObj["mins"]){
                return timeB;
            }
            return timeA;
        }

        function bubbleSortByTime(usersArray){
            for(let i = 0; i < usersArray.length; i++){
                for(let j = 0; j < usersArray.length - 1; j++){
                    if(fasterTime(usersArray[j]["time"], usersArray[j+1]["time"]) === usersArray[j + 1]["time"]){
                        let temp = usersArray[j];
                        usersArray[j] = usersArray[j+1]
                        usersArray[j+1] = temp;
                    }
                }
            }
        }

        getUserDocs().then((users)=>{
            users.forEach((user)=>{
                if(user.data()["time"]){
                    usersArray.push({name: user.data().name, time: user.data()["time"]});
                }
            })
        }).then(()=>{bubbleSortByTime(usersArray)}).then(()=>{
            console.log(usersArray)
            setUsers([...usersArray])})
    }, [])

    return(<div className="modal-container">
        <div className="modal">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <ul className="leaderboard">
                <div className="leaderboard-labels">
                    <h3>Name</h3>
                    <h3>Time</h3>
                </div>
                {users ? users.slice(0,11).map((user) =>{
                    return(
                        <li className="leaderboard-player"key={uniqid()}>
                            <h4 className="leaderboard-name">{user["name"]}</h4>
                            <h4>{user["time"]}</h4>
                        </li>)
                }): null}
            </ul>

        </div>
    </div>)
}

export default Leaderboard