import React , { useEffect } from 'react'
import './RightMenu.css';
import RequestChip from './RequestChip/RequestChip';
import Contact from '../Messenger/Conversation/Contact/Contact';
import { getFollowers } from '../../actions/users';
import { useDispatch , useSelector } from 'react-redux';

import { Badge } from 'antd';




const RightMenu = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const followers = useSelector((state) => state.followers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFollowers(user?.result?._id));
  }, [user?.result?._id, dispatch]);
  
  

  return (
    <div className='RightMenu__main'>
      <div className='RightMenu__Divider'><span>Requests</span> <Badge  count={14}></Badge></div>
      <div className="RightMenu__requests">
        <div className='RightMenu__requests-list'>
         
            <RequestChip />
            <RequestChip />
            <RequestChip />
            <RequestChip />
         
        </div>
      </div>
      <div className='RightMenu__Divider'>Contacts</div>
      <div className="RightMenu__contacts">
      <div className='messenger__online-container'>
     
      
     {followers?.result && followers?.result.map((follower) => (
       <Contact key={follower} userId={follower} />
     ))}
     
      
      </div>
    </div>
    </div>
  )
}

export default RightMenu