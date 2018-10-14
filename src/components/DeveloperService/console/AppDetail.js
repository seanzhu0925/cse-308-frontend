import { Component } from 'react';

import { Card, Icon, Button, Row, Col, Divider } from 'antd';
import TwoLevelPieChart from './../../../components/DeveloperService/Pie/TwoLevelPieChart'
import SimpleAreaChart from './../../../components/DeveloperService/Line/SimpleAreaChart'
import  styles from './AppDetails.less';

const salesPieData = [{
    item:'dsadas',
    count:24
},{
    item:'dsadass',
    count:25}]

    const data = [{name: `下载`, value: 400}, {name: '卸载', value: 300},
];
const datass = [{name: `评论`, value: 0}, {name: '未评论', value: 300},
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const datas = [
    {name: '23:00', uv: 4000,},
    {name: '06:00', uv: 3000,},
    {name: '11:11', uv: 2000, },
    {name: '16:00', uv: 1223, },
    {name: '21:00', uv: 1890, },
    {name: '24:00', uv: 2390, }
 ,
];

class AppDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            timebuttion : ['primary','',''],
            timebuttionbypl:['primary','',''],
            activeIndex: 0,
        }
    }
    
    onPieEnter(data, index) {
        this.setState({
          activeIndex: index,
        });
      }

    
    handleButtonTime(a){
        let {timebuttion} = this.state;
        for (let i=0;i <timebuttion.length;i++){
            if (i==a){
                timebuttion[i] ='primary';
            }else{
                timebuttion[i] = '';
            }
        }

        this.setState({
            timebuttion: timebuttion,
        })
    }
    handleButtonTimeBypl(a){
        let {timebuttionbypl} = this.state;
        for (let i=0;i <timebuttionbypl.length;i++){
            if (i==a){
                timebuttionbypl[i] ='primary';
            }else{
                timebuttionbypl[i] = '';
            }
        }

        this.setState({
            timebuttionbypl: timebuttionbypl,
        })
    }
    
    render(){
    let {timebuttion,timebuttionbypl} = this.state;
    return (<div>
            <Row gutter={16}>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card title={<div style={{fontSize:'1.2em'}} ><Icon type="download" style={{fontWeight:'bold'}} />应用下载</div>}
            extra={<div><Button type={timebuttion[0]} icon="calendar" onClick={this.handleButtonTime.bind(this,0)}>今日</Button>&nbsp;
            <Button  type={timebuttion[1]} onClick={this.handleButtonTime.bind(this,1)} icon="calendar">过去一周</Button>&nbsp;
            <Button type={timebuttion[2]} onClick={this.handleButtonTime.bind(this,2)} icon="calendar">过去一月</Button></div>}
            >
            
            <Row gutter={16}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <li style={{fontWeight:'bold'}}>今日下载量</li>   
            <li style={{fontWeight:'bold'}}>0</li>
            <Divider/>
            <li style={{fontWeight:'bold'}}>今日卸载量</li>   
            <li style={{fontWeight:'bold'}}>0</li>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <div className={styles.container}>
              <TwoLevelPieChart data={data} COLORS={COLORS}/>
            
              </div>
             
            </Col>
           
            </Row>
            <Divider/>
            <div style={{width:'100%'}}>
            <SimpleAreaChart title="今日下载量-趋势图" data={datas}/>
            </div>
            </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24} >  
            <Card title={<div style={{fontSize:'1.2em'}} ><Icon type="android" style={{fontWeight:'bold'}} />应用评论</div>}
            extra={<div><Button icon="calendar" type={timebuttionbypl[0]} onClick={this.handleButtonTimeBypl.bind(this,0)}>今日</Button>&nbsp;
            <Button type={timebuttionbypl[1]} onClick={this.handleButtonTimeBypl.bind(this,1)} icon="calendar">过去一周</Button>&nbsp;
            <Button type={timebuttionbypl[2]} onClick={this.handleButtonTimeBypl.bind(this,2)} icon="calendar">过去一月</Button></div>}
            >
            <Row gutter={16}>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <li style={{fontWeight:'bold'}}>今日评论量</li>   
            <li style={{fontWeight:'bold'}}>0</li>
            <Divider/>
            <li style={{fontWeight:'bold'}}>今日应用最高分 注:最高分位5</li>   
            <li style={{fontWeight:'bold'}}>5</li>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24} >
            <div className={styles.container}>
              <TwoLevelPieChart data={datass} COLORS={COLORS}/>
            
              </div>
             
            </Col>
           
            </Row>
            <Divider/>
            <div style={{width:'100%'}}>
            <SimpleAreaChart title="今日评论量-趋势图" data={datas}/>
            </div>   
            </Card>
                </Col>
            </Row>
        </div>)
    
}
}
export default AppDetail;