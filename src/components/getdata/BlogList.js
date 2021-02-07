import {useState, useEffect} from 'react';
import BlogDetails from "./BlogDetails";
import blogImage from '../../images/blog.jpg'
import styles from './styles.module.css';
const BlogList = ({blogs}) => {
    const [id, setId] =useState();
    const blog = blogs.find(blog=>blog.id === id)
    useEffect(() => {
        return () => {
            setId(null)
        };
    }, [])
    return ( 
        <div className={styles.blog_list}>
            {!id&&        
                  blogs.map(blog=>{
                    const bacImg = blog.image? blog.image:blogImage;  
                    return(
                   <div className={styles.blog_preview} key = {blog.id}>
                     <div className={styles.blog_image} style ={{backgroundImage:"url('"+bacImg+"')"}}></div>
                     <div className = {styles.blog_content}> 
                     <h2>{blog.title}</h2>
                     <p className = {styles.author}>Written by <strong>{blog.author}</strong></p>
                     <p>{blog.body.slice(0, 120)}...</p>
                     <button className = 'btn'
                     onClick = {()=> setId(blog.id)}>
                      Read more   
                     </button>
                     </div>
                   </div>
                    )
                   } ) 
                }
                            
           {id&& 
             <BlogDetails blog = {blog} 
                 setId = {setId}/>} 
        </div>
     );
}
 
export default BlogList;