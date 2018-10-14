import { Component } from 'react';
import { Steps } from 'antd';

const Step = Steps.Step;
class AppReleaseFormPage extends Component{
    

    render(){
        return (<div>
                    <Steps>
                        <Step  titel='1.发布信息填写'/>
                        <Step  titel='2.审核中'/>
                        <Step  titel='3.完成'/>
                    </Steps>            
            
            </div>)
    }
}
