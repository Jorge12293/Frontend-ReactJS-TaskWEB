import { GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
    try{
        const result = await signInWithPopup(firebaseAuth,googleProvider);
        const {displayName,email,photoURL,uid} = result.user;
        return {
            ok:true,
            displayName,email,photoURL,uid
        }
    } catch(error){
        const errorCode=error.code;
        const errorMessage=error.message;
        const credential = GoogleAuthProvider.credentialFromError(error); 
        return {
            ok:false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async ({email,password,displayName}) => {
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth,email,password);
        const {uid,photoURL} = resp.user;
        await updateProfile(firebaseAuth.currentUser,{displayName}); // Update DisplayName
        return {
            ok:true,
            uid,
            photoURL,
            email,
            displayName 
        }

    } catch (error) {
       return {
        ok:false,
        errorMessage:error.message
       } 
    }
}


export const loginWithEmailPassword=async({email,password})=>{
    try {
        const {user} = await signInWithEmailAndPassword(firebaseAuth,email,password);
        return {
            ok:true,
            uid:user.uid,
            photoURL:user.photoURL,
            email:user.email,
            displayName:user.displayName 
        }
    } catch (error) {
        return {
            ok:false,
            errorMessage:error.message
        } 
    }
}

export const logoutFirebase = async () => {
    return await firebaseAuth.signOut();
}


