import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



const StockGraph = ({stockCandle}) => {
  let data = null
  if(stockCandle.c){
    data = stockCandle.c.map((item, index) => ({
      close: Number(item).toFixed(2),
      open: Number(stockCandle.o[index]).toFixed(2),
      timestamp: new Date(stockCandle.t[index] * 1000).toLocaleDateString()
    }))
  }
    return (
      <LineChart width={900} height={500} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis type="number" allowDecimals={true}
          allowDataOverflow={true} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="open" stroke="green" dot={false} />
        <Line type="monotone" dataKey="close" stroke="red" dot={false} />
      </LineChart>
    );
}

export default StockGraph
