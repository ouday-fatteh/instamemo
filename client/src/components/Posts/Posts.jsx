import Post from "./Post/Post";
import Stories from "./Stories/Stories";
import './Posts.css';
import LoadingPosts from '../Posts/LoadingPost/LoadingPost';
import { useSelector } from 'react-redux';
import PostForm from "../PostForm/PostForm";
import { useState , useEffect} from 'react';



const Posts = (props) => {
    const posts = useSelector((state) => state.posts);
    const [isEditing,setIsEditing] = useState(false);
    const [postId,setPostId] = useState(null);
    const [refresh,setRefresh] = useState(false);
    
    useEffect(() => {

        props.setCurrentId(postId);
        props.setIsDeleting(refresh);
      
    }, [props,postId,refresh]);
    
    return (
      !posts.length  ?  (
      <div className="posts__main">
          <LoadingPosts />
      </div>  ): (
        <>
        {isEditing ? (<PostForm  componentNature='post' isEditing={isEditing} setIsEditing={setIsEditing} currentId={props.currentId} setCurrentId={setPostId}/>) : null}
        <div className="posts__main">
          
          {refresh}
          {posts.map((post,index) => {
             return <Post 
             setIsEditing={setIsEditing}
             setIsDeleting={setRefresh}
             isDeleting = {refresh}
             setCurrentId = {setPostId}
             id = {post._id}
             key={post._id+index} 
             title={post.title} 
             image={post.selectedFile} 
             message={post.message}
             createdAt={post.createdAt}
             likeCount={post.likeCount}
             comments={post.comments}
             creator={post.creator}
             shares={post.shareCount}
             tags={post.tags}
             />
          })}

        </div>
        </>
      )
    )
}

export default Posts;