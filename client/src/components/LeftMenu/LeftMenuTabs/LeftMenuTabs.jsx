import './LeftMenuTabs.css';
import { IconContext } from "react-icons";
import { HiOutlineHome } from 'react-icons/hi';
import { HiOutlineChat } from 'react-icons/hi';
import { AiOutlineCompass } from 'react-icons/ai';
import { HiOutlineHeart } from 'react-icons/hi';
import { MdNotificationsNone } from 'react-icons/md';
import { Badge } from 'antd';

const LeftMenuTabs = (props) => {
  return (
    <div 
    style={{borderTop:props.name === 'Home' ? 'none' : '1px solid #dbdbdb'
    ,borderLeft:props.selected ? '2px solid rgb(30, 90, 255)' 
    : 'none',color:props.selected && 'rgb(30, 90, 255)'
    ,borderTopLeftRadius:props.name === 'Home' ? '8px' : '0px'
    ,borderBottomRightRadius:props.name ==='Notifications' ? '8px' : '0px'
    ,borderTopRightRadius:props.name === 'Home' ? '8px' : '0px'
    ,borderBottomLeftRadius:props.name ==='Notifications' ? '8px' : '0px'
  }}
    className='Tab__main'
    onClick={() => props.setSelected(props.name)}
    >
        <div className='Tabs__left'>
        <IconContext.Provider  value={{ color:props.selected ? 'rgb(30, 90, 255)' : "#7c7c7c",size : 20 ,className: "Tab__icons"}}>
        {props.name === 'Home' &&
        <HiOutlineHome />}
         {props.name === 'Messenger' &&
        <HiOutlineChat />}
         {props.name === 'Discover' &&
        <AiOutlineCompass />}
         {props.name === 'Favorites' &&
        <HiOutlineHeart/>}
         {props.name === 'Notifications' &&
        <MdNotificationsNone/>}
        </IconContext.Provider>
        <span>{props.name}</span>
        </div>
        <div className='Notification__count'>
            {props.new &&
            <Badge dot ></Badge>
            }
            </div>
         
    </div>
  )
}

export default LeftMenuTabs