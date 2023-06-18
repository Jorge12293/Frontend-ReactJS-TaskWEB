import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { startLoadingNotes } from "../store/task/thunks";


export const useCheckAuth = () => {

    const {status} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        onAuthStateChanged(firebaseAuth,async(user)=>{
            if(!user) return dispatch(logout());
            const {uid,email,displayName,photoURL} = user;
            dispatch(login({uid,email,displayName,photoURL})); // Save data user
            dispatch(startLoadingNotes()); // Load Notes
        })
    },[])
  

    return {
        status
    }
}
