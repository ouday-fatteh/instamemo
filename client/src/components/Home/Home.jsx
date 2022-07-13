import React from 'react';
import './Home.css'
import Posts from "../Posts/Posts";
import LeftMenu from '../LeftMenu/LeftMenu';
import RightMenu from '../RightMenu/RightMenu';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';
import axios from 'axios';



const Home = () => {
  const [currentId, setCurrentId] = useStateIfMounted(null);


  const user = JSON.parse(localStorage.getItem('profile'));
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentCountry, setCurrentCountry] = useState('');
  const [currentCountryCode, setCurrentCountryCode] = useState('');
  const history = useHistory();
  const GeoAPIKey = "2dYVW9ItD780RTcI3c3yj3nesYThw7h2";







  const getGeoInfo = () => {
    const res = axios.get(`https://api.ip2loc.com/${GeoAPIKey}/detect`, { 'mode': 'no-cors' });
    res.then(response => {
      setCurrentCountry(response.data.location.country.name);
      setCurrentCountryCode(response.data.location.country.dialing_code[0]);
    })
  };
  getGeoInfo();

  if (!user) history.push('/auth');
  if (currentCountry && currentCountryCode) {
    if (!user.result.hasFinishedSignUp) history.push(`/finishingsignup?u_id=${user.result._id}&hl=${currentCountry}&hc=${currentCountryCode}&redirect=homepage`);
  }


  return (
    <div className='Home__main'>
      <LeftMenu />
      <Posts isDeleting={isDeleting} setIsDeleting={setIsDeleting} setCurrentId={setCurrentId} currentId={currentId} />
      <RightMenu />
    </div>
  )
}

export default Home