import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getPosts } from './actions/posts';

const App = () => {
    const [currentId,setCurrentId] = useState(null);
    const dispatch = useDispatch();
    useEffect (() => {
        dispatch(getPosts());
    },[currentId,dispatch]);
    return (
            <div>
                <Navbar/>
                <Posts  setCurrentId={setCurrentId} currentId={currentId}/>
            </div>
        );
}

export default App;