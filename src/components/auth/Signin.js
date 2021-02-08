import {Link, useHistory} from 'react-router-dom';
import google from '../../images/google.png'
// import github from '../../images/github.png'
import { useRef, useState } from "react";
import { useAuth } from '../../hooks/useAuth';
import firebase  from "firebase/app";
import styles from './styles.module.css'
const Signin = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const {signin, signInWithProvider} = useAuth();
    const history = useHistory();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async(e) =>{
        e.preventDefault();
        try{
            setLoading(true)
            setError(null)
            await signin(emailRef.current.value, passRef.current.value);
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
    // const signInWithGithub = async() =>{
    //     const provider = new firebase.auth.GithubAuthProvider();
    //     try{
    //         setLoading(true)
    //         setError(null)
    //         await signInWithProvider(provider)
    //         history.push('/')

    //     }
    //     catch(error){
    //         setError(error.message)
    //         setLoading(false)
    //     }
    //     setLoading(false)
    // }
    return (  
        <form onSubmit = {signInWithEmail}>
        <button type = "button"
        className={`${styles.btn_ghost}`}
        onClick = {()=>signInWithGoogle()}
        >
            <img src={google} alt="Google"/>
            Sign in with Google
        </button>
        {/* <button type = "button"
        className={styles.btn_ghost}
        onClick = {()=>signInWithGithub()}

        >
            <img src={github} alt="Google"/>
            Sign in with Github
        </button> */}
        Or
        { error&& <p className="error"> <strong>Error:</strong> {error}</p> }
        <div className={styles.form_controll}>
            <label>Email</label>
            <input type="email" 
            placeholder="example@gmail.com"
            ref ={emailRef}
            required />
        </div>
         <div  className={styles.form_controll}>
            <label>Password</label>
            <input type="password"
             placeholder="password"
             ref ={passRef}
             required/> 
        </div>
        <div className={styles.checkbox_container}>
            <Link to="/reset">Forgot Password?</Link>
        </div>
        <button type = 'submit' className="btn" disabled = {loading}>Sign in</button>
        <small>Don't have an account? <Link to='/signup'>Sign Up</Link></small>
         </form>
    );
}
 
export default Signin;