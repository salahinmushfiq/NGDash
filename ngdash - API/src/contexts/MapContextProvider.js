import React, { createContext, useContext, useState } from 'react';

const MapContext= createContext();

export const MapContextProvider = ({ children }) => {
    
    
    const [employees,setEmployees]=useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState({});
    const [selectedMarkerAddress, setSelectedMarkerAddress] = useState({});
    const [showPopUp, setShowPopUp] = useState(false);

    return (
       <MapContext.Provider value={{ 
         employees,
         setEmployees,
         selectedEmployee,
         setSelectedEmployee,
         showPopUp, 
         setShowPopUp,
         selectedMarkerAddress,
         setSelectedMarkerAddress
        }}>
        {children}
       </MapContext.Provider>
    );
  }

  export const useMapContext = () => useContext(MapContext);