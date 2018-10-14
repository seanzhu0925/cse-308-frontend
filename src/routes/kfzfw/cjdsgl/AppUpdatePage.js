import { Component } from 'react';
import { Card } from 'antd';
import AppUpdate from './AppUpdate';
import styles from './AppUpdatePage.less'

class AppUpdatePage extends Component{
    constructor(props){
        super(props)
    }

    render(){

        return (<div>
            <div className={styles.cardtitels} style={{ background: '#F3F3F3',width:'95 %' ,margin:'auto'}}>
            <Card title='应用修改'    bordered={false}  >
                    <AppUpdate/>
            </Card>
            </div>
            </div>)
    }

}

export default AppUpdatePage;