import db from "../utils/firebase"
import { collection, query, orderBy, getDocs } from "@firebase/firestore"
import {useEffect } from "react";

function Leaderboard(){


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
        }).then(()=>{bubbleSortByTime(usersArray)})

    }, [])

    return(<div className="modal-container">
        <div className="modal">
            <h2>Leaderboard</h2>
        </div>
    </div>)
}

export default Leaderboard