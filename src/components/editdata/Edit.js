import {useState} from 'react';
import useFirestore from '../../hooks/useFirestore';
const Edit = ({blog, id, setEdit}) => {
    const [title, setTitle] = useState(blog.title)
    const [body, setBody] = useState(blog.body)
    const [author, setAuthor] = useState(blog.author)
    const [image, setImage] = useState('')
    const {editBlog, isPending, error} = useFirestore('blogs')
    const getImage = (e) =>{
        const reader = new FileReader();
        reader.onload= () =>{
            setImage(reader.result);
        }
        reader.readAsDataURL(e.target.files[0])
    }
    const handleSubmit = e =>{
        e.preventDefault();
        const newBlog = {title, body, author, image};
        editBlog(id, blog, newBlog)
        setEdit(null)
    }
    return ( 
        <div className="create">
            <h2>Edit Blog</h2>
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
                <input 
                type="file" 
                onChange = {getImage}
                />
                {!isPending&&<button>Edit Blog</button>}
                {isPending&&<button>Editing Blog...</button>}

                
            </form>
            </div>
     );
}
 
export default Edit;