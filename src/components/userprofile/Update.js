import { useRef, useState } from "react";
import { useHistory} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth';
import styles from '../auth/styles.module.css'

const Update = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const passConRef = useRef();
    const {currentUser, updateEmail, updatePassword} = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(passRef.current.value!==passConRef.current.value)
        return setError('passwords must much');

        const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passRef.current.value) {
      promises.push(updatePassword(passRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
}
    return (  
        <form onSubmit = {handleSubmit}>
          <h2>Edit Profile</h2>
       { error&& <p className="error"> <strong>Error:</strong> {error}</p> }
        <div className={styles.form_controll}>
            <label>Email</label>
            <input type="email" 
            placeholder="example@gmail.com"
            defaultValue = {currentUser.email}
            ref ={emailRef}
            required />
        </div>
         <div className={styles.form_controll}>
            <label>Password</label>
            <input type="password"
             placeholder="leave it blank to keep the old password"
             ref ={passRef}
             /> 
        </div>
        <div className={styles.form_controll}>
            <label>Confirm</label>
            <input type="password"
             placeholder="leave it blank to keep the old password"
             ref ={passConRef}
             /> 
        </div>
   
        <button type ="submit" className="btn" disabled = {loading}>Update</button>
         </form>
    );
}


export default Update;