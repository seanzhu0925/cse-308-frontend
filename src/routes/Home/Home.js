import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import styles from './Home.less';
import NewestApp from '../../components/Home/NewestApp';
import Summary from '../../components/Home/Summary';
import Approval from '../../components/Home/Approval';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const appData = [
    {
        icon:'http://oqhz9kd1w.bkt.clouddn.com/FvW0J5FBJ10TgMui7sRsHQhu8AJB',
        name:'境外人员管理',
        date:'2018-03-21'
    },
    {
        icon:'http://oqhz9kd1w.bkt.clouddn.com/Fl9kNqoblJweNGmzHION5YArMxJT',
        name:'境外人员管理',
        date:'2018-03-21'
    },{
        icon:'http://oqhz9kd1w.bkt.clouddn.com/FiYxBWdA_85C53ISNB3mF64FJIGH',
        name:'境外人员管理',
        date:'2018-03-21'
    },{
        icon:'http://oqhz9kd1w.bkt.clouddn.com/FrpujiCfr6-1Wm7daLAQSwRNO_Lp',
        name:'境外人员管理',
        date:'2018-03-21'
    }
]

const summaryData = {
    spz: 7,
    ysj: 88,
    yxj: 12
}

// @connect(({ chart, loading }) => ({
//   chart,
//   loading: loading.effects['chart/fetch'],
// }))
export default class Home extends Component {
  state = {
  };

//   componentDidMount() {
//     this.props.dispatch({
//       type: 'chart/fetch',
//     });
//   }

//   componentWillUnmount() {
//     const { dispatch } = this.props;
//     dispatch({
//       type: 'chart/clear',
//     });
//   }

  render() {
    return (
      <div className={styles.container}>
        <div style={{ background: '#FFF', padding: 30, paddingBottom:10, display:'flex', flexDirection:'row' }}>
            <div style={{ flex:4 }}>
                <NewestApp data={ appData }/>
            </div>
            <div style={{ flex:3,marginLeft:20 }}>
                <Summary data={summaryData}/>
            </div>
        </div>
        <div style={{ background: '#FFF', paddingTop: 0,paddingLeft:30,paddingRight:30, paddingBottom:'30px',display:'flex',flexDirection:'row' }}>
            <div style={{ flex:4 }}>
                <Approval />
            </div>
            <div style={{ flex:3,marginLeft:20 }}>
                <Card title="近6个月增长变化" style={{ width: '100%' }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        </div>
      </div>
    );
  }
}
