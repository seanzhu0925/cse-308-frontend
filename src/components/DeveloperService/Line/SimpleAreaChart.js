import { Component } from 'react';
import  {LineChart, Line,  XAxis, YAxis, CartesianGrid, Tooltip} from  'recharts';


  class SimpleAreaChart extends Component{
	render () {
    const {title='',data=[]} = this.props;
  	return (
    	<div>
      	<h4 style={{textAlign:'center'}}>{title}</h4>
        <LineChart width={420} height={200} data={data} syncId="anyId"
              margin={{top: 10, right: 10, left: 0, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Line type='monotone' dataKey='uv' stroke='#8884d8' fill='#8884d8' />
        </LineChart>
      </div>
    );
  }
}


export default SimpleAreaChart;
