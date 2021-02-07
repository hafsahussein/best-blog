import {createContext, useState, useEffect} from 'react';
import { auth } from '../firebase/firebase';

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // sign up
    const signup = (email, password) =>
    (auth.createUserWithEmailAndPassword(email, password))
    
    // sign in
    const signin = (email, password) =>
    (auth.signInWithEmailAndPassword(email, password))

    // signout
    const signout = () =>(
        auth.signOut()
    )
   
    // sign in with provider
    const signInWithProvider = (provider) =>{
        auth.signInWithPopup(provider)  
    }
    // reset password
    const resetPassword = (email) =>{
        auth.sendPasswordResetEmail(email);
    }
    // listen for user changes
         useEffect(()=>{
            const unsubscribe = auth.onAuthStateChanged(user=>{   
            setCurrentUser(user)
            setLoading(false)

        })
        return unsubscribe;
    },[])

    // update email
    const updateEmail = (email) =>currentUser.updateEmail(email)
    
    // update password
    const updatePassword = (password) =>currentUser.updatePassword(password)
    
    const value = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        updateEmail, 
        updatePassword,
        signInWithProvider
    }


    return <AuthContext.Provider value = {value}>
                    {!loading&&children}
         </AuthContext.Provider>
}
