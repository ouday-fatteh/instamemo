import React, { useEffect } from 'react'
import './UserProfile.css'
import { Button } from '@mui/material'
import { useDispatch , useSelector} from 'react-redux'
import { getUser } from '../../actions/users';
import { useLocation } from 'react-router-dom';


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
    console.log(userprofile);

  return (
    <div className='UserProfile__main'>
        <div className='UserProfile__container__main'>
            <div className='UserProfile__container__main__top'>
                <div className='UserProfile__container__main__top-images'>
                    <div className='UserProfile__container__main__top-images__cover-image'>No cover image is set</div>
                    <div className='UserProfile__container__main__top-images__profile-image'>
                        {userprofile?.result?.imageUrl ? <img style={{height:'100px',width:'100px',borderRadius:'8px',objectFit:'contain'}} src={userprofile.result.imageUrl}  alt={userprofile.result.name}/>
                     : <div style={{height:'100px',width:'100px',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'rgb(30, 90, 255)',color:'white',fontSize:'24px'}}>{userprofile?.result?.name.charAt(0)}</div>}
                    </div>
                </div>
                <div className='UserProfile__container__main__top-info'>
                    <div className='UserProfile__container__main__top-info__spacer'></div>
                    <div className='UserProfile__container__main__top-info__info'>
                        <div className='UserProfile__container__main__top-info__info__details'>
                            <span style={{fontSize:'16px'}}><b>{userprofile?.result?.name}</b></span>
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
            <div className='UserProfile__container__main__bottom'></div>
         </div>
         <div className='UserProfile__container__sidebar'>
         </div>   
    </div>
  )
}

export default UserProfile