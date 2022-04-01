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


const Navbar = (currentId , setCurrentId) => {
   const [togglePostCr,setTogglePostCr] = useState(false);
    const togglePostCreation = () => {
        setTogglePostCr(!togglePostCr);
    }
    const handlepostclick = (value) => {
        setTogglePostCr(value);
    }
    return(
        <div className="Navbar__main">
            <IconContext.Provider  value={{ color: "black",size : 40 ,className: "Navbar__icons"}}>
          <div className='closemodal' style={{display:togglePostCr ? 'white' : 'none'}}><VscChromeClose onClick={() => {togglePostCreation()}}/></div>
          </IconContext.Provider>
            <PostForm componentNature='nav'  handlepostclick={handlepostclick} clicked={togglePostCr}/>
            {/*------------Logo----------*/}
            <div className="Navbar__logo">
                <h2>Memogram</h2>
            </div>
            {/*------------Search----------*/}
            <div className="Navbar__search">
                <input type='text' placeholder='Search posts,users ...'></input>
            </div>
            {/*------------Menu including user----------*/}
            <div className='Navbar__right'>
            <div className='Navbar__user_menu'>
                <div className="Navbar__icon-menu">
                    <IconContext.Provider value={{ color: "white",size : 18 }}>
                        <div className='Navbar__icon-create'onClick={()=> {togglePostCreation()}}>
                            <HiOutlineCollection />
                            <div>Create</div>
                        </div>
                    </IconContext.Provider>
                    <IconContext.Provider value={{ color: "rgb(60, 60, 60)",size : 25 ,className: "Navbar__icons"}}>
                        <HiOutlineHome />
                        <HiOutlineChat />
                        <AiOutlineCompass />
                        <HiOutlineHeart />
                    </IconContext.Provider>
                </div>
            </div>
            <div className="Navbar__user-area">

            </div>
            </div>
        </div>
    );
}


export default Navbar;