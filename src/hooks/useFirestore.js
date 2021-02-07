import {useState, useEffect} from 'react';
import { useAuth } from './useAuth';
import {firestore, timeStamp} from '../firebase/firebase';
import {useHistory}  from 'react-router-dom';
const useFirestore = (collection, id) =>{
    const[docs, setDocs] = useState([])
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {currentUser} = useAuth();
    const history = useHistory()

    // add blog
    const addBlog = (blog) =>{
        setError(null);
        setIsPending(false);
        const collectionREF = firestore.collection(collection);
        collectionREF.add({
            autherId:currentUser.uid,
            createdAt:timeStamp(),
            title:blog.title,
            body:blog.body,
            author:blog.author,
            image:blog.image
        })
        .then(()=>{
            setIsPending(false)
            history.push('/')

        })
        .catch(error => {
            setError(error.message)
            setIsPending(false)
        })
    }
    // edit blog
    const editBlog = (id, blog, newData) =>{
        const oldImg = blog.image;
        const newImg = newData.image;

        firestore.collection(collection).doc(id).set({
            ...blog,...newData,
             image:newImg? newImg:oldImg
        });

    }
    // delete blog
    const deleteBlog = (id) =>{
        firestore.collection(collection).doc(id).delete()
        .then(() => {
            setIsPending(false)
            history.push('/')
        }).catch((error) => {
            setIsPending(false)
            setError(error.message)
        });
        
    } 
    // read blogs from firestore
    useEffect(()=>{
       const unsub = firestore.collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot(snap=>{
            let documents = [];
            if(id) {
                console.log(id)
                snap.forEach(doc=>{
                 doc.id===id&&documents.push({...doc.data(), id:doc.id})
               })
            }
            else
            snap.forEach(doc=>{
                documents.push({...doc.data(), id:doc.id})
              })
            setDocs(documents);
        })
        return ()=> unsub();
    }, [collection, id])
    return{docs, addBlog, deleteBlog, isPending, error, editBlog};
}
export default useFirestore;
