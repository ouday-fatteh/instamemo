import Post from "./Post/Post";
import Stories from "./Stories/Stories";
import './Posts.css';
import LoadingPosts from '../Posts/LoadingPost/LoadingPost';
import { useSelector } from 'react-redux';



const Posts = () => {
    const posts = useSelector((state) => state.posts);


    return (
      !posts.length  ?  (
      <div className="posts__main">
          <LoadingPosts />
      </div>  ): (
        <div className="posts__main">
          {posts.map((post,index) => {
             return <Post 
             key={post._id+index} 
             title={post.title} 
             image={post.selectedFile} 
             message={post.message}
             createdAt={post.createdAt}
             likeCount={post.likeCount}
             comments={post.comments}
             shares={post.shareCount}
             tags={post.tags}
             />
          })}

        </div>
      )
    )
}

export default Posts;