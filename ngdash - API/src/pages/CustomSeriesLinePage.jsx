import React, { PureComponent } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomSeriesLine = ({width,height,ratio}) => {
    const{currentColor,currentMode}=useStateContext();
    const series = [
        {
          name: 'Series 1',
          data: [
            { category: 'A', value: Math.random() },
            { category: 'B', value: Math.random() },
            { category: 'C', value: Math.random() },
          ],
        },
        {
          name: 'Series 2',
          data: [
            { category: 'B', value: Math.random() },
            { category: 'C', value: Math.random() },
            { category: 'D', value: Math.random() },
          ],
        },
        {
          name: 'Series 3',
          data: [
            { category: 'C', value: Math.random() },
            { category: 'D', value: Math.random() },
            { category: 'E', value: Math.random() },
          ],
        },
      ];
    
    return (
       
              <ResponsiveContainer
              minHeight={height}
              minWidth={width}
              aspect={ratio}
               >
                <LineChart width={500} height={300}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" type="category" allowDuplicatedCategory={false} />
                <YAxis dataKey="value" />
                <Tooltip />
                <Legend />
                {series.map((s) => (
                    <Line dataKey="value" data={s.data} name={s.name} key={s.name} stroke={currentColor}/>
                ))}
                </LineChart>
              </ResponsiveContainer>
        
    )
}

export default CustomSeriesLine