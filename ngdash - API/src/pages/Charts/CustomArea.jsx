import React, { PureComponent } from 'react'

import { useStateContext } from '../../contexts/ContextProvider';
import {Header} from "../../components";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {CustomLine, ChartsHeader} from "../../components";
import { data,lineChartData, new_area_chart_data } from '../../data/dummy';
const CustomArea = () => {
  const{currentColor,currentMode}=useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      <ChartsHeader category="Area" title="Revenue" />
      <ResponsiveContainer  width="95%" aspect={4}>
        <AreaChart
         
          height={400}
          data={new_area_chart_data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke={currentColor} fill={currentColor} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomArea