import {useState, useEffect} from 'react';
import { useAuth } from "../../hooks/useAuth";
import useFirestore from "../../hooks/useFirestore";
import Edit from '../editdata/Edit';
import styles from './styles.module.css';
import blogImage from '../../images/blog.jpg'
const BlogDetails = ({blog, setId}) => {
    const [editBlog, setEditBlog] = useState(null)
    const {currentUser} = useAuth();
    const {deleteBlog} = useFirestore('blogs');
    const bacImg = blog.image? blog.image:blogImage;  

    const handleDelete = ()=>{
        deleteBlog(blog.id)
        setId(null)
    }
    useEffect(() => {
        return () => {
          setEditBlog(null)  
        };
    }, [])
    return ( <div className ={styles.blog_details}> 
        {
            editBlog&&
            <Edit blog = {editBlog} id ={editBlog.id} setEdit = {setEditBlog}/>
        }
        {
            !editBlog&&
            <article>
            <div className={styles.blog_image} style ={{backgroundImage:"url('"+bacImg+"')"}}></div>
             <h2>{blog.title}</h2>
            <p>Written by <strong>{blog.author}</strong></p>
            <div>{blog.body}</div>
            <button className = 'btn' onClick = {()=>setId(null)}>All blogs</button>
            {currentUser&&currentUser.uid===blog.autherId&&
                <>
                <button className = 'btn' onClick ={()=> setEditBlog(blog)}>Edit</button>
                <button className = 'btn del' onClick = {handleDelete}>Delete</button>
                </>

            }
        </article>
        }
        </div>
     );
}
 
export default BlogDetails;