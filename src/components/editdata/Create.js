import {useState} from 'react';
import useFirestore from '../../hooks/useFirestore';
import addPhoto from '../../images/add_photo.svg'
import styles from './styles.module.css'
const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const {addBlog, isPending, error} = useFirestore('blogs')
    const getImage = (e) =>{
        const reader = new FileReader();
        reader.onload= () =>{
            setImage(reader.result);
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const handleSubmit = e =>{
        e.preventDefault();
        const blog = {title, body, author, image};
        addBlog(blog)
    }
    return ( 
        <div className={styles.create}>
            <h2>Create New Blog</h2>
            <form onSubmit = {handleSubmit}>
                { error&& <p className="error"> <strong>Error:</strong> {error}</p> }
                <label>Blog title</label>
                <input
                 type="text"
                 required
                 value = {title}
                 onChange = {(e)=>setTitle(e.target.value)}
                 />

                <label>Blog body</label>
                <textarea 
                required
                value = {body}
                onChange ={e=>setBody(e.target.value)}/>
                <label>Blog author</label>
                <input 
                type = "text"
                required
                value ={author}
                onChange = {e=>setAuthor(e.target.value)}
                />
               <label htmlFor="file">
                   <img src={addPhoto} alt="add"/>
                   add picture</label>
                <input 
                type="file" 
                onChange = {getImage}
                id = "file"
                />
                {!isPending&&<button className ='btn' >Add Blog</button>}
                {isPending&&<button className = 'btn'>Adding Blog...</button>}              
            </form>
            </div>
     );
}
 
export default Create;