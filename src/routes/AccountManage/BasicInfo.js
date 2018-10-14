import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Icon,
    Input,
    Card,
    Table,
    Button,
    Popconfirm,
    Form,
    DatePicker,
    Divider,
    Modal,
    message,
    Breadcrumb,
    Select
} from 'antd';
//import ExtTable from '../../components/public/ExtTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BasicInfo.less';
import { dic } from '../../config/dic';
import { getNameFromConfig } from '../../utils/utils';
//import FdCreate from './FdCreate';
import StandardTable from 'components/StandardTable';
const { TextArea } = Input;
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
    },
};
const submitFormLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
    },
};



@Form.create()
@connect(({ basicInfo, loading }) => {
    const { currentUser } = basicInfo;
    const { list } = basicInfo;
    console.log('基本信息record: ', basicInfo.basicInfos);
    return {
        currentUser: basicInfo.currentUser,
        list,
        loading: loading.effects['basicInfo/fetch'],

    };
})
export default class BasicInfo extends Component {
    state = {
        record: {},
        currentType: 'list',
        currentUser: this.props.state,
        loading:false,
        //sortedInfo: null,
        //formValues: {},
    };
    breadcrumbList = {
        list: [{ title: '基本资料' }],
    }

    componentDidMount() {
        this.show();
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'feedback/resetState'
        });
    }
    show = () => {
        console.log('This Is SHOW function');
        this.props.dispatch({ type: 'basicInfo/fetch' });
    }
    changeCurrentType = (params) => {
        this.setState({
            currentType: params[0]
        })
    }
    handleOkInd= (e) => {
        const { dispatch } = this.props;
        this.props.form.validateFields(
            ['id','account','password','type','username','fullName','idCard','mobilePhone','telephone','email','address'],
            (err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                };
                console.log('Received values of form handleOkInd: ', values);
                if (!values.id) {
                    return
                } else {
                    this.setState({ loading: true })
                    dispatch({
                        type: 'basicInfo/updateInfo',
                        payload: values,
                    }).then(() => {
                        this.setState({ loading: false })
                      })
                      .catch((error) => {
                        this.setState({ loading: false })
                        // 异常处理
                        console.error(error)
                      });
                    // message.success('更新成功');
                }
            }
        });
    }
    handleOkCor= (e) => {
        const { dispatch } = this.props;
        this.props.form.validateFields(
            ['id','account','password','type','organization','fullName','idCard','mobilePhone','telephone','email','address','introduce','businessLicense'],
            (err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                };
                console.log('Received values of form handleOkCor: ', values);
                if (!values.id) {
                    return
                } else {
                    this.setState({ loading: true })
                    dispatch({
                        type: 'basicInfo/updateInfo',
                        payload: values,
                    }).then(() => {
                        this.setState({ loading: false })
                      })
                      .catch((error) => {
                        this.setState({ loading: false })
                        // 异常处理
                        console.error(error)
                      });
                    // message.success('更新成功');
                }
            }
        });
    }
    handleOkGov= (e) => {
        const {dispatch } = this.props;
        this.props.form.validateFields(
            ['id','account','password','type','organization','fullName','idCard','mobilePhone','directorPhone','email'],
            (err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                };
                console.log('Received values of form handleOkGov: ', values);
                if (!values.id) {
                    return
                } else {
                    this.setState({ loading: true })
                    dispatch({
                        type: 'basicInfo/updateInfo',
                        payload: values,
                    }).then(() => {
                        this.setState({ loading: false })
                      })
                      .catch((error) => {
                        this.setState({ loading: false })
                        // 异常处理
                        console.error(error)
                      });
                    // message.success('更新成功');
                }
            }
        });
    }
    handleOk = (e) => {
        const { closeAdd, dispatch } = this.props;
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                };
                console.log('Received values of form: ', values);
                if (!values.id) {
                    return
                } else {
                    dispatch({
                        type: 'basicInfo/updateInfo',
                        payload: values,
                    }).then(() => {
                        this.setState({ loading: false })
                      })
                      .catch((error) => {
                        this.setState({ loading: false })
                        // 异常处理
                        console.error(error)
                      });
                    // message.success('更新成功');
                }
            }
        });
    }

    render() {
        const { currentType } = this.state;
        const { currentUser } = this.props;
        const { getFieldDecorator } = this.props.form;
        let listContent;
        let dvpTypye;
        const corporation = (
            <Card style={{ width: '100%' }} loading={this.props.loading}>
                <div className={styles.pancontainer}>
                    <Form>
                        {getFieldDecorator('id', {
                            initialValue: currentUser.id
                        })(<Input type="hidden" />)}
                        {getFieldDecorator('password', {
                            initialValue: currentUser.password
                        })(<Input type="hidden" />)}
                        {/* <FormItem {...formItemLayout} label="应用名称"> */}
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>注册账号</span>}>
                            {getFieldDecorator('account', {
                                initialValue: currentUser.account,
                                rules: [{ required: true}],
                            })(<Input disabled />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>开发者类型</span>}>
                            {getFieldDecorator('type', {
                                initialValue: currentUser.type,
                                rules: [{ required: true}],
                            })(<Input disabled />)}

                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>企业名称</span>}>
                            {getFieldDecorator('organization', {
                                initialValue: currentUser.organization,
                                rules: [{ required: true, message: '请输入您的企业名称!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>企业负责人</span>}>
                            {getFieldDecorator('fullName', {
                                initialValue: currentUser.fullName,
                                rules: [{ required: true, message: '请输入企业负责人姓名!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>负责人身份证号</span>}>
                            {getFieldDecorator('idCard', {
                                initialValue: currentUser.idCard,
                                rules: [{ required: true, message: '请输入正确的企业负责人身份证号码!', }, {
                                    pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                                    message: '身份证格式不正确',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>负责人手机号码</span>}>
                            {getFieldDecorator('mobilePhone', {
                                initialValue: currentUser.mobilePhone,
                                rules: [{ required: true, message: '请输入联系人手机号!', }, {
                                    pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号码格式不正确',
                                }],
                            })(<Input />)}

                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>企业座机号</span>}>
                            {getFieldDecorator('telephone', {
                                initialValue: currentUser.telephone,
                                rules: [{ required: true, message: '请输入企业座机号!', }, {
                                    pattern: /0\d{2,3}-\d{7,8}/, message: '电话号码格式不正确',
                                }
                               
                            ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>企业邮箱</span>}>
                            {getFieldDecorator('email', {
                                initialValue: currentUser.email,
                                rules: [{ required: true, message: '请输入正确的企业邮箱!', }, {
                                    type:'email' , message: '电子邮箱格式不正确',
                                }   ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>企业地址</span>}>
                            {getFieldDecorator('address', {
                                initialValue: currentUser.address,
                                rules: [{ required: true, message: '请输入企业地址!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>企业简介</span>}>
                            {getFieldDecorator('introduce', {
                                initialValue: currentUser.introduce,
                                rules: [{ required: true, message: '请输入企业简介!', }],
                            })
                                (<TextArea autosize={{ minRows: 5 }} />)
                            }
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>营业执照号</span>}>
                            {getFieldDecorator('businessLicense', {
                                initialValue: currentUser.businessLicense,
                                rules: [{ required: true, message: '请输入营业执照号!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem
                            {...submitFormLayout}
                        >
                            <Button loading={this.props.loading} type='primary' htmlType='submit' onClick={this.handleOkCor}>更新</Button>
                            {/* <Button loading={this.state.loading} type="primary" onClick={this.handleSubmit}>保存</Button> */}
                        </FormItem>
                    </Form>
                </div>
            </Card>

        )
        const individual = (
            <Card style={{ width: '100%' }} 
            loading={this.props.loading}
            >
                <div className={styles.pancontainer}>
                    <Form>
                        {getFieldDecorator('id', {
                            initialValue: currentUser.id
                        })(<Input type="hidden" />)}
                        {getFieldDecorator('password', {
                            initialValue: currentUser.password
                        })(<Input type="hidden" />)}
                        {/* <FormItem {...formItemLayout} label="应用名称"> */}
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>注册账号</span>}>
                            {getFieldDecorator('account', {
                                initialValue: currentUser.account,
                                rules: [{ required: true}],
                            })(<Input disabled />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>开发者类型</span>}>
                            {getFieldDecorator('type', {
                                initialValue: currentUser.type,
                                rules: [{ required: true}],
                            })(<Input disabled />)}

                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>真实姓名</span>}>
                            {getFieldDecorator('username', {
                                initialValue: currentUser.username,
                                rules: [{ required: true, message: '请输入您的真实姓名!', }],
                            }
                            )(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>联系人姓名</span>}>
                            {getFieldDecorator('fullName', {
                                initialValue: currentUser.fullName,
                                rules: [{ required: true, message: '请输入联系人姓名!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>联系人身份证号</span>}>
                            {getFieldDecorator('idCard', {
                                initialValue: currentUser.idCard,
                                rules: [{ required: true, message: '请输入联系人身份证号!', }, {
                                    pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,                                    
                                    message: '身份证格式不正确',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>联系人手机号码</span>}>
                            {getFieldDecorator('mobilePhone', {
                                initialValue: currentUser.mobilePhone ,
                                rules: [{ required: true, message: '请输入联系人的手机号码!', }, {
                                    pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号码格式不正确',
                                }],
                            })(<Input />)}

                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>固定电话</span>}>
                            {getFieldDecorator('telephone', {
                                initialValue: currentUser.telephone ,
                                rules: [{ required: true, message: '请输入电话号码!', }, {
                                    pattern: /0\d{2,3}\d{7,8}/, message: '电话号码格式不正确',
                                
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>电子邮箱</span>}>
                            {getFieldDecorator('email', {
                                initialValue: currentUser.email ,
                                rules: [{ required: true, message: '请输入电子邮箱!', }, {
                                    type:'email' , message: '电子邮箱格式不正确',
                                }   ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>联系地址</span>}>
                            {getFieldDecorator('address', {
                                initialValue: currentUser.address ,
                                rules: [{ required: true, message: '请输入联系地址!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem
                            {...submitFormLayout}
                        >
                            <Button loading={this.state.loading} type='primary' htmlType='submit' onClick={this.handleOkInd}>更新</Button>
                            {/* <Button loading={this.state.loading} type="primary" onClick={this.handleSubmit}>保存</Button> */}
                        </FormItem>
                    </Form>
                </div>
            </Card>

        )
        const government = (
            <Card style={{ width: '100%' }} loading={this.props.loading}>
                <div className={styles.pancontainer}>
                    <Form>
                        {getFieldDecorator('id', {
                            initialValue: currentUser.id
                        })(<Input type="hidden" />)}
                        {getFieldDecorator('password', {
                            initialValue: currentUser.password
                        })(<Input type="hidden" />)}
                        {/* <FormItem {...formItemLayout} label="应用名称"> */}
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>注册账号</span>}>
                            {getFieldDecorator('account', {
                                initialValue: currentUser.account,
                                rules: [{ required: true}],
                            })(<Input disabled />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>开发者类型</span>}>
                            {getFieldDecorator('type', {
                                initialValue: currentUser.type,
                                rules: [{ required: true}],
                            })(<Input disabled />)}

                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>部门名称</span>}>
                            {getFieldDecorator('organization', {
                                initialValue: currentUser.organization,
                                rules: [{ required: true, message: '请输入部门名称!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>姓名</span>}>
                            {getFieldDecorator('fullName', {
                                initialValue: currentUser.fullName,
                                rules: [{ required: true, message: '请输入您的姓名!', }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>身份证号</span>}>
                            {getFieldDecorator('idCard', {
                                initialValue: currentUser.idCard,
                                rules: [{ required: true, message: '请输入正确的身份证号码!', }, {
                                    pattern:/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                                    message: '身份证格式不正确',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>手机号码</span>}>
                            {getFieldDecorator('mobilePhone', {
                                initialValue: currentUser.mobilePhone,
                                rules: [{ required: true, message: '请输入手机号码!', }, {
                                    pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号码格式不正确',
                                }],
                            })(<Input />)}

                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>公安应用建设负责人手机号</span>}>
                            {getFieldDecorator('directorPhone', {
                                initialValue: currentUser.directorPhone,
                                rules: [{ required: true, message: '请输入公安建设负责人手机号码!', }, {
                                    pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '手机号码格式不正确',
                                }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>电子邮箱</span>}>
                            {getFieldDecorator('email', {
                                initialValue: currentUser.email,
                                rules: [{ required: true, message: '请输入电子邮箱!', }, {
                                    type:'email' , message: '电子邮箱格式不正确',
                                }   
                            ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem
                            {...submitFormLayout}
                        >
                            <Button loading={this.state.loading} type='primary' htmlType='submit'
                             onClick={this.handleOkGov}>更新</Button>
                            {/* <Button loading={this.state.loading} type="primary" onClick={this.handleSubmit}>保存</Button> */}
                        </FormItem>
                    </Form>
                </div>
            </Card>

        )
        if (currentUser.type === '0' || currentUser.type === '个人') {
            listContent = individual;
            dvpTypye = '个人';

        } else if (currentUser.type === '1' || currentUser.type === '企业') {
            listContent = corporation;

        } else if (currentUser.type === '2' || currentUser.type === '公安机关') {
            listContent = government;
        } else {
            console.log('No such type!');
        }




        const renderContent = {
            list: listContent,

        }


        return (
            <PageHeaderLayout
                callBackMethod={this.changeCurrentType}
                breadcrumbList={this.breadcrumbList[currentType]}


            >
                {renderContent[currentType]}
            </PageHeaderLayout>


        );
    }
}
