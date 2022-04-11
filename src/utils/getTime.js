import { getDoc } from "@firebase/firestore";
export async function getTime(docRef){
    const snapshot = await getDoc(docRef);
    if(snapshot){
        if(snapshot.data().endTime && snapshot.data().startTime){
            const duration = snapshot.data().endTime["seconds"] - snapshot.data().startTime["seconds"]
            const mins = Math.floor((duration % 3600) / 60);
            const seconds = duration % 60;
            let ret = "";
            ret += mins + ":" + (seconds < 10 ? "0" : "") + "" + seconds;
            return(ret)
        }
    }
}