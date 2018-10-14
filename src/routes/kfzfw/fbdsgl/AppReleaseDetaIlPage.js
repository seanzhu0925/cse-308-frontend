import { Component } from 'react';
import { Card,Steps } from 'antd';
import styles from './AppReleaseDetaIlPage.less'
import AppReleaseDetail from './AppReleaseDatail'

const Step = Steps.Step;
class AppReleaseDetaIlPage extends Component{
    constructor(props){
        super(props)
    }


    render(){

        return (<div>
            <div className={styles.cardtitels} style={{ background: '#F3F3F3',width:'95 %' ,margin:'auto'}}>
            <Card title='应用详情'    bordered={false}  >
                <AppReleaseDetail/>
            </Card>
            </div>
            </div>)
    }

}

export default AppReleaseDetaIlPage;