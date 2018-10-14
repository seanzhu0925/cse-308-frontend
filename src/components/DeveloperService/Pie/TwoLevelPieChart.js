
import  {Component} from 'react';
import   {PieChart, Pie, Sector, Cell} from 'recharts';


const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const baifenbi = (percent*100).toString();

  const percents = baifenbi.length >=4 ? baifenbi.substring(0,5) : baifenbi;

  return (
    <g>
      <text x={cx} y={cy} dy={8} width={30} textAnchor="middle" fill={fill}> {payload.name}率&nbsp;<br/>{percents}%</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        
      />  
     
    </g>
  );
};

class TwoLevelPieChart extends Component{
    state={
      activeIndex: 0,
    }
    
  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }
	render () {
    let {COLORS,data=[]} = this.props;
  	return (
    	<PieChart width={300} height={200}>
        <Pie 
         
         
        	activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape} 
          data={data} 
          cx={120}
          cy={100} 
          innerRadius={60}
          outerRadius={80} 
          fill="#8884d8"
          onMouseEnter={this.onPieEnter.bind(this)}
        >
        {
          data.map((entry, index) => <Cell   fill={COLORS[index % COLORS.length]}/>)
        }
        </Pie>
       </PieChart>
    );
  }
}
export default TwoLevelPieChart;
