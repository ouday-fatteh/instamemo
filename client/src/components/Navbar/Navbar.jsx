import './Navbar.css';
import { HiOutlineHome } from 'react-icons/hi';
import { HiOutlineChat } from 'react-icons/hi';
import { HiOutlineCollection } from 'react-icons/hi';
import { AiOutlineCompass } from 'react-icons/ai';
import { HiOutlineHeart } from 'react-icons/hi';
import { IconContext } from "react-icons";
import PostForm from '../PostForm/PostForm'; 
import { useState } from 'react';
import { VscChromeClose } from 'react-icons/vsc';


const Navbar = () => {
   const [togglePostCr,setTogglePostCr] = useState(false);
    const togglePostCreation = () => {
        setTogglePostCr(!togglePostCr);
    }
    return(
        <div className="Navbar__main">
            <IconContext.Provider  value={{ color: "white",size : 40 ,className: "Navbar__icons"}}>
          <div className='closemodal' style={{display:togglePostCr ? 'block' : 'none'}}><VscChromeClose onClick={() => {togglePostCreation()}}/></div>
          </IconContext.Provider>
            <PostForm clicked={togglePostCr}/>
            <div className="Navbar__logo">
                <h2>Memogram</h2>
            </div>
            <div className="Navbar__search">
                <input type='text' placeholder='Search posts,users ...'></input>
            </div>
            <div className='Navbar__user_menu'>
            <IconContext.Provider value={{ color: "white",size : 30 ,className: "Navbar__icons"}}>
                <div className="Navbar__icon-menu">
                    <HiOutlineHome />
                    <HiOutlineChat />
                    <HiOutlineCollection onClick={()=> {togglePostCreation()}}/>
                    <AiOutlineCompass />
                    <HiOutlineHeart />
                </div>
            </IconContext.Provider>
                <div className="Navbar__user-area">

                </div>
            </div>
        </div>
    );
}


export default Navbar;