import React, { PureComponent } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { data,lineChartData,initialData } from '../../data/dummy';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts"
import {CustomLine, ChartsHeader} from "../../components";
import {Header} from "../../components";
const CustomLineChart = () => {
  const{currentColor,currentMode}=useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      <ChartsHeader category="Line" title="Cost-Impression" />
      <CustomLine   minWidth="320px" height="360px" ratio="2"/>
    </div>
  );
}

export default CustomLineChart