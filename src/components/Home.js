import useFirestore from '../hooks/useFirestore';
import BlogList from './getdata/BlogList';
const Home = () => {
   const {docs:blogs, error, isPending} = useFirestore('blogs')
    return ( 
        <div className="home">
            {error&& <div>{error}</div>}
            {isPending&& <div>Loading</div>}
           {blogs&&<BlogList blogs = {blogs}/>}
        </div>
     );
}
 
export default Home;