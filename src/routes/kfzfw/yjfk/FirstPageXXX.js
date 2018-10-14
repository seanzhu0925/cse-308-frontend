import { Component } from 'react';
import { Card } from 'antd';
//import FristPageForm from './FirstPageForm'
import styles from './../sjyygl/AppsHistoryPage.less'




class FristPageXXX extends Component{

    
    


    render(){
        return (<div >
         <div className={styles.cardtitel} style={{ background: '#F5F5F5',width:'70%' ,margin:'auto'}}>
      
         <Card title={<div style={{textAlign:'left'}}>意见反馈</div>}
          bordered={false}  style={{ width: '100%' }}>
            <FristPageForm/>
      </Card>
    </div>
    
  </div>)
    }
}


export default FristPageXXX;
