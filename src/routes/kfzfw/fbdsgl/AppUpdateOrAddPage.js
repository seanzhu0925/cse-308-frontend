import { Component } from 'react';
import { Card,Steps } from 'antd';
import styles from './AppUpdateOrAddPage.less'
import AppUpdateOrAdd from './AppUpdateOrAdd'

const Step = Steps.Step;

class AppUpdateOrAddPage extends Component{
    constructor(props){
        super(props)
        this.state={
            current : 0,
        }
    }

    handerTitel(){
    let {requeststate}  = this.props.param.row;
    if (requeststate == '未发布审核'){
        return '发布申请';
    }else{
        return '修改发布申请';
    }
       
    }



    render(){

        return (<div>
            <div className={styles.cardtitels} style={{ background: '#F3F3F3',width:'95 %' ,margin:'auto'}}>
            <Card title={this.handerTitel()}    bordered={false}  >
            <div style={{width:'70%',margin:'auto'}}>
             <Steps current={this.state.current} >
                <Step  title={`1.发布信息填写(${this.handerTitel()})`}/>
                <Step  title='2.审核中'/>
                <Step  title='3.完成'/>
            </Steps>    
            </div>
            <div className='formcontent' style={{width:'80%',margin:'auto',marginTop:'2%'}}>
                <AppUpdateOrAdd/>
            </div>
            </Card>
            </div>
            </div>)
    }

}

export default AppUpdateOrAddPage; 