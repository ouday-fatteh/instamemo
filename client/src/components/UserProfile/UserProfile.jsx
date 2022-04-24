import React, { useEffect } from 'react'
import './UserProfile.css'
import { Button } from '@mui/material'
import { useDispatch , useSelector} from 'react-redux'
import { getUser } from '../../actions/users';
import { useLocation } from 'react-router-dom';
import TabsProfile from './Tabs';
import { MdVerified } from 'react-icons/md';
import { IconContext } from "react-icons";



const UserProfile = () => {
    
    const dispatch = useDispatch();
    const location = useLocation(); 
    const userprofile = useSelector(state => state.user) ;  
    const user = JSON.parse(localStorage.getItem('profile')) ;

 

    useEffect(() => {
        const currentUrl = window.location.pathname;
        const currentUserId = currentUrl.replace('/users/','');
        dispatch(getUser(currentUserId));
    }, [location, dispatch]);


  return (
    <div className='UserProfile__main'>
        <div className='UserProfile__container__main'>
            <div className='UserProfile__container__main__top'>
                <div className='UserProfile__container__main__top-images'>
                    <div className='UserProfile__container__main__top-images__cover-image'>
                        <span>No cover image is set</span>
                        
                        {userprofile?.result?._id === user?.result?._id && (
                            <Button size='small' variant='contained' color='primary'>Add cover</Button>
                        )}
                    </div>
                    <div className='UserProfile__container__main__top-images__profile-image'>
                        {userprofile?.result?.imageUrl ? <img style={{height:'100px',width:'100px',borderRadius:'8px',objectFit:'contain'}} src={userprofile.result.imageUrl}  alt={userprofile.result.name}/>
                     : <div style={{height:'100px',width:'100px',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'rgb(30, 90, 255)',color:'white',fontSize:'24px'}}>{userprofile?.result?.name.charAt(0)}</div>}
                    </div>
                </div>
                <div className='UserProfile__container__main__top-info'>
                    <div className='UserProfile__container__main__top-info__spacer'></div>
                    <div className='UserProfile__container__main__top-info__info'>
                        <div className='UserProfile__container__main__top-info__info__details'>
                            <div style={{fontSize:'16px',display:'flex',justifyContent:'center',alignItems:'center'}}><b>{userprofile?.result?.name}</b>&nbsp;&nbsp;<span style={{alignItems:'center'}}>{userprofile?.result?.isVerified && <IconContext.Provider  value={{ color: "rgb(30, 90, 255)",size : 20 ,className:'UserProfile__icon'}}><MdVerified /></IconContext.Provider>}</span></div>
                            <span style={{fontSize:'12px'}}>Fullstack Engineer at Google</span>
                            <span style={{fontSize:'12px'}}>Lives in New York</span>
                        </div>
                        <div className='UserProfile__container__main__top-info__info__actions'>
                            {user?.result?._id === userprofile?.result?._id ? (
                            <Button variant='contained' size='small' fullWidth color='primary'>Edit Profile</Button>
                            )
                            :(
                            <Button variant='contained' size='small' fullWidth color='primary'>Follow</Button>)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='UserProfile__container__main__bottom'>
            <TabsProfile connectedUserId = {user?.result?._id || 'none'} profileId={userprofile?.result?._id || 'none'}/>
            </div>
         </div>
         <div className='UserProfile__container__sidebar'>
         </div>   
    </div>
  )
}

export default UserProfile