import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Input, Icon, Select, Row, Col, Checkbox, Button, Radio, Upload, Modal } from 'antd';
import { getcode, fakeRegister, validateAccount, validatePhone } from '../../../services/api';
import styles from './PersonRegister.less';
import { sysMessage } from '../../../utils/utils';
import { acount } from './../../../components/vaidate/Validates'
import MultipleImgUpload from '../../../components/public/MultipleImgUpload';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const mapPropsToFields = () => {
    return {
        uploadType: Form.createFormField({
            value: 'combine',
        }),
    };
}

@Form.create({ mapPropsToFields })
@connect(({ register, loading }) => {

    return {
        register,
    }
})
export default class CompanyRegister extends Component {
    state = {
        secondsElapsed: 0,
        disabled: false,
        loading: false,
        uploadType: 'combine',
        showimg: '',
        showimgvisiable: false,
        fileList: [],
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
        let { fileList } = this.state;
        if (fileList.length > 0) {

            let imgurl = '';
            fileList.map(function (item, index) {
                if (index < fileList.length - 1) {
                    imgurl += item.response.url + ','
                }
                else {
                    imgurl += item.response.url
                }
            })
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                    values = { ...values, imgurl: imgurl }
                    console.log(values)
                    this.props.dispatch({
                        type: 'register/submit',
                        values
                    })

                }
            });
        } else {
            Modal.confirm({
                title: '警告',
                content: '请检查上传附件'
            })
        }
    }
    handleChange = ({ fileList = [] }) => {
        fileList = fileList.slice(-3);
        this.setState({
            fileList
        })
    }

    handleSingChange = ({ fileList }) => {
        fileList = fileList.slice(-1);
        this.setState({
            fileList
        })
    }
    Uploadtype = (e) => {
        this.setState({
            fileList: []
        })
    }
    onUploadSuccess = (file) => {
        console.log(file)
    }

    handleImg = () => {
        let s = this.props.form.getFieldValue('imgtype');
        if (s == 1) {

            // return (<Upload name="file" fileList={this.state.fileList} action="/api/uploadimg" listType="picture"
            //     onChange={this.handleSingChange} onPreview={this.handlePreview}>
            //     <Button>
            //         <Icon type="upload" /> 点击上传附件
            //     </Button>
            // </Upload>)
            return (
                <MultipleImgUpload onUploadSuccess={this.onUploadSuccess}/>
            )
        } else if (s == 2) {

            return (<Upload name="file" fileList={this.state.fileList} action="/api/uploadimg" listType="picture"
                onChange={this.handleChange} onPreview={this.handlePreview}>
                <Button>
                    <Icon type="upload" /> 点击上传附件
                </Button>
            </Upload>)
        }
        return <div></div>
    }

    handlePreview = (file) => {
        console.log(file, "k")
        this.setState({
            showimgvisiable: true,
            showimg: file.url || file.thumbUrl
        });
    }

    onCancel = () => {
        this.setState({
            showimgvisiable: false,
            showimg: ''
        })
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

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult, disabled, secondsElapsed, loading } = this.state;

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
                <Modal
                    visible={this.state.showimgvisiable}
                    footer={null}
                    onCancel={this.onCancel}
                    width='50%'


                >
                    <img src={this.state.showimg} style={{ margin: 'auto' }} width='100%' />
                </Modal>
                <Form onSubmit={this.handleSubmit}>
                    {getFieldDecorator('type', {
                        initialValue: 1
                    })(
                        <Input style={{ display: 'none' }} />
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
                        {getFieldDecorator('organization', {
                            rules: [{
                                required: true, message: '请输入企业名称!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="企业名称" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('fullName', {
                            rules: [{
                                required: true, message: '请输入负责人的真实姓名!',
                            }, {
                                type: 'string', message: '必须为中文'
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="企业负责人" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('mobilePhone', {
                            rules: [{
                                required: true, message: '请输入负责人的手机号码!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="负责人手机号码" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('idCard', {
                            rules: [{
                                required: true, message: '请输入负责人的身份证号!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="负责人身份证号" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('telephone', {
                            rules: [{
                                required: true, message: '请输入座机号码!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="企业座机号" />
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
                                <Input placeholder="企业邮箱" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: '请输入您的企业地址!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="企业地址" />
                            </span>

                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('introduce', {
                            rules: [{
                                required: true, message: '请输入您的企业简介!',
                            }],
                        })(
                            <span className={styles.input}>
                                <TextArea rows={4} placeholder="企业简介" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('business_license', {
                            rules: [{
                                required: true, message: '请输入您的营业执照号!',
                            }],
                        })(
                            <span className={styles.input}>
                                <Input placeholder="营业执照号" />
                            </span>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="选择上传证件类型"
                    >
                        {getFieldDecorator('imgtype', {
                            initialValue: '1'
                        })(
                            <RadioGroup onChange={this.Uploadtype}>
                                <Radio value="1">三证合一</Radio>
                                <Radio value="2">分开证件</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem>

                        {this.handleImg()}

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
