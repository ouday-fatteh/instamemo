import './Messenger.css';
import Conversation from './Conversation/Conversation';
import Contact from './Conversation/Contact/Contact';
import ActiveConversation from './Conversation/ActiveConversation/ActiveConversation';

const Messenger = () => {
  return (
    <div className='messenger__main'>
        <div className="messenger__conversations">
            <div className='messenger__conversations-container'>
                <div className="messenger__conversations-input-container">
                    <input className='messenger__conversations-search-input' type='text' placeholder='Search conversations'></input>
                </div>
                <div className="messenger__conversations-list-container">
                    <Conversation />
                    <Conversation />
                    <Conversation />
                </div>
            </div>
        </div>
        <div className="messenger__active-conversation">
        <div className='messenger__active-container'>
                 <ActiveConversation />
        </div>
        </div>
        <div className="messenger__online-contacts">
        <div className='messenger__online-container'>
            <div style={{fontSize:'12px' , color:'gray'}}>Online - 5</div>
             <Contact />
             <Contact />
             <Contact /><Contact /><Contact />
        </div>
        </div>
    </div>
  )
}

export default Messenger