import db from "../utils/firebase"
import { collection, query, orderBy, getDocs } from "@firebase/firestore"
import { useEffect, useState } from "react";
import uniqid from "uniqid";
import { motion } from "framer-motion";

function Leaderboard(){

    const [users, setUsers] = useState(null);

    const leaderboardContainer = {
        show: {
            transition: {
                staggerChildren: 1
            },
            opacity: 1
        },
        hidden: {opacity: 0}
    }

    const leaderboardEntry = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }

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
            <motion.ul initial="hidden" animate="show" variants={leaderboardContainer} className="leaderboard">
                <motion.div variants={leaderboardEntry} className="leaderboard-labels">
                    <h3>Name</h3>
                    <h3>Time</h3>
                </motion.div>
                {users ? users.slice(0,11).map((user) =>{
                    return(
                            <motion.li variants={leaderboardEntry}className="leaderboard-player"key={uniqid()}>
                                <h4 className="leaderboard-name">{user["name"]}</h4>
                                <h4>{user["time"]}</h4>
                            </motion.li >)
                }): null}
            </motion.ul>

        </div>
    </div>)
}

export default Leaderboard