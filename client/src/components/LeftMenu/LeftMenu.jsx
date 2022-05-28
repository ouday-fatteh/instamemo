import './LeftMenu.css';
import { useState } from 'react';
import LeftMenuTabs from './LeftMenuTabs/LeftMenuTabs';
import dummyAdImage from '../../images/dummyad.jpg';


const LeftMenu = () => {
  const [selected,setSelected] = useState('Home');
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <div className='LeftMenu__main'>
      <div className="LeftMenu__profile">
        <div className='LeftMenu__profile__info'>
        <div className='LeftMenu__profile__image'>
          {user?.result?.imageUrl ? <img className='LeftMenu__profile__image-img' alt={user?.result?.name} src={user?.result?.imageUrl}></img>:<div className='LeftMenu__profile__image-text'>{user?.result?.name.charAt(0)}</div>}</div>
          <div className='LeftMenu__profile__name-prof'>
        <div className='LeftMenu__profile__name'>{user?.result?.name}</div>
        <div className='LeftMenu__profile__profession'><span style={{fontSize:'12px',color:'gray'}}>Fullstack Engineer</span></div>
        </div>
        </div>
        
      </div>
      <div className="LeftMenu__menu">
        <LeftMenuTabs name='Home' new selected={selected === 'Home'}  setSelected={setSelected}/>
        <LeftMenuTabs name='Messenger' selected={selected === 'Messenger'} setSelected={setSelected}/>
        <LeftMenuTabs name='Discover' selected={selected === 'Discover'} setSelected={setSelected}/>
        <LeftMenuTabs name='Favorites' selected={selected === 'Favorites'} setSelected={setSelected}/>
        <LeftMenuTabs name='Notifications' selected={selected === 'Notifications'} setSelected={setSelected} new/>
      </div>
      <div className="LeftMenu__invitations">
        <div className='LeftMenu__ad_background'>
          <img id='image__ad_holder' src={dummyAdImage} alt=''></img>
        </div>

        <div className='LeftMenu__ad_overlay'>
          <div className='LeftMenu__ad_overlay_text'>
            <p>
            Get to know your true potential and succeed.
            </p>
            </div>
          <div className='LeftMenu__ad_overlay_buttons'>
            <button className='LeftMenu__ad_overlay_button-1'>Read more</button>
            <button className='LeftMenu__ad_overlay_button-2'>Report</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftMenu