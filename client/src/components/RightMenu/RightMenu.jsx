import React from 'react'
import './RightMenu.css';
import RequestChip from './RequestChip/RequestChip';
import Contact from '../Messenger/Conversation/Contact/Contact';
import { Badge } from 'antd';


const RightMenu = () => {
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
        <Contact isHome/><Contact isHome/><Contact isHome/><Contact isHome/><Contact isHome/><Contact isHome/>
        </div>
      </div>
    </div>
  )
}

export default RightMenu