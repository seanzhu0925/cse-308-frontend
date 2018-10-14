import { Card } from 'antd';
import AppUpdateInfoForm from './../sjyygl/AppUpdateInfoForm';
import styles from './../sjyygl/AppsHistoryPage.less'
import { connect } from 'dva';




@connect(({ applist, loading }) => {
    
  return {
    applist,
      loading: loading.effects['applist/queryshistorydetail'],
  }
})
class AppUpdateInfo extends React.Component {

  
  /*componentDidMount(){
    console.log("pp")
     this.props.dispatch({
       type:'applist/queryshistorydetail',
       ...this.props.param.row.id
     })
  }*/
  

  render() {
    return (
    <div >
      <div className={styles.cardtitel} style={{ background: '#F5F5F5',width:'70%' ,margin:'auto'}}>
      
      <Card title={<div style={{textAlign:'left'}}>应用信息修改</div>} bordered={false}  style={{ width: '100%' }}>
      
        <AppUpdateInfoForm /*datasource = {this.props.applist.applist.detailapp}*/ />
      </Card>
    </div>
    
  </div>
    );
  }
}

export default AppUpdateInfo;