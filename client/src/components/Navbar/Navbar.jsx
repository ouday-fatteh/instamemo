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
import { Menu, Dropdown, message } from 'antd';
import {  UserOutlined } from '@ant-design/icons';
import { RiSettings3Line } from 'react-icons/ri';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { BsMoon } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';

const Navbar = (currentId , setCurrentId) => {
   const [togglePostCr,setTogglePostCr] = useState(false);
    const togglePostCreation = () => {
        setTogglePostCr(!togglePostCr);
    }
    const handlepostclick = (value) => {
        setTogglePostCr(value);
    }

    function handleButtonClick(e) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      
      function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
      }

    const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="2" icon={<RiSettings3Line />}>
            Settings
          </Menu.Item>
          <Menu.Item key="3" icon={<MdOutlineHelpOutline />}>
            Help & support
          </Menu.Item>
          <Menu.Item key="4" icon={<BsMoon />}>
            Display & accessibility
          </Menu.Item>
          <Menu.Item key="5" icon={<BiLogOutCircle />}>
            Logout
          </Menu.Item>
        </Menu>
      );

    return(
        <div id="Navbar__main" className="Navbar__main">
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
            <Dropdown getPopupContainer={() => document.getElementById('Navbar__main')} overlay={menu} trigger={['click']}>
            <div className="Navbar__user-area" >

            </div>
            </Dropdown>
            </div>
        </div>
    );
}


export default Navbar;