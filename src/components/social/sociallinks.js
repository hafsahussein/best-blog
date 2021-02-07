import styles from './styles.module.css'
import fiverr from '../../images/fiverr.png';
import github from '../../images/github_social.png';
const Social = () => {
    return ( 
        <div className= {styles.social}>
            <a href =  'https://github.com/hafsahussein' rel="noreferrer" target="_blank" title = 'follow me on github'>
               <img src={github} alt="github"/> Github</a>
            <a href ='https://www.fiverr.com/share/3bRB19' rel="noreferrer" target="_blank" title = 'hire me on fiverr'>
               <img src={fiverr} alt="fiverr"/> Fiverr</a>
        </div>
     );
}
 
export default Social;