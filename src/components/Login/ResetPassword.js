import { Form, Button, Icon, Input, Row, Col, Modal } from 'antd';
import { Component } from 'react';
import styles from './ResetPassword.less'
import { verificationIdCard, resetPaaword } from '../../services/api';


const FormItem = Form.Item;

@Form.create()
export default class ResetPassword extends Component {
    state = {
        step: 0,
        loading: false,
        validateStatus: undefined
    }

    changeLoading = (status) => {
        this.setState({ loading: status })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     console.log(values)
        //     if (this.state.step == 0) {
        //         this.setState({ step: 1 })
        //     }
        //     this.props.handleSubmitResetPassoword(values)
        // });
        const { step } = this.state;
        if (step == 0) {
            this.props.form.validateFields(['idCard', 'account'], (err, values) => {
                if (!err) {
                    this.changeLoading(true);
                    verificationIdCard(values).then(res => {
                        this.changeLoading(false);
                        if (res.status == 'success') {
                            this.setState({
                                step: 1,
                                validateStatus: 'success'
                            })
                            this.props.form.setFieldsValue({
                                id: res.data,
                            });
                        } else {
                            this.setState({
                                validateStatus: 'error'
                            })
                        }
                    }).catch(e => {
                        this.changeLoading(false);
                    })
                }
                // this.setState({ step: 1 })
            });
        } else {
            this.props.form.validateFields(['password', 'confirm'], (err, values) => {
                if (!err) {
                    resetPaaword(values).then(res => {
                        if (res.status == 'success') {
                            Modal.success({
                                title: '密码重置成功',
                                onOk: () => {
                                    this.props.changeCurrent("login")
                                }
                            });
                        } else {
                            Modal.error({
                                title: '密码重置失败'
                            });
                        }
                    }).catch(e => {
                        Modal.error({
                            title: '密码重置失败'
                        });
                    })
                }
            })
        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const Step0 = (
            <span>
                <FormItem validateStatus={this.state.validateStatus}>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: '请输入账号' }],
                    })(
                        <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入账号" addonAfter={this.props.codebtn} />
                    )}
                </FormItem>
                <FormItem validateStatus={this.state.validateStatus}>
                    {getFieldDecorator('idCard', {
                        rules: [{ required: true, message: '请输入联系人身份证号' }],
                    })(
                        <Input prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入注册时填写的联系人身份证号" addonAfter={this.props.codebtn} />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" ghost loading={this.state.loading}>
                        <Icon type="login" /> 下一步
                    </Button>
                </FormItem>
            </span>
        )

        const Step1 = (
            <span>
                {getFieldDecorator('id')(
                    <Input type="hidden" />
                )}
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入新密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '两次密码不一致!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请再次输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" ghost loading={this.state.loading}>
                        <Icon type="login" /> 提交
                    </Button>
                </FormItem>
            </span>
        )
        return (
            <div className={styles.resetForm}>
                {/* <div style={{ width: '100%', backgroundColor: '#41c9bf', height: 50, lineHeight: '50px', textAlign: 'center', color: '#FFF', marginBottom: 20, fontSize: 16 }}>
                    账号密码登录
                </div> */}
                <Row>
                    <Col span={20} offset={2}>
                        <Form onSubmit={this.handleSubmit}>
                            {
                                this.state.step == 0 ? Step0 : Step1
                            }
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}
