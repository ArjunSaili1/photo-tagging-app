import { getDoc } from "@firebase/firestore";
export async function getTime(docRef){
    const snapshot = await getDoc(docRef);
    if(snapshot){
        if(snapshot.data().endTime["seconds"] && snapshot.data().startTime["seconds"]){
            const seconds = snapshot.data().endTime["seconds"] - snapshot.data().startTime["seconds"]
            return(Math.trunc(seconds/60) + ":" + seconds % 60)
        }
    }
}