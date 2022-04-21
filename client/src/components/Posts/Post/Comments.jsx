import React, { createElement, useState } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import './Comments.css';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';

const CommentSection = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];
  
  return (
    <Comment
      actions={actions}
      author={<a>{props?.creator}</a>}
      avatar={props.creatorImage ? <Avatar style={{width:'30px' , height:'30px',borderRadius:'8px'}} src={props.creatorImage} alt={props.creator} /> : <div className='comment__user-image'>
        {props?.creator?.charAt(0).toUpperCase()}
      </div>}
      content={
        <p style={{fontSize:'12px'}}>
         {props?.message}
        </p>
      }
      datetime={
        <Tooltip title={moment(props?.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(props?.createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default CommentSection;