import './Contact.css';
import { MdWavingHand } from "react-icons/md"; 
import { IconContext } from 'react-icons';
import { Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import ActiveConversation from '../ActiveConversation/ActiveConversation';
import { getUser } from '../../../../actions/users';

const Contact = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const [visible, setVisible] = useState(false);

  const hide = () => {
      setVisible(false);
    };

    const handleVisibleChange = (newVisible) => {
      setVisible(newVisible);
    };

    useEffect(() => {
      dispatch(getUser(props.userId));
    }, [dispatch, props.userId]);
  return (
    <Popover
    placement='left'
    content={<div className='BubbleHolder__main'>
      <ActiveConversation 
      receiverId={props.userId}
      receiverPic={user?.result?.imageUrl}
      receiverName={user?.result?.name}
      mini={true}
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
                 src={user?.result?.imageUrl}
                  alt="profile_image" />
                </div>
                <div className="contact__name">
                    {user?.result?.name}
                </div>
             </div>
                { props.isHome && <div className="contact__send_message">
                  <div className='contact__send_message_btn'>
                    <IconContext.Provider value={{ size:15 }}>
                    <MdWavingHand />
                    </IconContext.Provider>
                  </div>
                  </div>}
                <div className='contact__online_status'></div>
    </div>
    </Popover>
  )
}

export default Contact