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
        //loading: false,
       loading:false
       
    };
    breadcrumbList = {
        list: [{ title: '修改密码' }],
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
        //this.setState({ isClickable: true })
    }
    changeCurrentType = (params) => {
        this.setState({
            currentType: params[0]
        })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次输入的密码不一样!');
        } else {
          callback();
        }
      }
    
    
    handleOk = (e) => {
        
        const { closeAdd, dispatch } = this.props;
        
        this.props.form.validateFields(['id','password'],(err, fieldsValue) => {
            if (!err) {
                const values = {
                    ...fieldsValue,
                };
                console.log('Received values of form: ', values);
                if (!values.id) {
                    return
                } else {
                    this.setState({ loading: true })
                    dispatch({
                        type: 'basicInfo/updatePassword',
                        payload: values,
                    }).then(() => {
                        this.setState({ loading: false })
                      })
                      .catch((error) => {
                        this.setState({ loading: false })
                        // 异常处理
                        console.error(error)
                      })
                    ;
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
        const psswd = (
            <Card style={{ width: '100%' }} loading={this.props.loading}>
                <div className={styles.pancontainer}>
                    <Form>
                        {getFieldDecorator('id', {
                            initialValue: currentUser.id
                        })(<Input type="hidden" />)}
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>重置密码</span>}>
                            {getFieldDecorator('password', {
                                initialValue:'',
                                rules: [{ required: true, message: '请输入您想要重置的密码', }],
                            })(<Input type="password"/>)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span style={{ color: '#676A6C' }}>确认密码</span>}>
                            {getFieldDecorator('confirm', {
                               rules: [{ required: true,message:'请确认密码'},{validator: this.compareToFirstPassword}],
                            }
                            )(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                        </FormItem>
                        <FormItem
                            {...submitFormLayout}
                        >
                            <Button loading={this.state.loading} type='primary' htmlType='submit' onClick={this.handleOk}>确认修改</Button>
                            {/* <Button loading={this.state.loading} type="primary" onClick={this.handleSubmit}>保存</Button> */}
                        </FormItem>
                    </Form>
                </div>
            </Card>

        )
        listContent=psswd;




        const renderContent = {list: listContent,}
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
