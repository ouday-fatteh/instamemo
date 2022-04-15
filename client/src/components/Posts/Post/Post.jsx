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
import { Menu, Dropdown , message } from 'antd';
import { useLocation , Link} from 'react-router-dom';

const key = 'updatable';





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


    useEffect(()=>{
    const lowerArray =  props.tags[0].toLowerCase();
    const arraystring = lowerArray.replaceAll(" ","");
    const newtag = arraystring.split(",");
    const likes = props.likes;
    const isLiked = likes.includes(currentUserId);
    setTimeout(() => {
      setTags(newtag);  
    }, 1000);
    if (isLiked) {
      setDidLike(true);
    }else{
      setDidLike(false);
    }
    
    },[props.tags,props.likes , location]);


    const handleLikes = () => {
        dispatch(likePost(props.id));
    }
    const handleDelete = () => {
        const fullUrl = props.image;
        const image_id = fullUrl.substr(72 + 1);
        const fetchedImage_id = image_id.substr(0,image_id.length - 4);
        dispatch(deletePost(props.id));
        dispatch(deleteImage(fetchedImage_id));
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
        : null}
        {currentUserId !== props.creatorId ? (
          <>
          <Menu.Item key="3"><span>Hide posts from {props.creator.substring(0,props.creator.indexOf(' '))}</span></Menu.Item>
          <Menu.Item key="4"><span>Report post</span></Menu.Item>
          </>
        ): null}
        
      </Menu>
    
    );
    const linktopost = `/post/${props.id}`;
    return (
        <div className="post__main">
            <div className='post__user-info'>
                <div className='post__user-wrapper'>
                {!props.creatorImage ? (
                            <div className='post__user-image' style={{backgroundColor:'red',justifyContent:'center',alignItems:'center' ,color:'white' ,display:'flex'}}>
                            {props.creator.charAt(0).toUpperCase()}
                            </div>
                ) : (
                  <div className='post__user-image' style={{justifyContent:'center',alignItems:'center',display:'flex'}}>
                   <img style={{width:'30px' , height:'30px'}} src={props.creatorImage} alt={props.creator} ></img>
                  </div>
                )}
          
                    <div className='post__user-name-time'>
                    <span id='post__user-name'>{props.creator}</span>
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
            <img style={{maxWidth:'100%',objectFit:'contain'}} alt={props.title} src={props.image}></img>
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
                <div>{props.likes.length > 1 || props.likes.length === 0 ? `${props.likes.length} Likes` : `${props.likes.length} Like` }</div>
                <div>{props.comments ? props.comments.length : '0'} Comments</div>
                <div>{props.shares ? props.shares : 0} Shares</div>
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

            <div className="post__comment-main">
            <VscSmiley style={{marginLeft:'10px'}}/>
            <input type='text' className="comment-input" placeholder='Add a comment'></input>
            <BiMessageSquareAdd style={{marginRight:'10px'}}/>

            </div>
            </IconContext.Provider>
        </div>
    )
}

export default Post;