import './Post.css';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IconContext } from "react-icons";
import { AiOutlineHeart , AiFillHeart , AiOutlineComment , AiOutlineShareAlt} from "react-icons/ai";
import { BsBookmarkHeart } from 'react-icons/bs';
import { VscSmiley } from 'react-icons/vsc';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { likePost , unLikePost} from '../../../actions/posts';
import moment from 'moment';
import { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const Post = (props)=> {
    const dispatch = useDispatch();
    const [didLike,setDidLike] = useState(false);
    const [tags,setTags] = useState([]);



    useEffect(()=>{
    const lowerArray =  props.tags[0].toLowerCase();
    const arraystring = lowerArray.replaceAll(" ","");
    const newtag = arraystring.split(",");
    setTimeout(() => {
      setTags(newtag);  
    }, 1000);
    
    },[props.tags]);
  


    const handleLikes = (value) => {
        setDidLike(value);
        if(!didLike){
            dispatch(likePost(props.id));
        }
        else{
            dispatch(unLikePost(props.id));
        }
     
    }

    const handleedit = () => {
        props.setCurrentId(props.id);
        props.setIsEditing(true)
    } 

    const menu = (
      <Menu>
        <Menu.Item key="0">
          <span onClick={handleedit}>Edit post</span>
        </Menu.Item>
        <Menu.Item key="1">
          <span>Delete post</span>
        </Menu.Item>
        
        <Menu.Item key="3">Report post</Menu.Item>
      </Menu>

    );
    return (
        <div className="post__main">
            <div className='post__user-info'>
                <div className='post__user-wrapper'>
                    <div className='post__user-image'></div>
                    <div className='post__user-name-time'>
                    <span>User_name</span>
                    <span>{moment(props.createdAt).fromNow()}</span>
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

            <div className='post__image' style={{objectFit: 'contain'}}>
            <img style={{height:'400px'}} alt={props.title} src={props.image}></img>
            </div>
            <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size : 25 ,className: "Navbar__icons"}}>
            <div className='post__image-action-bar'>
            
                <div className='post__image-action-bar-left'>
                    {!didLike ? (
                <AiOutlineHeart onClick={() => {handleLikes(true)}}/>
                    ) : (<AiFillHeart onClick={() => {handleLikes(false)}}/>)}
                <AiOutlineComment />
                <AiOutlineShareAlt />
                </div>
                <div className='post__image-action-bar-right'>
                <BsBookmarkHeart />
                </div>
           
            </div>
            <div className='post__likeCount'>
                <div>{props.likeCount ? props.likeCount : 0} Likes</div>
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