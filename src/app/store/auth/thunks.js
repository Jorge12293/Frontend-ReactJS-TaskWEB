import { singInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email,password) => {
    return async(dispatch)=>{
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = (email,password) => {
    return async(dispatch)=>{
        dispatch(checkingCredentials());
        const result = await singInWithGoogle();
        if(!result.ok) return dispatch(logout(result.errorMessage));
        console.log(result);
        // Login Ok
        dispatch(login(result))
    }
}