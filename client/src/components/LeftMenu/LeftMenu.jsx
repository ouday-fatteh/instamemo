import React from 'react'
import './LeftMenu.css';


const LeftMenu = () => {
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
      <div className="LeftMenu__menu"></div>
      <div className="LeftMenu__invitations"></div>
    </div>
  )
}

export default LeftMenu