import React from 'react';
import './Home.css'
import Posts from "../Posts/Posts";
import LeftMenu from '../LeftMenu/LeftMenu';
import RightMenu from '../RightMenu/RightMenu';
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useStateIfMounted } from 'use-state-if-mounted';


const Home = () => {
    const [currentId,setCurrentId] = useStateIfMounted(null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isDeleting,setIsDeleting] = useState(false);
    const history = useHistory();
    if (!user) history.push('/auth');


  
    
  return (
    <div className='Home__main'>
    <LeftMenu />
    <Posts  isDeleting={isDeleting} setIsDeleting={setIsDeleting} setCurrentId={setCurrentId} currentId={currentId}/>
    <RightMenu />
    </div>
  )
}

export default Home