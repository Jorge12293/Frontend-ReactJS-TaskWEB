import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDb } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./taskSlice";
import { loadNotes } from "../../task/helpers/loadNotes";

export const startNewNote = () => {
    return async(dispatch,getState) => {
        dispatch(savingNewNote())
        const {uid} = getState().auth;
        const newNote = {
            title:'Title 1',
            body:'Body 1',
            date: new Date().getTime(),
        }
        const newDoc = doc(collection(firebaseDb,`app_task/user_${uid}/notes`)); 
        await setDoc(newDoc,newNote);
        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    } 
}

export const startLoadingNotes = () => {
    return async (dispatch,getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('UID user not found.');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () =>{
    return async(dispatch,getState) => {
        
        dispatch(setSaving);
        
        const { uid } = getState().auth;
        const { active:note } = getState().task;
        
        const noteToFireStore = {...note};
        delete noteToFireStore.id;

        const docRef = doc(firebaseDb,`app_task/user_${uid}/notes/${note.id}`);
        await setDoc(docRef,noteToFireStore,{merge:true});
        
        dispatch(updateNote(note));

    } 
} 

