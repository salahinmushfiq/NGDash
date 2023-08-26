import React from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import {Header} from "..";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data,lineChartData,initialData,new_area_chart_data } from '../../data/dummy';

const CustomStacked = ({ width, height,ratio }) => {
  const{currentColor,currentMode}=useStateContext();

  return (
    <div className=" bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
    
      <ResponsiveContainer
       width="95%" aspect={ratio}
       minHeight={height}
       minWidth={width}
      >
      <BarChart
        data={new_area_chart_data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
        <Bar dataKey="uv" fill="#ffc658" />
      </BarChart>
      </ResponsiveContainer>
  </div>
  );
};

export default CustomStacked