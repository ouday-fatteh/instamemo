import './Message.css';
import moment from 'moment';

const Message = (props) => {
    const currentprofilepic = JSON.parse(localStorage.getItem('profile'));
  return (
    <div className="message__main" 
    style={{alignItems: props.own && 'flex-end'}}>
        <div className='message__combo'>
            {!props.own ? 
            <>
                 <div className="message__sender_picture">
                     <img
                     style={{width:'20px',height:'20px',borderRadius:'8px'}} 
                     src={props?.profilepic} alt=''/>
                 </div>
                 <div className="message__content"
                 style={{padding:'5px 10px',borderTopLeftRadius:'0px'}}>{props?.message}</div>
               
            </>
            :
            <>
                <div className="message__content"
                style={{padding:'5px 10px',backgroundColor:'rgb(30, 90, 255)',color:'white',borderTopRightRadius:'0px'}}>{props?.message}</div>
                <div className="message__sender_picture">
                <img
                     style={{width:'20px',height:'20px',borderRadius:'8px'}} 
                     src={currentprofilepic.result.imageUrl} alt=''/>
                </div>
            </>
            }
            </div>
        <div className='message__timestamp'>
            <span>{moment(props?.date).fromNow()}</span>
        </div>
    </div>
  )
}

export default Message