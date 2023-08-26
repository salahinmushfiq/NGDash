import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
// const MapContext = createContext();
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
}

export const ContextProvider = ({ children }) => {

  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor,setCurrentColor] = useState("#1A97F5");
  const [currentMode,setCurrentMode] = useState("Dark");
  const [themeSettings,setThemeSettings] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick=(clicked)=>{
    setIsClicked({...initialState,[clicked]:true});
  };





  const [currentUser,setCurrentUser] = useState({});
  const [users,setUsers]=useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedLocation,setSelectedLocation]=useState([]);


  return (
    
    <StateContext.Provider value={{ 
        activeMenu, 
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        themeSettings,
        setThemeSettings,
        currentColor, 
        currentMode,
        setCurrentMode,
        setMode,
        setColor
      }}>
      {children}
    </StateContext.Provider>
     

    
    
    
  );
}

export const useStateContext = () => useContext(StateContext);
// export const useMapContext = () => useContext(MapContext);