import './ActiveConversation.css';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { useState } from 'react';
import { VscSmiley } from 'react-icons/vsc';
import { IconContext } from "react-icons";
import { VscActivateBreakpoints } from 'react-icons/vsc';
import { BiImageAdd } from 'react-icons/bi';
import { BsMic } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';
import TextareaAutosize from 'react-textarea-autosize';
 
const ActiveConversation = (props) => {
  const [inputClicked,setInputClicked] = useState(false);
  const [areaHeight,setAreaHeight] = useState('');
  
  const handleInputWidth = () => {
    setInputClicked(!inputClicked)
  }

  const handleMessageSend = () => {
    let message = document.getElementsByClassName('activeconversation__footer__input_textarea')[0].value;
    console.log(message)

  }

  
  
  return (
    <div className='activeconversation__main'>
      <div className='activeconversation__header'>
        <div className='activeconversation__header__title'>
          <span className='activeconversation__header__title_spacer'>
          <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size : 25 ,className: "Navbar__icons"}}>
            <HiOutlineDotsHorizontal onClick={() => {}} />
            </IconContext.Provider>
          </span>
          <span className='activeconversation__header__title_name'>{props.mini ? <span style={{fontSize:'11px'}}>{props?.receiverName}</span> : <h5>{props?.receiverName}</h5>}</span>
          <div className='activeconversation__header__status'>{props.mini ? '':'Online'}</div>
          </div>
      </div>
      <div className='activeconversation__body'></div>
      <div className='activeconversation__footer'
      style={{padding:props.mini && '10px 5px'}}>
        <div className='activeconversation__footer__emoji'
        style={{width:props.mini && (inputClicked ? '10%' : '40%')}}
        >
          {props.mini ?   <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size :18 ,className: "Navbar__icons"}}>
            {!inputClicked ?
            <>
            <VscSmiley onClick={() => {}} />
            <VscActivateBreakpoints onClick={() => {}} />
            <BiImageAdd onClick={() => {}} />
            <BsMic onClick={() => {}} />
            </>:
             <IconContext.Provider  value={{ color: "rgb(30, 90, 255)",size :20 }}> 
             <IoIosArrowForward onClick={handleInputWidth}/>
             </IconContext.Provider>
            }
            </IconContext.Provider> 
           
            : 
          <IconContext.Provider  value={{ color: "rgb(60, 60, 60)",size :22 ,className: "Navbar__icons"}}>
            <VscSmiley onClick={() => {}} />
            <VscActivateBreakpoints onClick={() => {}} />
            <BiImageAdd onClick={() => {}} />
            <BsMic onClick={() => {}} />
            </IconContext.Provider>
}
        </div>
        <div className='activeconversation__footer__input'
        
        >
           <TextareaAutosize 
          onClick={()=> setInputClicked(true)}
          style={{height: props.mini && (areaHeight ? areaHeight : '25px') ,width:inputClicked && '100%'}}
          placeholder='Type a message...'
          className='activeconversation__footer__input_textarea'
          maxRows={4}
           />
        
        </div>
        <div className='activeconversation__footer__send'
        style={{width:props.mini && '20%'}}
        >
          <div className='activeconversation__footer__send__button'>
          <IconContext.Provider  value={{ color: "rgb(30, 90, 255)",size :20 }}>
            <div onClick={handleMessageSend}>
            <AiOutlineSend />
            </div>
            </IconContext.Provider>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveConversation