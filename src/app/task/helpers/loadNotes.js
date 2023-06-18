import { collection, getDocs } from "firebase/firestore/lite";
import { firebaseDb } from "../../firebase/config";


export const loadNotes = async (uid='')=>{
    if(!uid) throw new Error('UID user not found.');
    const collectionRef = collection(firebaseDb,`app_task/user_${uid}/notes`)
    const docs = await getDocs(collectionRef);
    const notes = [];
    docs.forEach(doc => {
        notes.push({ id:doc.id, ...doc.data() })
    });
    return notes;
}
