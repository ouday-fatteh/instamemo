import './Contact.css';
import { MdWavingHand } from "react-icons/md"; 
import { IconContext } from 'react-icons';

const Contact = (props) => {
  return (
    <div className='contact__main'>
            <div className='contact'>
              <div className="contact__profile_image">

                </div>
                <div className="contact__name">
                    Mark Zuckerberg
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

  )
}

export default Contact