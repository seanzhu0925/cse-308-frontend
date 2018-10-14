import { Form ,Button,Icon,Input} from 'antd';
import { Component } from 'react';
import styles from './LoginModal.less'


const FormItem = Form.Item;

@Form.create()
class LoginForginPassword extends Component{
    
    
    handleSubmitForginPassoword = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.handleSubmitForginPassoword(values)
            
          }
        });
       
      }
   render(){
    const { getFieldDecorator } = this.props.form;

    return(<div>   <Form onSubmit={this.handleSubmitForginPassoword}>
    <FormItem>
        {getFieldDecorator('mobile_phone', {
            rules: [{ required: true, message: '手机号码' }],
        })(
            <Input prefix={<Icon type="tablet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码"  addonAfter={this.props.codebtn} />
        )}
    </FormItem>
    <FormItem>
        {getFieldDecorator('visablecode', {
            rules: [{ required: true, message: '请输入你的验证码' }],
        })(
            <Input prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />}   placeholder='验证码'/>
        )}          
    </FormItem>
    <FormItem>
        <Button type="primary" htmlType="submit" ghost>
            <Icon type="login" /> 重置密码 
        </Button>
    </FormItem>
    </Form>
        </div>
)
}
}



export default LoginForginPassword;