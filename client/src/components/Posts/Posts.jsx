import Post from "./Post/Post";
import Stories from "./Stories/Stories";
import './Posts.css';
import { getPosts } from '../../actions/posts';
import LoadingPosts from '../Posts/LoadingPost/LoadingPost';
import { useSelector , useDispatch} from 'react-redux';
import PostForm from "../PostForm/PostForm";
import { useState , useEffect} from 'react';






const Posts = (props) => {
    const [currentPage,setCurrentPage] = useState(1);
    const { posts , isLoading} = useSelector((state) => state.posts);
    const { totalPosts } = useSelector((state) => state.posts);
    const [IsDeleting,setIsDeleting] = useState(false);
    const [hasMore,setHasMore] = useState(true);
    const [isEditing,setIsEditing] = useState(false);
    const [postId,setPostId] = useState(null);
    const dispatch = useDispatch();
  


    const handleScroll = (event) => {
     const { scrollTop , clientHeight , scrollHeight } = event.currentTarget;
      if (scrollHeight - scrollTop === clientHeight){
        if(totalPosts > posts?.length){
      setCurrentPage(currentPage + 1);
      }else{
        setHasMore(false);
      }
      }
    }
    
    
    
    useEffect(() => {
      props.setCurrentId(postId);
    }, [props,postId]);

    useEffect(() => {
      if (currentPage ) dispatch(getPosts(currentPage));
    },[currentPage,dispatch,isEditing]);
    return (
      <>
     
        {isEditing ? (<PostForm  componentNature='post' isEditing={isEditing} setIsEditing={setIsEditing} currentId={props.currentId} setCurrentId={setPostId}/>) : null}
   
      
          <div className="posts__main" onScroll={handleScroll}>  
          
         
          {posts?.length > 0 && posts.map((post,index) => {
             return <Post 
             setIsDeleting={setIsDeleting}
             IsDeleting={IsDeleting}
             setIsEditing={setIsEditing}
             setCurrentId = {setPostId}
             id = {post._id}
             key={post._id+index} 
             title={post.title} 
             image={post.selectedFile} 
             message={post.message}
             createdAt={post.createdAt}
             likes={post.likes}
             comments={post.comments}
             creator={post.creator}
             creatorId={post.creatorId}
             creatorImage={post.creatorImage}
             shares={post.shareCount}
             tags={post.tags}
             />
            
              })}
              {hasMore ? (isLoading && <LoadingPosts />) : <div style={{display:'flex',justifyContent:'center',alignItem:'center',marginTop:'20px'}}>No more posts to show</div>}
       </div> 
        
     
         
       
    </>
    )}

export default Posts;