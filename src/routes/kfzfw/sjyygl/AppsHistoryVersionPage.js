import { Card } from 'antd';
import AppshistoryVersionDetail from './../sjyygl/AppshistoryVersionDetail';
import styles from './../sjyygl/AppsHistoryPage.less'
import { connect } from 'dva';



const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

@connect(({ applist, loading }) => {
    
  return {
    applist,
      loading: loading.effects['applist/queryshistorydetail'],
  }
})
class AppsHistoryVersionPage extends React.Component {

  
  componentDidMount(){
    console.log("pp")
     this.props.dispatch({
       type:'applist/queryshistorydetail',
       ...this.props.param.row.id
     })
  }
  

  render() {
    return (
    <div >
      <div className={styles.cardtitel} style={{ background: '#F5F5F5',width:'70%' ,margin:'auto'}}>
      
      <Card title={<div style={{textAlign:'left'}}>终端资源</div>} bordered={false}  style={{ width: '100%' }}>
      
        <AppshistoryVersionDetail datasource = {this.props.applist.applist.detailapp} />
      </Card>
    </div>
    
  </div>
    );
  }
}

export default AppsHistoryVersionPage;