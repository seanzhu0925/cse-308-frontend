import { Component } from 'react';
import { Card } from 'antd';
import styles from './AppDetailPage.less'
import AppDetail from './AppDetail'




class AppDetailPage extends Component{

    
    


    render(){
        return (<div >
          <div className={styles.cardtitels} style={{ background: '#F3F3F3',width:'95 %' ,margin:'auto'}}>
          <Card title='应用详情'    bordered={false}  >
          <AppDetail/>
      </Card>
    </div>
    
  </div>)
    }
}


export default AppDetailPage;
