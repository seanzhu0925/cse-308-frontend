import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete, message, Modal } from 'antd';
import { getcode, fakeRegister, validateAccount, validatePhone } from '../../../services/api';
import styles from './PersonRegister.less';
import Required from '../../../components/public/Required';
import { sysMessage } from '../../../utils/utils';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const phoneReg = /^1[3|4|5|8][0-9]\d{8}$/;

@Form.create()
@connect(({ register, loading }) => {

    return {
        register,
    }
})
export default class PersonRegister extends Component {
    state = {
        secondsElapsed: 0,
        disabled: false,
        loading: false,
        confirmDirty: false,
        accountStatus: '',
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

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                fakeRegister(values).then(res => {
                    if (response.status == 'success') {
                        // Modal.success({
                        //     content: '注册成功',
                        //     title: '系统提示',
                        //     onOk: () => {
                        //         this.props.handleRegisterSuccess();
                        //     }
                        // })
                        sysMessage('success', '注册成功', this.props.handleRegisterSuccess)
                    } else {
                        Modal.error({
                            content: '注册失败',
                            title: '系统提示',
                        })
                    }
                })
            }
        });
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

    validateAccount = (rule, value, callback) => {
        const form = this.props.form;
        if (value) {
            // setTimeout(() => {
            //     callback('账号已存在')
            // }, 1000)
            validateAccount(value).then(res => {
                if (res) {
                    callback("账号已存在")
                }
                else {
                    callback()
                }
            })
        } else {
            callback();
        }
    }

    validatePhone = (rule, value, callback) => {
        const form = this.props.form;
        if (value && phoneReg.test(value)) {
            // setTimeout(() => {
            //     callback('账号已存在')
            // }, 1000)
            validatePhone(value).then(res => {
                if (res) {
                    callback("手机号已存在")
                }
                else {
                    callback()
                }
            })
        } else {
            callback();
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    getMsgCode = () => {
        const phone = this.props.form.getFieldValue('mobilePhone');
        const phoneErr = this.props.form.getFieldError('mobilePhone');
        if (phoneErr) {
            sysMessage('warning', '请输入正确的电话号码')
            return false;
        }
        this.setState({
            loading: true
        }, () => {
            getcode(phone).then((response) => {
                this.setState({
                    loading: false,
                    disabled: true
                })
                if (response.status == 'success') {
                    this.setState({
                        secondsElapsed: 60
                    })
                    this.interval = setInterval(() => this.tick(), 1000);
                } else {
                    sysMessage('error', `发送失败:${response.message}`)
                    this.setState({
                        disabled: false
                    })
                }
            }).catch(e => {
                this.setState({
                    loading: false,
                    disabled: false
                })
                sysMessage('error', '发送失败')
            })
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult, disabled, loading } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };


        // const codebtn = () => {
        //     if (disabled) {
        //         return (
        //             <div style={{ color: 'white' }}> '还剩'{this.state.secondsElapsed}'s'</div>
        //         )
        //     }else{
        //         <div style={{ color: 'white' }} onClick={this.getMsgCode}>获取验证码</div>
        //     }
        // }
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
            <div className={styles.container}>
                <Form onSubmit={this.handleSubmit}>
                    {getFieldDecorator('type', {
                        initialValue: 0
                    })(
                        <Input type="hidden" />
                    )}
                    <FormItem
                        hasFeedback
                    >
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入账号!',
                            }, {
                                validator: this.validateAccount,
                            }],
                            validateTrigger: 'onBlur'
                        })(
                            <span className={styles.input}>
                                <Input placeholder="账号" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="密码" type="password" />
                            </span>
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
                            <span className={styles.input}>
                                <Input placeholder="确认密码" type="password" onBlur={this.handleConfirmBlur} />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{
                                required: true, message: '请输入您的真实姓名!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="真实姓名" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('idCard', {
                            rules: [{
                                required: true, message: '请输入联系人身份证号!',
                            }, {
                                pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证格式不正确',
                            }]
                        })(
                            <span className={styles.input}>
                                <Input placeholder="联系人身份证号" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('fullName', {
                            rules: [{
                                required: true, message: '请输入联系人的姓名!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="联系人姓名" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('mobilePhone', {
                            rules: [{
                                required: true, message: '请输入联系人的手机号码!',
                            }, {
                                pattern: phoneReg, message: '手机号码格式不正确',
                            }, {
                                validator: this.validatePhone
                            }],
                            validateTrigger: 'onBlur'
                        })(
                            <span className={styles.input}>
                                <Input placeholder="联系人手机号码" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('telephone', {
                            rules: [{
                                required: true, message: '请输入您的固定电话!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="固定电话" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: '请输入您的联系地址!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="联系地址" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '邮箱格式不正确!',
                            }, {
                                required: true, message: '请输入您的电子邮箱!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="电子邮箱" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('verificationCode', {
                            rules: [{
                                required: true, message: '请输入您的短信验证码!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input addonAfter={codebtn} placeholder="验证码" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" ghost style={{ width: '100%', height: 40 }}>提交</Button>
                    </FormItem>
                    <FormItem>
                        <Button onClick={this.props.changeregisterType.bind(this, '')} style={{ width: '100%', height: 40 }}>返回</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
