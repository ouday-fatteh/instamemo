import React from 'react'
import { useEffect } from 'react';
import './PostDetails.css';
import { useLocation } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import { useDispatch , useSelector} from 'react-redux';
import moment from 'moment';


const PostDetails = () => {                                                                                                    
  const dispatch = useDispatch();
  const location = useLocation();
  const postdetails = useSelector(state => state.post);
  useEffect(() => {
    const currentUrl = window.location.pathname;
    const currentId = currentUrl.replace('/post/','');
    dispatch(getPost(currentId)); 
    
  }, [location , dispatch ]);


  return (
    <div className='PostDetails__main'>
      <div className="PostDetails__container-action-control">return</div>
      <div className='PostDetails__container-details'>
        <div className='PostDetails__container-right'>
         <img style={{objectFit:'contain',width:'100%',height:'100%'}} alt={postdetails.title} src={postdetails.selectedFile}></img>
      </div>
        <div className='PostDetails__container-left'>
            <div className='PostDetails__container__header'>
                <div className='PostDetails__container__header__title'> 
                    <h4>{postdetails.title}</h4>
                    <div className='PostDetails__container__header__user'>
                      <h4>By : {postdetails.creator}</h4>
                      <div className="PostDetails__container__header-createdat">Created {moment(postdetails.createdAt).fromNow()}</div>
                    </div>
                  </div>
            </div>
            <div className="PostDetails__container__content">
              <div className="PostDetails__container__content-message">{postdetails.message}</div>
              <div className="PostDetails__container__content-hashtags">{postdetails.tags ? postdetails.tags.map((tag) => `#${tag} `) : ''}</div>
              <div className="PostDetails__container__content-stats">
                <div>{postdetails.likes ? postdetails.likes.length : 0} likes</div> 
                <div>5 shares</div>
              </div>
            </div>      
        </div>
      </div>
      <div className="PostDetails__container-comments">
        Comments {postdetails.comments ? postdetails.comments.length : '0'}
      </div>
      <div className='PostDetails__container-recommended'>
        Recommended
      </div>
    </div>
  )
}

export default PostDetails