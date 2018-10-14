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
    Select
} from 'antd';
import ExtTable from '../../components/public/ExtTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardTable from 'components/StandardTable';
import styles from './AppManage.less';
import { dic } from '../../config/dic';
import { getNameFromConfig } from '../../utils/utils';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const { RangePicker } = DatePicker;

@Form.create()
@connect(({ appManage, versionManage, loading }) => {
    const { list, pagination, current, pageSize, searchValues } = versionManage;
    return {
        list,
        record: appManage.record,
        pagination,
        searchValues,
        loading: loading.effects['versionManage/fetch'],
        submitting: loading.effects['versionManage/doEdit'],
    };
})
export default class VersionManage extends React.PureComponent {
    state = {
        record: {},
    };

    componentDidMount() {
        this.props.dispatch({ type: 'versionManage/initFetch' });
    }
    componentWillUnmount() {
        // this.props.dispatch({
        //     type: 'versionManage/resetState'
        // });
    }

    show = () => {
        this.props.dispatch({ type: 'versionManage/fetch' });
    }

    setSearchValues = (values) => {
        this.props.dispatch({
            type: 'versionManage/search',
            searchValues: values
        })
    }


    showEditWithRecord = (record) => {
        this.props.dispatch({
            type: 'versionManage/saveEditRecord',
            record
        }).then(() => {
            this.props.openPage('/console/versionManage/edit')
        })
    }

    pageChange = ({ current, pageSize }, filters) => {
        const status = filters.appStatus;
        let appStatus = undefined;
        if (status && status.length > 0) {
            appStatus = status.join(',')
        }
        this.props.dispatch({
            type: 'versionManage/pageChange',
            payload: {
                current,
                pageSize,
                appStatus
            }
        })
    }

    handleChange = (value) => {
        if (value !== this.props.approvalType) {
            this.props.dispatch({
                type: 'versionManage/changeApprovalType',
                value
            })
        }
    }

    setModalVisible = (visible) => {
        this.setState({
            approvalModalVisible: visible
        })
    }

    handleFormReset = () => {
        this.props.form.resetFields();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            let begin, end;
            const range = fieldsValue['dateRange'];
            if (range && range.length == 2) {
                begin = range[0].format('YYYY-MM-DD');
                end = range[1].format('YYYY-MM-DD');
            }
            const values = {
                ...fieldsValue,
                begin,
                end
            };
            this.setSearchValues(values);
            // const begin = fieldsValue['begin'] ? fieldsValue['begin'].format('YYYY-MM-DD') : undefined;
            // const end = fieldsValue['end'] ? fieldsValue['end'].format('YYYY-MM-DD') : undefined;
            // const values = {
            //     ...fieldsValue,
            //     begin,
            //     end
            // };
            // this.setSearchValues(values);
        });
    }

    renderSearchForm() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const { searchValues } = this.props;
        return (
            <Form>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem {...formItemLayout} label="应用名称">
                            {getFieldDecorator('appName', {
                                initialValue: searchValues['appName']
                            })(
                                <Input placeholder="请输入应用名称" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={10} sm={24}>
                        <FormItem {...formItemLayout} label="时间范围">
                            {getFieldDecorator('dateRange', {
                                initialValue: searchValues['dateRange']
                            })(
                                <RangePicker />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <span >
                            <Button type="primary" onClick={this.handleFormSubmit}>查询</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    columns = [
        {
            title: '应用名称',
            dataIndex: 'appName',
        },
        {
            title: '申请包名',
            dataIndex: 'packageName',
        },
        {
            title: '应用类型',
            dataIndex: 'appType',
        },
        {
            title: '创建时间',
            dataIndex: 'sysRecordTime',
        },
        {
            title: '状态',
            dataIndex: 'appStatus',
            render: (text, record) => (
                getNameFromConfig(dic.versionManage.appStatus, text)
            ),
            filters: [
                {
                    text: '正常',
                    value: '0',
                },
                {
                    text: '冻结',
                    value: '1',
                },
                {
                    text: '废弃',
                    value: '2',
                }
            ],
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <a onClick={this.showEditWithRecord.bind(this, record)}>修改</a>
                    <Divider type="vertical" />
                    <a onClick={this.showEditWithRecord.bind(this, record)}>版本管理</a>
                </div>
            )
        }
    ]


    render() {
        const breadcrumbList = [{
            title: '应用管理',
            url: '/console/appManage',
        }, {
            title: '版本管理',
        }]
        return (
            <PageHeaderLayout title={`${this.props.record.appName}-版本管理`} openPage={this.props.openPage} breadcrumbList={breadcrumbList} >
                <Card style={{ width: '100%' }}>
                    <div className={styles.searchForm}>
                        {this.renderSearchForm()}
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <Button onClick={this.props.openPage.bind(this, '/console/appManage/version/add')} type="primary"><Icon type="plus" />新增版本</Button>
                        {/* <Button onClick={this.show} style={{ float: 'right' }}><Icon type="reload" /></Button> */}
                    </div>
                    <div>
                        <StandardTable
                            rowKey="id"
                            selectedRows={[]}
                            onSelectRow={() => { }}
                            loading={this.props.loading}
                            data={{
                                list: this.props.list,
                                pagination: this.props.pagination
                            }}
                            columns={this.columns}
                            onChange={this.pageChange}
                        />
                    </div>
                </Card>
            </PageHeaderLayout>
        );
    }
}
