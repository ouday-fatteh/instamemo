import React from 'react';
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
    <div  style={{display:'flex',marginTop:'60px',justifyContent:'space-between',width:'100%',height:'90vh'}}>
    <LeftMenu />
    <Posts  isDeleting={isDeleting} setIsDeleting={setIsDeleting} setCurrentId={setCurrentId} currentId={currentId}/>
    <RightMenu />
    </div>
  )
}

export default Home