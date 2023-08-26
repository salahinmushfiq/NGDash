import React from 'react';


import { useStateContext } from '../../contexts/ContextProvider';
import {Header,CustomStacked, ChartsHeader} from "../../components";
const Stacked = () => {
  const{currentColor,currentMode}=useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      <ChartsHeader category="Stacked" title="Revenue" />
      <CustomStacked  minWidth="320px" height="360px" ratio="2"/>
    </div>
  );
}

export default Stacked