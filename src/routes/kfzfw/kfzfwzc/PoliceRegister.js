import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import styles from './PersonRegister.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;


@Form.create()
@connect(({ register, loading }) => {

    return {
        register,
    }
})
export default class PoliceRegister extends Component {
    state = {
        secondsElapsed: 0,
        disabled: false
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
                console.log('Received values of form: ', values);
                this.props.dispatch({
                    type: 'register/submit',
                    values
                })

            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
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

    /*getMsgCode = () => {
        this.setState({
            disabled: true
        }, () => {
            getcode().then((response) => {
                if (response.status == 'success') {
                    this.setState({
                        secondsElapsed: 30
                    })
                    this.interval = setInterval(() => this.tick(), 1000);
                } else {
                    message.error('发送失败：' + response.msg);
                    this.setState({
                        disabled: false
                    })
                }
            }).catch(e => {
                message.error('发送失败！');
            })
        })
    }*/
    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult, disabled } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 9 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 },
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

        const codebtn = (
            disabled == false ?
                <div className={styles.abledbtn} onClick={this.getMsgCode}>获取验证码</div> :
                <div className={styles.disabledbtn}> 还剩{this.state.secondsElapsed}s</div>
        )

        return (
            <div className={styles.container}>
                <Form onSubmit={this.handleSubmit}>
                    {getFieldDecorator('type', {
                        initialValue: 2
                    })(
                        <Input style={{ display: 'none' }} />
                    )}
                    <FormItem >
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请输入账号!',
                            }],
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
                                <Input placeholder="确认密码" type="password" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('organization', {
                            initialValue: 'test',
                            rules: [{
                                required: true, message: '请输入部门名称!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input disabled placeholder="部门名称" />
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
                                <Input placeholder="姓名" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('id_card', {
                            rules: [{
                                required: true, message: '请输入您的身份证号!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="身份证号" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('mobile_phone', {
                            rules: [{
                                required: true, message: '请输入您的手机号码!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="手机号码" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('director_phone', {
                            rules: [{
                                required: true, message: '请输入公安应用建设负责人手机号!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="公安应用建设负责人手机号" />
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
                        {getFieldDecorator('msgcode', {
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
