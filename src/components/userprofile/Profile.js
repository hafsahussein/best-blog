import styles from './styles.module.css'
import {useState} from 'react';
import { useAuth } from '../../hooks/useAuth';
import {Link, useHistory} from 'react-router-dom';
const Profile = () => {
    const {currentUser, signout} = useAuth();
    const [error, setError] = useState(null)
    const history = useHistory()
    const handleSignOut = async() =>{
        setError(null);
        try{
            await signout();
            history.push('/signin')
        }
        catch(error){
            setError(error.message)
        }
    }

    return <div className = {styles.profile}>
            <h2>{currentUser.email}</h2>
            <p>{currentUser.displayName||'unknown'}</p>
            {error&& <p className="error">{error}</p> }
            <Link to = '/update'className ={`btn`}>Edit</Link>
            <button className ={`btn`} onClick = {handleSignOut}>Logout</button>
           </div>;
}

export default Profile;