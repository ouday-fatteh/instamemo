import './Contact.css';
import { MdWavingHand } from "react-icons/md"; 
import { IconContext } from 'react-icons';
import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import ActiveConversation from '../ActiveConversation/ActiveConversation';
import * as API from '../../../../api';

const Contact = (props) => {
  const [user,setUser] = useState(null);
  const [visible, setVisible] = useState(false);

    const handleVisibleChange = (newVisible) => {
      setVisible(newVisible);
    };

    useEffect(() => {
      API.getUser(props.userId).then((res) => {
        setUser(res.data.result);
    })
    }, [props.userId]);
  
  return (
    <Popover
    placement='left'
    content={<div className='BubbleHolder__main'>
      <ActiveConversation 
      receiverId={props.userId}
      receiverPic={user?.imageUrl}
      receiverName={user?.name}
      senderId={props?.currentUserId}
      mini={true}
      socket={props.socket}
      />
      </div>}
    overlayClassName='ChatBubble_overlay'
    trigger="click"
    visible={visible}
    onVisibleChange={handleVisibleChange}
  >
    <div className='contact__main'>
            <div className='contact'>
              <div className="contact__profile_image">
                <img 
                style={{width: '100%', height: '100%',borderRadius: '8px'}}
                 src={user?.imageUrl}
                  alt="profile_image" />
                </div>
                <div className="contact__name">
                    {user?.name}
                </div>
             </div>
                { props.isHome && <div className="contact__send_message">
                  <div className='contact__send_message_btn'>
                    <IconContext.Provider value={{ size:15 }}>
                    <MdWavingHand />
                    </IconContext.Provider>
                  </div>
                  </div>}
                  {props.isOnline ? 
                <div className='contact__online_status'></div>
                  :<div className='contact__offline_status'></div>}
    </div>
    </Popover>
  )
}

export default Contact