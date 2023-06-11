import { GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try{
        const result = await signInWithPopup(firebaseAuth,googleProvider);
        const {displayName,email,photoURL,uid} = result.user;
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        return {
            ok:true,
            // User Info
            displayName,email,photoURL,uid
        }
    } catch(error){
        const errorCode=error.code;
        const errorMessage=error.message;
        
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error); 
        return {
            ok:false,
            errorMessage
        }
    }
}