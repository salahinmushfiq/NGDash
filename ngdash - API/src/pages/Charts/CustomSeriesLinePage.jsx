import React from 'react'
import { CustomSeriesLine } from '../../components';
import {CustomLine, ChartsHeader} from "../../components";
const CustomSeriesLinePage = () => {
  return (
    
    <div  className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      <ChartsHeader category="Line" title="Revenue" />
      <CustomSeriesLine  width="320px" height="360px" ratio="2"/>
    </div>
  )
}

export default CustomSeriesLinePage
