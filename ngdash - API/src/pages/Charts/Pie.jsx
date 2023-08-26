import React from 'react'

import { useStateContext } from '../../contexts/ContextProvider';
import {Header} from "../../components";
const Pie = () => {
  const{currentColor,currentMode}=useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      <Header category="Page" title="Pie" />
    </div>
  );
}

export default Pie