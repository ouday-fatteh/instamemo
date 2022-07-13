import { useEffect, useState, useRef } from 'react'
import './RightMenu.css';
import RequestChip from './RequestChip/RequestChip';
import Contact from '../Messenger/Conversation/Contact/Contact';
import io from 'socket.io-client';

import { Badge } from 'antd';




const RightMenu = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const socket = useRef();
  const [onlineUsers, setOnlineUsers] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const followers = user?.result.followers;
  socket.current = io('ws://localhost:8000/');

  useEffect(() => {
    socket.current.emit('addUser', user?.result._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(users);
    });
  }, [])
  console.log('online users : ', onlineUsers);
  let onlineUsersList = onlineUsers?.map((user) => {
    return user.userId;
  })

  return (
    <div className='RightMenu__main'>
      <div className='RightMenu__Divider'><span>Requests</span> <Badge count={0}></Badge></div>
      <div className="RightMenu__requests">
        <div className='RightMenu__requests-list'>

          <RequestChip />

        </div>
      </div>
      <div className='RightMenu__Divider'>Contacts</div>
      <div className="RightMenu__contacts">
        <div className='messenger__online-container'>


          {followers && followers.map((follower) => (
            <Contact isOnline={onlineUsersList?.includes(follower)} socket={socket} currentUserId={user?.result._id} key={follower} userId={follower} />

          ))}


        </div>
      </div>
    </div>
  )
}

export default RightMenu