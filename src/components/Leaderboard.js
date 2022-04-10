import db from "../utils/firebase"
import { collection, query, orderBy, getDocs } from "@firebase/firestore"
import { useEffect } from "react";

function Leaderboard(){

    useEffect(()=>{
        getAllValidUsers()
    }, [])

    async function getAllValidUsers(){
        let timeArray = [];
        const usersCollectionRef = collection(db, "users");
        const usersQuery = query(usersCollectionRef, orderBy("time"))
        const usersQuerySnapshot = await getDocs(usersQuery)
        usersQuerySnapshot.forEach((user)=>{
            if(user.data()["time"]){
                console.log(user.data()["time"])
                timeArray.push(user.data()["time"]);
            }
        })
    }

    return(<div className="modal-container">
        <div className="modal">
            <h2>Leaderboard</h2>
        </div>
    </div>)
}

export default Leaderboard