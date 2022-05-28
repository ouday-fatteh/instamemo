import './ActiveConversation.css';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { VscSmiley } from 'react-icons/vsc';
import { IconContext } from "react-icons";
import { VscActivateBreakpoints } from 'react-icons/vsc';
import { BiImageAdd } from 'react-icons/bi';
import { BsMic } from 'react-icons/bs';
 
const ActiveConversation = () => {
  return (
    <div className='activeconversation__main'>
      <div className='activeconversation__header'>
        <div className='activeconversation__header__title'>
          <span className='activeconversation__header__title_spacer'>
          <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size : 25 ,className: "Navbar__icons"}}>
            <HiOutlineDotsHorizontal onClick={() => {}} />
            </IconContext.Provider>
          </span>
          <span className='activeconversation__header__title_name'><h5>Mark Zuckerberg</h5></span>
          <div className='activeconversation__header__status'>Online</div>
          </div>
      </div>
      <div className='activeconversation__body'></div>
      <div className='activeconversation__footer'>
        <div className='activeconversation__footer__emoji'>
          <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size : 22 ,className: "Navbar__icons"}}>
            <VscSmiley onClick={() => {}} />
            <VscActivateBreakpoints onClick={() => {}} />
            <BiImageAdd onClick={() => {}} />
            <BsMic onClick={() => {}} />
            </IconContext.Provider>
        </div>
        <div className='activeconversation__footer__input'>
          <input type='text' multiline placeholder='Type a message...' />
        </div>
        <div className='activeconversation__footer__send'>
          <button className='activeconversation__footer__send__button'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default ActiveConversation