import React from 'react';
import Posts from "../Posts/Posts";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getPosts } from '../../actions/posts';

const Home = () => {
    const [currentId,setCurrentId] = useState(null);
    const [isDeleting,setIsDeleting] = useState(false);
    const dispatch = useDispatch();
    useEffect (() => {
        dispatch(getPosts());
    },[currentId,dispatch]);
  return (
    <Posts 
    isDeleting={isDeleting} 
    setIsDeleting={setIsDeleting} 
    setCurrentId={setCurrentId} 
    currentId={currentId}
    />
  )
}

export default Home