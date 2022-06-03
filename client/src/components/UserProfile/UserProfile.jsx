import  { useEffect , useState} from 'react'
import './UserProfile.css'
import { Button } from '@mui/material'
import { useDispatch , useSelector} from 'react-redux'
import { getUser } from '../../actions/users';
import { useLocation } from 'react-router-dom';
import TabsProfile from './Tabs';
import { MdVerified } from 'react-icons/md';
import { IconContext } from "react-icons";
import { message } from 'antd';
import { followUser , unfollowUser} from '../../actions/users';


const UserProfile = () => {
    
    const dispatch = useDispatch();
    const location = useLocation(); 
    const userprofile = useSelector(state => state.user.user) ; 
    const user = JSON.parse(localStorage.getItem('profile')) ;
    const [isFollowing, setIsFollowing] = useState(userprofile?.result?.followers.includes(user?.result._id));
    
    const currentUrl = window.location.pathname;
    const currentUserId = currentUrl.replace('/users/','');
 

    useEffect(() => {
        dispatch(getUser(currentUserId));
        
    }, [location, dispatch,currentUserId,isFollowing]);
    
    const country = userprofile?.result?.country ;
    const user_first_name = userprofile?.result?.name.substring(0, userprofile?.result?.name.indexOf(' '));
    const handleFollow = () => {
        if (!isFollowing) {
        message.success(`You are now following ${user_first_name}`);
        setIsFollowing(true);
        dispatch(followUser(currentUserId,user?.result?._id));
        
        } else {
        message.success(`You are no longer following ${user_first_name}`);
        setIsFollowing(false);
        dispatch(unfollowUser(currentUserId,user?.result?._id));
        }
    }



    

  return (
    <div className='UserProfile__main'>
        <div className='UserProfile__container__main'>
            <div className='UserProfile__container__main__top'>
                <div className='UserProfile__container__main__top-images'>

                {(!userprofile || currentUserId !== userprofile?.result?._id) ? <div className='UserProfile__container__main__top-images__cover-image__loader'></div> :
                    <div className='UserProfile__container__main__top-images__cover-image'
                    style={{display: !userprofile?.result?.coverImage ? 'flex' : 'block', justifyContent: 'center', alignItems: 'center'}}>
                       
                        { !userprofile?.result?.coverImage ? <span>No cover image is set</span>
                        : <img style={{width:'100%' , height:'100%',objectFit:'cover'}} src={userprofile?.result.coverImage} alt='cover' />
                        }

                    
                        {userprofile?.result?._id === user?.result?._id && !userprofile?.result.coverImage && 
                        <div className='UserProfile__container__main__top-images__cover-image--overlay'>
                            <Button style={{marginBottom:'10px',marginRight:'10px'}} size='small' variant='contained' color='primary'>Add cover</Button>
                        </div>
                        }

                        {userprofile?.result?._id === user?.result?._id && userprofile?.result?.coverImage &&(
                            <div className='UserProfile__container__main__top-images__cover-image--overlay'>
                            <Button style={{marginBottom:'10px',marginRight:'10px'}} size='small' variant='contained' color='primary'>Change cover</Button>
                            </div>
                        )}
                        
                    </div>}
                    {(!userprofile || currentUserId !== userprofile?.result?._id) ?
                    <div className='UserProfile__container__main__top-images__profile-image__loader'></div> :
                    <div className='UserProfile__container__main__top-images__profile-image'>
                        {userprofile?.result?.imageUrl ? <img style={{height:'100px',width:'100px',borderRadius:'8px',objectFit:'contain'}} src={userprofile.result.imageUrl}  alt={userprofile.result.name}/>
                     : <div style={{height:'100px',width:'100px',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'rgb(30, 90, 255)',color:'white',fontSize:'24px'}}>{userprofile?.result?.name.charAt(0)}</div>}
                    </div>
                    }
                </div>
                <div className='UserProfile__container__main__top-info'>
                    <div className='UserProfile__container__main__top-info__spacer'></div>
                    <div className='UserProfile__container__main__top-info__info'>
                        <div className='UserProfile__container__main__top-info__info__details'>
                        {(!userprofile || currentUserId !== userprofile?.result?._id) ? <div className='UserProfile__container__main__top-info__info__details__name__loader'></div> :
                            <div style={{fontSize:'16px',display:'flex',justifyContent:'center',alignItems:'center'}}><b>{userprofile?.result?.name}</b>&nbsp;&nbsp;<span style={{alignItems:'center'}}>{userprofile?.result?.isVerified && <IconContext.Provider  value={{ color: "rgb(30, 90, 255)",size : 20 ,className:'UserProfile__icon'}}><MdVerified /></IconContext.Provider>}</span></div>
                        }
                        {(!userprofile || currentUserId !== userprofile?.result?._id) ? <div className='UserProfile__container__main__top-info__info__details__username__loader'></div> :
                            <span style={{fontSize:'12px'}}>Fullstack Engineer at Google</span>
                        }
                        {(!userprofile || currentUserId !== userprofile?.result?._id) ? <div className='UserProfile__container__main__top-info__info__details__country__loader'></div> :
                            <span style={{fontSize:'12px'}}>Lives in {country}</span>
                       }
                        </div>
                        {(!userprofile || currentUserId !== userprofile?.result?._id) ? <div className='UserProfile__container__main__top-info__info__actions'>
                        <Button variant='contained' size='small' disabled fullWidth color='primary'>Loading</Button>
                        </div> :
                        
                        <div className='UserProfile__container__main__top-info__info__actions'>
                            {user?.result?._id === userprofile?.result?._id ? (
                            <Button variant='contained' size='small' fullWidth color='primary'>Edit Profile</Button>
                            )
                            :(
                            <Button variant='contained' size='small' onClick={handleFollow} fullWidth color='primary'>{isFollowing ? 'Unfollow' : 'Follow'}</Button>)}
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className='UserProfile__container__main__bottom'>
            <TabsProfile User={userprofile} connectedUserId = {user?.result?._id || 'none'} profileId={userprofile?.result?._id || 'none'}/>
            </div>
         </div>
         <div className='UserProfile__container__sidebar'>
         </div>   
    </div>
  )
}

export default UserProfile