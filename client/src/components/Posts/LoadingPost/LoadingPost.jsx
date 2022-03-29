import { useEffect, useState } from 'react';
import './LoadingPost.css';

const Post = (props) => {
    const [isTimedOut,setIsTimedOut] = useState("");
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTimedOut("Couldn't connect , please verify your internet connection and try later.")
        }, 15000);
        return () => clearTimeout(timer);
      }, []);
    return (
        <div className="skeleton__post__main">
            <div className='skeleton__post__user-info'>
                <div className='skeleton__post__user-image'></div>
                <span></span>
                <div className='skeleton__post__user-menu'></div>
            </div>
            <div className='skeleton__post__image'>
                <div className='skeleton__connectionTimeout'>{isTimedOut}</div>
                { isTimedOut.length  ?
                <button onClick={() => window.location.reload()}>Retry</button>
                : <></>}
            </div>
            <div className='skeleton__post__image-action-bar'>
                <div className='skeleton__post__image-action-bar-left'>
                </div>
                <div className='skeleton__post__image-action-bar-right'>
                </div>
            </div>
            <div className='skeleton__post__likeCount'>
            </div>
            <div className="skeleton__post__message">
            </div>
            <div className="skeleton__post__comment-main">
            </div>
        </div>
    )
}

export default Post;