import React , { useState } from 'react';
import './Auth.css';
import { TextField , InputAdornment, IconButton , Button} from '@material-ui/core';
import Typography from '@mui/material/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { RiLockLine } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import GoogleLogin from 'react-google-login';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import axios from 'axios';


const initialState = { firstName:'',lastName:'',email:'',password:'',confirmPassword:'' };

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup , setIsSignup ]= useState(false);
    const [formData , setFormData] = useState(initialState);
    const [currentCountry,setCurrentCountry] = useState('');
    const [currentCountryCode,setCurrentCountryCode] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'));
    const GeoAPIKey = "2dYVW9ItD780RTcI3c3yj3nesYThw7h2";
    if (user) history.push('/');

    const getGeoInfo = () => {
        const res = axios.get(`https://api.ip2loc.com/${GeoAPIKey}/detect`,{ 'mode': 'no-cors' });
        res.then(response => {
          setCurrentCountry(response.data.location.country.name);
          setCurrentCountryCode(response.data.location.country.dialing_code[0]);
        })
      };
      getGeoInfo();

   const inputprops = {
    endAdornment: (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </InputAdornment>
    ),
   }
   
  


   const handleSubmit = (e) => {
       e.preventDefault();
       const geoLocation = {
            country: currentCountry,
            countryCode: currentCountryCode
         }
       if(isSignup){
           dispatch(signup(formData,history,geoLocation));
       }else{
           dispatch(signin(formData,history));
       }

   }

   const handleChange = (e) => {
         setFormData({...formData,[e.target.name]:e.target.value});
   }

   const switchMode = () => {
        setIsSignup(!isSignup);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:'AUTH',payload:{token,result}});
            history.push('/');
        } catch (error) {
            console.log(error)
        }
    };

    const googleFailure = () => {
        console.log('Google sign in failed !');
    };

  return (
      <div className="Auth">
    <div className='Auth__main'>
    <form className='Auth__form' onSubmit={(e) => handleSubmit(e)}>
        <IconContext.Provider value={{ color: 'rgb(30, 90, 255)', size: '3em' }}>
                <RiLockLine className='Auth__icon'/>
        </IconContext.Provider>
        <Typography variant='h6'>{!isSignup ? 'Sign In' : 'Signup'}</Typography>
        {isSignup && (
            <div style={{display:'flex',flexDirection:'row',gap:'0.5rem'}}>
            <TextField name = 'firstName' label = 'First name' onChange = {handleChange} variant = 'outlined' style={{width:'50%'}} required autoFocus/>
            <TextField name = 'lastName' label = 'Last name' onChange = {handleChange} variant = 'outlined' style={{width:'50%'}} required />
            </div>          
        )}
        <TextField name='email' style ={{width: '100%'}} label='Email' type='email' onChange={handleChange} variant = 'outlined'  required autoFocus />
        <TextField name='password' style ={{width: '100%'}} label='Password' type={showPassword ? 'text' : 'password'} onChange={handleChange}  required variant='outlined' 
        InputProps =  {inputprops}/>
        {isSignup && (
        <TextField name='confirmPassword' style ={{width: '100%' }} label='Confirm Password' type={showPassword ? 'text' : 'password'} onChange={handleChange}  required variant='outlined'/>
        )}
        <div className='Auth__form__button' style={{dipslay:'flex', flexDirection:'column',width:'100%' , justifyContent:"space-between"}}>
            <Button color='primary' variant='contained' style ={{width: '100%'}} type='submit'>{!isSignup ? 'Sign In' : 'Signup'}</Button>
            <span style={{marginTop:'10px',display:'flex',justifyContent:'center',alignItems:'center'}}>Or</span>
            <GoogleLogin 
            clientId = "273965597391-b6p2rermpbll5hr1vgvd7bm1lkq291g5.apps.googleusercontent.com"
            render = {(renderProps) => (
            <Button  color='primary' style={{width:'100%',marginTop:'10px'}} onClick={renderProps.onClick}  disabled={renderProps.disabled}  startIcon={<Icon />}  variant='contained'>
                Sign in with Google
            </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
            />
        </div>
        <div>
            <Typography variant='body2' className='Auth__form__switch'>
                {!isSignup ? 'Don\'t have an account ? ' : 'Already have an account ? '}
                <span  style={{cursor:'pointer', color:'rgb(30, 90, 255)'}} className='Auth__form__switch__link' onClick={switchMode}>{!isSignup ? 'Signup' : 'Signin'}</span>
            </Typography>
        </div>
    </form>     
        </div>
    </div>
  )
}

export default Auth;