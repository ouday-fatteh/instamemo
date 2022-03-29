import Navbar from "./components/Navbar/Navbar";
import Posts from "./components/Posts/Posts";
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getPosts } from './actions/posts';

const App = () => {
    const dispatch = useDispatch();
    useEffect (() => {
        dispatch(getPosts());
    },[dispatch])
    return (
            <div>
                <Navbar />
                <Posts />
            </div>
        );
}

export default App;