import { Component } from 'react';
import { Card } from 'antd';
import styles from './ServiceDetailPage.less'
import ServiceDetail from './ServiceDetail'




class ServiceDetailPage extends Component{

    
    


    render(){
        return (<div >
          <div className={styles.cardtitels} style={{ background: '#F3F3F3',width:'95 %' ,margin:'auto'}}>
          <Card title='服务信息详情'    bordered={false}  >
            <ServiceDetail/>
      </Card>
    </div>
    
  </div>)
    }
}


export default ServiceDetailPage;
