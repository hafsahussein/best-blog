import {Link} from 'react-router-dom';
import styles from './styles.module.css'
const NotFound = () => {
    return ( 
        <div className={styles.not_found}>
            <h2>404</h2>
            <p><strong>OOPS! page not found</strong>
             The page you were looking for doesn't exist.
             You may have mistyped the address or the page may have been deleted.
            </p>
            <Link to ='/' className = "btn">Back to home</Link>
        </div>
     );
}
 
export default NotFound;