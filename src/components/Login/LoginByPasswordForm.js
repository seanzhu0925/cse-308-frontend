import { Form, Button, Icon, Input } from 'antd';
import { Component } from 'react';
import styles from './LoginModal.less'

const FormItem = Form.Item;

@Form.create()
class LoginByPasswordForm extends Component {

    handleSubmitByPassword = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmitByPassword(values)
            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (<div style={{ paddingTop: 20 }}><Form onSubmit={this.handleSubmitByPassword}>
            <FormItem>
                {getFieldDecorator('account', {
                    rules: [{ required: true, message: '请输入你的用户名' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入你的密码' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                )}
            </FormItem>
            <FormItem>
                <Button loading={this.props.loading} type="primary" htmlType="submit" ghost style={{ width: '100%' }}>
                    <Icon type="login" /> 登陆
                </Button>
                <div style={{ width: '100%' }}>
                    <a onClick={this.props.toResetPassword}>忘记密码？</a>
                </div>
            </FormItem>
        </Form>
        </div>
        )
    }
}



export default LoginByPasswordForm;