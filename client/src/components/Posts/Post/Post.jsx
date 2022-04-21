import './Post.css';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IconContext } from "react-icons";
import { AiOutlineHeart , AiFillHeart , AiOutlineComment , AiOutlineShareAlt} from "react-icons/ai";
import { BsBookmarkHeart } from 'react-icons/bs';
import { VscSmiley } from 'react-icons/vsc';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { likePost  , deletePost , deleteImage} from '../../../actions/posts';
import moment from 'moment';
import { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown , message ,Collapse , Spin } from 'antd';
import { useLocation , Link , useHistory} from 'react-router-dom';
import CommentSection from './Comments';
import { createComment } from '../../../actions/posts';


const key = 'updatable';
const { Panel } = Collapse;





const openMessage = (msg,failed) => {
  if (!failed) {
    message.loading({ content: 'Loading...', key ,style:{zIndex:9999}});
    setTimeout(() => {
      message.success({ content: msg, key, duration: 2 ,style:{zIndex:9999} });
    }, 1000);
  }
    else {
      message.error({ content: msg, key, duration: 2 ,style:{zIndex:9999} });
    }
  };





const Post = (props)=> {
    const dispatch = useDispatch();
    const [didLike,setDidLike] = useState(false);
    const [tags,setTags] = useState([]);
    const location = useLocation();
    const currentUserId = JSON.parse(localStorage.getItem('profile'))?.result._id || JSON.parse(localStorage.getItem('profile'))?.result.googleId;
    const currentUser = JSON.parse(localStorage.getItem('profile'))?.result;
    const history = useHistory();
    const [comment,setComment] = useState('Show');
    const [commentValue,setCommentValue] = useState({message:''});

    useEffect(()=>{
    const lowerArray =  props.tags[0].toLowerCase();
    const arraystring = lowerArray.replaceAll(" ","");
    const newtag = arraystring.split(",");
    const likes = props?.likes;
    const isLiked = likes?.includes(currentUserId);
    setTimeout(() => {
      setTags(newtag);  
    }, 1000);
    if (isLiked) {
      setDidLike(true);
    }else{
      setDidLike(false);
    }
    
    },[props.tags,props.likes ,currentUserId, location]);


    const handleCommentsChange = (e) => {
      setCommentValue({...commentValue,message:e.target.value});
    }

    const handleLikes = () => {
        dispatch(likePost(props.id));
    }
    const handleDelete = () => {
        const fullUrl = props.image || null;
        let fetchedImage_id =  '';
        if (fullUrl) {
        const image_id = fullUrl.substring(72 + 1);
        fetchedImage_id = image_id.substring(0,image_id.length - 4);
        }
        dispatch(deletePost(props.id));
        if (fetchedImage_id) {
        dispatch(deleteImage(fetchedImage_id));
        }
        props.setCurrentId(0);
        openMessage('Post Deleted');
        setTimeout(() => {
        props.setCurrentId(null);
        props.setIsDeleting(true);
        }, 1000);
        
    }
    const handleedit = () => {
        props.setCurrentId(props.id);
        props.setIsEditing(true)
    } 

    const handleLikesNotConnected = () => {
        openMessage('Please sign in to react to posts',true);

    }
    const handleCommentShow = () => {
      if(comment === 'Show') {setComment('Hide')} else {setComment('Show')}
    }
   
    const menu = (
      <Menu>
        {currentUserId === props.creatorId ?
        <>
        <Menu.Item key="0">
           <span onClick={handleedit}>Edit</span> 
        </Menu.Item> 
        <Menu.Item key="1">
           <span onClick={handleDelete}>Delete</span>
        </Menu.Item>
        </>
        : (
          <>
          <Menu.Item key="3"><span>Hide posts from {props?.creator?.substring(0,props.creator.indexOf(' '))}</span></Menu.Item>
          <Menu.Item key="4"><span>Report post</span></Menu.Item>
          </>
        )}
        
      </Menu>
    
    );

    const handleCommentCreate = () => {
      if (commentValue.message) {
        dispatch(createComment(props.id,{...commentValue , creatorId:currentUserId , creator:currentUser?.name,creatorImage: currentUser.imageUrl }));
        setCommentValue({message:''});
      }

    }
    const handleKeypress = e => {
    if (e.keyCode === 13) {
      handleCommentCreate();
    }
  };
    const linktopost = `/post/${props.id}`;
    return (
        <div className="post__main">
            <div className='post__user-info'>
                <div className='post__user-wrapper'>
                {!props.creatorImage ? (
                            <div onClick={()=> history.push(`users/${props.creatorId}`)} className='post__user-image' style={{cursor:'pointer',backgroundColor:'rgb(30, 90, 255)',justifyContent:'center',alignItems:'center' ,color:'white' ,display:'flex'}}>
                            {props?.creator?.charAt(0).toUpperCase()}
                            </div>
                ) : (
                  <div className='post__user-image' onClick={()=> history.push(`users/${props.creatorId}`)} style={{cursor:'pointer',justifyContent:'center',alignItems:'center',display:'flex'}}>
                   <img style={{width:'30px' , height:'30px',borderRadius:'8px'}} src={props.creatorImage} alt={props.creator} ></img>
                  </div>
                )}
          
                    <div className='post__user-name-time'>
                    <span id='post__user-name' style={{cursor:'pointer'}} onClick={()=> history.push(`/users/${props.creatorId}`)}>{props.creator}</span>
                    <span id='post__user-time'>{moment(props.createdAt).fromNow()}</span>
                    </div>
                </div>{/**props.setIsEditing(true)**/}
                <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size : 25 ,className: "Navbar__icons"}}>
                <div className='post__user-menu' onClick={() => {}}>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <HiOutlineDotsHorizontal onClick= {(e) => {}}/>
                </span>
                
                </Dropdown>
                </div>
                
                
                
                </IconContext.Provider>
            </div>

            <Link to={linktopost} ><div className='post__image' style={{objectFit: 'contain'}}>
            <img style={{width:'100%',objectFit:'fill'}} alt={props.title} src={props.image}></img>
            </div></Link>
            <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size : 25 ,className: "Navbar__icons"}}>
            <div className='post__image-action-bar'>
            
                <div className='post__image-action-bar-left'>
                    {didLike ? <AiFillHeart onClick={() => {handleLikes()}}/>
                      : <AiOutlineHeart  onClick={() => {currentUserId ? handleLikes() : handleLikesNotConnected()}}/> }
                <AiOutlineComment />
                <AiOutlineShareAlt />
                </div>
                <div className='post__image-action-bar-right'>
                <BsBookmarkHeart />
                </div>
           
            </div>
            <div className='post__likeCount'>
                <div>{props?.likes?.length > 1 || props?.likes?.length === 0 ? `${props?.likes?.length} Likes` : `${props?.likes?.length} Like` }</div>
                <div>{props?.comments ? props?.comments?.length : '0'} Comments</div>
                <div>{props?.shares ? props?.shares : 0} Shares</div>
            </div>
            <div className='post__tags'>
            {tags ? tags.map((tag) => `#${tag} `) : ''}
            </div>
            <div className='post__title'>
            {props.title}
            </div>
            <div className="post__message">
            {props.message}
            </div>
            {props.comments?.length > 0 && (
            <div className='post_comments' >
              <Collapse ghost defaultActiveKey={0}  style={{display:'flex',width:'100%',fontSize:'13px',justifyContent:'center'}} onChange={() => handleCommentShow}>
              <Panel key={1} header={`${comment} comments`} style={{width:'100%'}}  >
                
                {props?.comments?.map((comment,index) => (
              <CommentSection 
              key={comment._id+index}
              creator={comment.creator}
              creatorId={comment.creatorId}
              createdAt={comment.createdAt}
              creatorImage={comment.creatorImage}
              message={comment.message}
               />
                ))}
              </Panel>
              </Collapse>
            </div>
            )
            }
            
           
             <Spin spinning={props?.isLoading} delay={500}>
               <div className="post__comment-main">
            <VscSmiley style={{marginLeft:'10px'}}/>
            
            <input type='text' onKeyDown={(e) => handleKeypress(e)} value={commentValue.message} onChange={(e) => handleCommentsChange(e)} className="comment-input" placeholder='Add a comment'></input>
            
            <BiMessageSquareAdd onClick={() => handleCommentCreate() } style={{marginRight:'10px'}}/>
            </div>
            </Spin>
            
            
            </IconContext.Provider>
        </div>
    )
}

export default Post;