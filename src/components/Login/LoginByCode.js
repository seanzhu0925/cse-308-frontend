import { Form, Button, Icon, Input, message } from 'antd';
import { Component } from 'react';
import { getcode } from '../../services/api';
import styles from './LoginModal.less'


const FormItem = Form.Item;

@Form.create()
class LoginByCode extends Component {

    state = {
        secondsElapsed: 0,
        disabled: false,
        loading: false,
        confirmDirty: false,
    };

    tick() {
        const { secondsElapsed } = this.state;
        if (secondsElapsed > 0) {
            this.setState({
                secondsElapsed: secondsElapsed - 1
            });
        } else {
            clearInterval(this.interval);
            this.setState({
                disabled: false
            });
        }

    }

    handleSubmitByTelCode = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleSubmitByTelCode(values)
            }
        });

    }
    getVsiablecodeByPassword = () => {
        const phone = this.props.form.getFieldValue('mobilePhone');
        this.props.getVsiablecodeByPassword(phone);
    }

    getMsgCode = () => {
        const phone = this.props.form.getFieldValue('mobilePhone');
        this.setState({
            loading: true
        }, () => {
            getcode(phone).then((response) => {
                this.setState({
                    loading: false,
                    disabled: true
                })
                console.log("res", response)
                if (response.status == 'success') {
                    this.setState({
                        secondsElapsed: 60
                    })
                    this.interval = setInterval(() => this.tick(), 1000);
                } else {
                    message.error('发送失败：' + response.msg);
                    this.setState({
                        disabled: false
                    })
                }
            }).catch(e => {
                this.setState({
                    loading: false,
                    disabled: false
                })
                message.error('发送失败！');
            })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { autoCompleteResult, disabled, loading } = this.state;

        const phone = this.props.form.getFieldValue('mobilePhone');

        const codebtn = (
            phone ? (
                !disabled && !loading ?
                    <div className={styles.abledbtn} onClick={this.getMsgCode}>获取验证码</div> :
                    !disabled && loading ?
                        <div className={styles.disabledbtn} onClick={this.getMsgCode}><Icon type="loading" /></div> :
                        disabled && !loading ?
                            <div className={styles.disabledbtn}> 重新发送({this.state.secondsElapsed}s)</div> : ''
            ) : (
                    <div className={styles.disabledbtn}>获取验证码</div>
                )
        )

        return (
            <div style={{ paddingTop: 20 }}>
                <Form onSubmit={this.handleSubmitByTelCode}>
                    <FormItem>
                        {getFieldDecorator('mobilePhone', {
                            rules: [{ required: true, message: '手机号码' }],
                        })(
                            <Input prefix={<Icon type="tablet" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('verificationCode', {
                            rules: [{ required: true, message: '请输入你的验证码' }],
                        })(
                            <Input className={styles.uploadbotton} prefix={<Icon type="bulb" style={{ color: 'rgba(0,0,0,.25)' }} />} addonAfter={codebtn} placeholder="验证码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" ghost style={{ width: '100%' }}>
                            <Icon type="login" /> 登陆
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}



export default LoginByCode;