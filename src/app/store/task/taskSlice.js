import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name:'task',
    initialState:{
        isSaving:false,
        messageSaved:'',
        notes:[],
        active:null,
    },
    reducers:{
        savingNewNote: (state)=> {
            state.isSaving = true;
        },
        addNewEmptyNote:(state,action)=>{
            state.notes.push(action.payload);
            state.isSaving=false;
        },
        setActiveNote:(state,action)=>{
            state.active = action.payload;
            state.messageSaved='';
        },
        setNotes:(state,action)=>{
            state.notes = action.payload;
        },
        setSaving:(state,action)=>{
            state.isSaving=true;
            state.messageSaved='';
        },
        updateNote:(state,action)=>{
            state.isSaving=false;
            state.notes = state.notes.map(note=>{
                return (note.id === action.payload.id) ? action.payload : note;
            });
            state.messageSaved=`${action.payload.title}, Successfully Update`;  
        },
        deleteNoteById:(action,state)=>{},
    }
});

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = taskSlice.actions;