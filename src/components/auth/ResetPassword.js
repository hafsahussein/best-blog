import { Link } from "react-router-dom";
import {useRef, useState} from 'react';
import { useAuth } from "../../hooks/useAuth";
const ResetPassword = () => {
    const {resetPassword} = useAuth();
    
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('')   
    const sendReset = async(e) =>{

        e.preventDefault();

        try{
            setError(null)
            setMessage('')
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for futher instructions')
        }
        catch(error){
            setError(error.message)
            setMessage('')
        }
    }
    const emailRef = useRef();
    return <div className = "reset-password">
            <form >
             {error&& <p className="error">{error}</p>}   
             {message && <p className="message">{message}</p> }
            <div className="form-controll">
            <label>Email</label>
            <input type="email"
             placeholder="example@gmail.com"
             ref ={emailRef}
             required/> 
        </div>
   
        <button className="btn" onClick = {sendReset}>Reset password</button>
        <small><Link to="/signin">Sign In</Link></small>
    
            </form>
          </div>;
}

export default ResetPassword;