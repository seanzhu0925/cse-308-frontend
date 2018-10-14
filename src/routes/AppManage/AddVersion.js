import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Input,
    Icon,
    Card,
    Table,
    Button,
    Popconfirm,
    Divider,
    Modal,
    Form,
    message,
    Breadcrumb,
    DatePicker,
    Select,
    Checkbox,
    Cascader
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './AppManage.less';
import { dic } from '../../config/dic';
import { getNameFromConfig } from '../../utils/utils';
import { doAddApp } from '../../services/app';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;

@Form.create()
@connect()
export default class AddVersion extends React.PureComponent {
    state = {
        record: {},
        loading: false,
    };

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loading: true }, () => {
                    doAddApp(values).then(res => {
                        this.setState({ loading: false })
                        if (res.status == 'success') {
                            message.success("操作成功")
                            this.props.dispatch({ type: 'appManage/fetch' });
                            this.props.openPage('/console/appManage');
                        } else {
                            message.error(res.message)
                        }
                    }).catch(e => {
                        this.setState({ loading: false })
                    })
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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
        const breadcrumbList = [
            {
                title: '应用管理',
                url: '/console/appManage',
            },
            {
                title: '版本管理',
                url: '/console/appManage/version',
            },
            {
                title: '版本创建',
            }
        ]
        const options = [{
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [{
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [{
                    value: 'xihu',
                    label: 'West Lake',
                }],
            }],
        }, {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [{
                value: 'nanjing',
                label: 'Nanjing',
                children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                }],
            }],
        }];
        const technicalTypeOptions = [
            { value: '0', label: '安卓' },
            { value: '1', label: 'H5' },
        ];
        const terminalTypeOptions = [
            { value: '0', label: '手机' },
            { value: '1', label: '平板' },
            { value: '2', label: 'PC' }
        ]
        return (
            <PageHeaderLayout title="版本创建" openPage={this.props.openPage} breadcrumbList={breadcrumbList} >
                <Form>
                    <Card title="应用基本信息" style={{ marginBottom: 24 }}>
                        <FormItem
                            {...formItemLayout}
                            label="应用名称"
                        >
                            {getFieldDecorator('appName')(
                                <Input placeholder="请输入应用名称" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="应用类型"
                        >
                            {getFieldDecorator('entryCode')(
                                <Cascader options={options} placeholder="请选择应用类型" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="申请包名"
                        >
                            {getFieldDecorator('packageName')(
                                <Input placeholder="请输入应用包名" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="开发技术类型"
                        >
                            {getFieldDecorator('technicalType')(
                                <CheckboxGroup options={technicalTypeOptions} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="适用终端"
                        >
                            {getFieldDecorator('terminalType')(
                                <CheckboxGroup options={terminalTypeOptions} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="应用简介"
                        >
                            {getFieldDecorator('appIntroduction')(
                                <TextArea rows={5} placeholder="请输入应用简介" />
                            )}
                        </FormItem>
                        <FormItem
                            {...submitFormLayout}
                        >
                            <Button loading={this.state.loading} type="primary" onClick={this.handleSubmit}>提交</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.props.openPage.bind(this, '/console/appManage')}>返回</Button>
                        </FormItem>
                    </Card>
                    <Card title="终端资源" style={{ marginBottom: 24 }}>
                        
                    </Card>
                    <Card title="其它信息填写">
                        
                    </Card>
                </Form>
            </PageHeaderLayout>
        );
    }
}
