import google from '../../images/google.png'
import github from '../../images/github.png'
import { useRef, useState } from "react";
import {Link, useHistory} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import firebase  from "firebase/app";
import styles from './styles.module.css'

const Signup = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const passConRef = useRef();
    const {signup, signInWithProvider} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(passRef.current.value!==passConRef.current.value)
        return setError('passwords must much');

        try{
            setLoading(true)
            setError(null)
            await signup(emailRef.current.value, passRef.current.value);
            history.push('/')

        }
        catch(error){
            setError(error.message)
            setLoading(false)
        }
        setLoading(false)

    }
    const signInWithGoogle = async() =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        try{
            setLoading(true)
            setError(null)
            await signInWithProvider(provider)
            history.push('/')

        }
        catch(error){
            setError(error.message)
            setLoading(false)
        }
        setLoading(false)
    }
    const signInWithGithub = async() =>{
        const provider = new firebase.auth.GithubAuthProvider();
        try{
            setLoading(true)
            setError(null)
            await signInWithProvider(provider)
            history.push('/')

        }
        catch(error){
            setError(error.message)
            setLoading(false)
        }
        setLoading(false)
    }
    return (  
        <form onSubmit = {handleSubmit}>
        <button type = "button"
        className={`${styles.btn_ghost}`}
        onClick = {()=>signInWithGoogle()}
             >
            <img src={google} alt="Google"/>

            Sign up with Google
        </button>
        <button type = "button"
        className={`${styles.btn_ghost}`}
        onClick = {()=>signInWithGithub()}
             >
            <img src={github} alt="Google"/>
            Sign up with Github
        </button>
        Or
        { error&& <p className="error"> <strong>Error:</strong> {error}</p> }
        <div className={styles.form_controll}>
            <label>Email</label>
            <input type="email" 
            placeholder="example@gmail.com"
            ref ={emailRef}
            required />
        </div>
         <div className={styles.form_controll}>
            <label>Password</label>
            <input type="password"
             placeholder="password"
             ref ={passRef}
             required/> 
        </div>
        <div className={styles.form_controll}>
            <label>Confirm</label>
            <input type="password"
             placeholder="password"
             ref ={passConRef}
             required/> 
        </div>
   
        <button type ="submit" className="btn" disabled = {loading}>Sign up</button>
        <small>Already have an account? <Link to="/signin">Sign In</Link></small>
         </form>
    );
}
 
export default Signup;