import React, {useEffect, useState} from 'react';
import { AiOutlineMenu,AiOutlineUserAdd ,AiOutlineSetting} from 'react-icons/ai';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdPersonOutline } from 'react-icons/md';
import Box from '@mui/material/Box';
import {Cart,Chat,Notification,UserProfile} from '.';
import { useStateContext } from '../contexts/ContextProvider';

import { IconButton,Typography,Tooltip,MenuItem,ListItemIcon, Menu, Divider} from '@mui/material';

const Navbar = () => {
 
  const {activeMenu,setActiveMenu,isClicked,setIsClicked,handleClick,screenSize,setScreenSize,currentColor}=useStateContext();
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
        const handleResize=()=>setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return ()=>window.removeEventListener('resize', handleResize);
    },[]);
  
  useEffect(()=>{
    if(screenSize<=900){
      setActiveMenu(false);
    }
    else{
      setActiveMenu(true);
    }
  },[screenSize]);


   
  const open = Boolean(anchorEl);
  const handleNavClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const NavButton=({title,customFunc,icon,color,dotColor})=>(
    <div>
       <button type="button" onClick={customFunc} style={{color}} className="relative text-xl rounded-full p-3">
        <span style={{background:dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
          {icon}
       </button>
    </div>
    // <TooltipComponent content={title} position={'BottomCenter'}>
       
    //     <button type="button" onClick={customFunc} style={{color}} className="relative text-xl rounded-full p-3">
    //       <span style={{background:dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
    //       {icon}
          
    //     </button>
    // </TooltipComponent>
  )
  return (
    <div className='flex justify-between p-2 px-6 md:mx-0 relative drop-shadow-xl dark:text-gray-200 dark:bg-secondary-dark-bg'>
       <NavButton 
        title="Menu" 
        customFunc={()=>setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}
        color={currentColor}
        icon={<AiOutlineMenu/>}
        />

        <div className='flex'>
        <NavButton 
        title="cart" 
        customFunc={()=>handleClick('cart')}
        color={currentColor}
        icon={<FiShoppingCart/>}
        />
        </div>
        <div className='flex'>

        <NavButton 
        title="chat" 
        dotColor={currentColor}
        customFunc={()=>handleClick('chat')}
        color={currentColor}
        icon={<BsChatLeft/>}
        />
        </div>

        <div className='flex'>
        <NavButton 
        title="notification" 
        dotColor={currentColor}
        customFunc={()=>handleClick('notification')}
        color={currentColor}
        icon={<RiNotification3Line/>}
        />
        </div>
        {/* <TooltipComponent content={"profile"} position={'BottomCenter'}>
            <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg' 
            onClick={
              ()=> handleClick('profile')}
              >
                <img src={avatar} className="rounded-full w-8 h-8"/>
                <p>
                  <span className='text-gray-400 text-14'>Hi, </span>{' '}
                  <span className='text-gray-400 font-bold ml-1 text-14'>Wall-E</span>
                </p>
                <MdKeyboardArrowDown className='text-gray-400 text-14'/>
              </div>
        </TooltipComponent> */}
        <div>
        <>
        
         <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          
          <Tooltip title="Account settings" className='dark:text-gray-200 dark:bg-secondary-dark-bg' >
            <IconButton
              onClick={handleNavClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={ open ? 'account-menu' : undefined }
              aria-haspopup="true"
              aria-expanded={ open ? 'true' : undefined }
              
            >
              <MdPersonOutline fontSize={26} color={currentColor}>M</MdPersonOutline>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.8,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
              
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
          
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <MdPersonOutline color={currentColor}/> <p className="ml-5">Profile</p>
        </MenuItem>
        <MenuItem>
          <MdPersonOutline color={currentColor}/><p className="ml-5">My account</p> 
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <AiOutlineUserAdd  color={currentColor}/>
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <AiOutlineSetting fontSize="small" color={currentColor}/>
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FiLogOut fontSize="small"  color={currentColor}/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      </>
        {isClicked.cart && <Cart/>}
        {isClicked.chat && <Chat/>}
        {isClicked.user && <UserProfile/>}
        {isClicked.notification && <Notification/>}
        </div>
    </div>
  )
}

export default Navbar