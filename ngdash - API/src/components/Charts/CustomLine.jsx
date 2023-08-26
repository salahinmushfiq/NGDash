import React, { PureComponent } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import { data,lineChartData,initialData } from '../../data/dummy';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts"


const CustomLine = ({width,height,ratio}) => {
  const{currentColor,currentMode}=useStateContext();
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-xl dark:text-gray-200 dark:bg-secondary-dark-bg">
      
      <ResponsiveContainer width="95%" aspect={ratio} minWidth={width} minHeight={height}>

        <LineChart
          
          height={300}
          data={initialData}
          margin={{
            top: 5,
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
          <Line type="monotone" dataKey="cost" stroke={currentColor} activeDot={{ r: 8 }} strokeWidth={3}/>
          { <Line type="monotone" dataKey="impresssion" stroke="#82ca9d" /> }
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CustomLine