import { Component } from 'react';
import { Card } from 'antd';
import styles from './CreatServicePage.less'
import CreatService from './CreatService'




class CreatServicePage extends Component{

    
    


    render(){
        return (<div >
          <div className={styles.cardtitels} style={{ background: '#F3F3F3',width:'95 %' ,margin:'auto'}}>
          <Card title='服务创建'    bordered={false}  >
           <CreatService/>
      </Card>
    </div>
    
  </div>)
    }
}


export default CreatServicePage;
