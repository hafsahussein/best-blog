import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from '../../images/logo.svg';
import menu from '../../images/menu.png';
import close from '../../images/close.png';
import styles from './styles.module.css'
const Navbar = () => {
    const [small, setSmall] = useState(false);
    const [open, setOpen] = useState(false);
    const {currentUser} = useAuth();
    const handleSmall = () =>{
        if(window.innerWidth>=768)
        setSmall(false)
        else
        setSmall(true)
    }
    window.addEventListener('resize', ()=>{
       handleSmall()
       setOpen(false)
    })
    useEffect(() => {
        handleSmall()
    }, [])
    const handleClick = () =>{
        setOpen(!open);
    }
    return ( 
        <>
         <div className={styles.navbar}>
            <h1 onClick = {()=>setOpen(false)}>
                <Link to = "/" className = {styles.logo}>
                   <img src={logo} alt=""/> best Blog
                </Link>
            </h1>
            {small&&
            <div className={styles.open_menu}
            onClick = {handleClick}>
            <img src={open? close:menu} alt=""/>
             </div>
            }
            <div 
            className={`${styles.links} ${small&&styles.small} ${open&&styles.open}`}
             onClick = {()=>setOpen(false)}
             >
                <Link to="/">Home</Link>
                {currentUser &&
                <>
                <Link to="/profile">Profile</Link>
                <Link to="/create" className ={`btn ${styles.nav_btn}`} >New Blog</Link>
                </>
                }
                {!currentUser && 
                <Link to="/signin" className ={`btn ${styles.nav_btn}`} >Sign In</Link>
                }
            </div>
        </div>
        
        </>
     );
}
 
export default Navbar;