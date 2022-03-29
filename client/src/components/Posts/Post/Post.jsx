import './Post.css';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IconContext } from "react-icons";
import { AiOutlineHeart , AiFillHeart , AiOutlineComment , AiOutlineShareAlt} from "react-icons/ai";
import { BsBookmarkHeart } from 'react-icons/bs';
import { VscSmiley } from 'react-icons/vsc';
import { BiMessageSquareAdd } from 'react-icons/bi';
import moment from 'moment';
import { useState } from 'react';
const Post = (props) => {
    const [didLike,setDidLike] = useState(false);

    const handleLikes = () => {
        setDidLike(!didLike);
    }

    return (
        <div className="post__main">
            <div className='post__user-info'>
                <div className='post__user-image'></div>
                <div className='post__user-name-time'>
                <span>User_name</span>
                <span>{moment(props.createdAt).fromNow()}</span>
                </div>
                <IconContext.Provider  value={{ color: "white",size : 25 ,className: "Navbar__icons"}}>
                <div className='post__user-menu'><HiOutlineDotsHorizontal /></div>
                </IconContext.Provider>
            </div>

            <div className='post__image' style={{objectFit: 'contain'}}>
            <img style={{height:'400px'}} alt={props.title} src={props.image}></img>
            </div>
            <IconContext.Provider  value={{ color: "white",size : 25 ,className: "Navbar__icons"}}>
            <div className='post__image-action-bar'>
            
                <div className='post__image-action-bar-left'>
                    {!didLike ? (
                <AiOutlineHeart onClick={() => {handleLikes()}}/>
                    ) : (<AiFillHeart onClick={() => {handleLikes()}}/>)}
                <AiOutlineComment />
                <AiOutlineShareAlt />
                </div>
                <div className='post__image-action-bar-right'>
                <BsBookmarkHeart />
                </div>
           
            </div>
            <div className='post__likeCount'>
                <div>{props.likeCount} Likes</div>
                <div>{(props.comments).length} Comments</div>
                <div>{props.shares} Shares</div>
            </div>
            <div className='post__tags'>
            {props.tags.map((tag) => {const firstclear = tag.replaceAll(' ','');const clear = firstclear.replaceAll(',',' #'); return '#'+clear;})}
            </div>
            <div className='post__title'>
            {props.title}
            </div>
            <div className="post__message">
            {props.message}
            </div>

            <div className="post__comment-main">
            <VscSmiley style={{marginLeft:'10px'}}/>
            <input type='text' id="comment-input" placeholder='Add a comment'></input>
            <BiMessageSquareAdd style={{marginRight:'10px'}}/>

            </div>
            </IconContext.Provider>
        </div>
    )
}

export default Post;