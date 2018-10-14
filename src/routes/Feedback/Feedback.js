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
import FdDetail from './FdDetail';
import styles from './Feedback.less';
import { dic } from '../../config/dic';
import { getNameFromConfig } from '../../utils/utils';
import FdCreate from './FdCreate';
import StandardTable from 'components/StandardTable';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const { RangePicker } = DatePicker;

@Form.create()
@connect(({ feedback, loading }) => {
    const { list, pagination, current, pageSize, searchValues, record } = feedback;
    return {
        list,
        pagination,
        record: feedback.record,
        searchValues,
        loading: loading.effects['feedback/fetch'],
        submitting: loading.effects['feedback/doEdit'],
    };
})
export default class Feedback extends Component {
    state = {
        record: {},
        currentType: 'list',
        //sortedInfo: null,
        //formValues: {},
    };


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
                        <FormItem {...formItemLayout} label="反馈主题">
                            {getFieldDecorator('title', {
                                // initialValue: searchValues['title']
                            })(
                                <Input placeholder="请输入反馈主题" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={10} sm={24}>
                        <FormItem {...formItemLayout} label="时间范围">
                            {getFieldDecorator('dateRange', {
                                // initialValue: searchValues['dateRange']
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

    columns = [{
        title: '反馈主题',
        render: (text, record) => {
            if (record.title.length > 5) {
                return (<div>{record.title.substring(0, 5)}...</div>)
            } else {
                return (<div>{record.title} </div>)
            }

        },
    }, {
        title: '反馈内容',
        render: (text, record) => {
            if (record.content.length > 12) {
                return (<div>{record.content.substring(0, 12)}...</div>)
            } else {
                return (<div>{record.content} </div>)
            }

        },
    },
    {
        title: '反馈时间',
        dataIndex: 'sysRecordTime',
        defaultSortOrder: 'descend',
        // sorter: true,
        //sorter: (a, b) => a.sysRecordTime < b.sysRecordTime,
        sorter: (a, b) => Date.parse(a.sysRecordTime.replace('-','/').replace('-','/')) - Date.parse(b.sysRecordTime.replace('-','/').replace('-','/')),
   
    },
    {
        title: '回复状态',
        dataIndex: 'fdStatus',
        render: (text, record) => (
            getNameFromConfig(dic.feedback.fdStatus, text)
        ),
        filters: [
            {
                text: '未回复',
                value: 0,
            },
            {
                text: '已回复',
                value: 1,
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.fdStatus.includes(value),
    }, {
        title: '操作',
        //dataIndex: 'fdOperate',
        render: (text, record) => (
            <div>
                <a onClick={this.showEditWithRecord.bind(this, record)}>查看详情</a>

            </div>
        )
    }]

    breadcrumbList = {
        list: [{
            title: '意见反馈'
        }],
        add: [{
            title: '意见反馈',
            callBackParams: ['list'],
        }, {
            title: '新增反馈',
        }],
        detail: [{
            title: '意见反馈',
            callBackParams: ['list'],
        }, {
            title: '反馈详情',
        }],
    }


    componentDidMount() {
        this.show();
    }
    // componentDidMount() {
    //     this.props.dispatch({ type: 'feedback/initFetch' });
    // }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'feedback/resetState'
        });
    }

    show = () => {
        console.log('This Is SHOW function');
        this.props.dispatch({ type: 'feedback/fetch' });
    }

    setSearchValues = (values) => {
        this.props.dispatch({
            type: 'feedback/search',
            searchValues: values
        })
    }
    showEditWithRecord = (record) => {
        this.props.dispatch({
            type: 'feedback/saveEditRecord',
            record,
        }).then(() => {
            // this.props.openPage('/fddetail')
            this.setState({ currentType: 'detail' });
        })
    }

    expandedRowRender = (record) => {
        console.log('expand record: ', record);
        return (
            JSON.stringify(record)
        )
    }


    // showEditWithRecord = (record) => {
    //     const { breadcrumbs } = this.state;
    //     this.setState({
    //         current: 'detail',
    //         record: record
    //     })
    // }

    handleFormReset = () => {
        this.props.form.resetFields();
        this.show();
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
            console.log('handleFormSubmit: ', values);
            this.setSearchValues(values);
            //this.show();
        });
    }

    pageChange = ({ current, pageSize }, filters) => {
        const status = filters.fdStatus;
        let fdStatus = undefined;
        if (status && status.length > 0) {
            fdStatus = status.join(',')
        }

        this.props.dispatch({
            type: 'feedback/pageChange',
            payload: {
                current,
                pageSize,
                fdStatus,
                //...formValues,

            }
        })
    }

    handleChange = (value) => {
        if (value !== this.props.approvalType) {
            this.props.dispatch({
                type: 'feedback/changeApprovalType',
                value
            })
        }
    }

    setModalVisible = (visible) => {
        this.setState({
            approvalModalVisible: visible
        })
    }

    onSelect = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    }

    changeCurrentType = (params) => {
        this.setState({
            currentType: params[0]
        })
    }


    render() {
        const { currentType } = this.state;

        const listContent = (
            <Card style={{ width: '100%' }}>
                <div className={styles.searchForm}>
                    {this.renderSearchForm()}
                </div>
                <div style={{ marginBottom: 10 }}>
                    <Button onClick={() => { this.setState({ currentType: 'add' }) }} type="primary"><Icon type="plus" />新增反馈</Button>
                    {/* <Button onClick={this.show} style={{ float: 'right' }}><Icon type="reload" /></Button> */}
                </div>
                <div>

                    <Table
                        rowKey="id"
                        selectedRows={[]}
                        onSelectRow={() => { }}
                        loading={this.props.loading}
                        data={{
                            list: this.props.list,
                            pagination: this.props.pagination
                        }}
                        dataSource={this.props.list}
                        pagination={this.props.pagination}
                        columns={this.columns}
                        onChange={this.pageChange}
                    />


                </div>
            </Card>
        )

        const renderContent = {
            list: listContent,
            add: <FdCreate changeCurrentType={this.changeCurrentType} show={this.show} />,
            detail: <FdDetail changeCurrentType={this.changeCurrentType} />,

        }

        const title = {
            add: '新增反馈',
            detail: '反馈详情'
        }
        return (
            <PageHeaderLayout
                callBackMethod={this.changeCurrentType}
                breadcrumbList={this.breadcrumbList[currentType]}
                //title={title[this.state.currentType]}

            >
                {renderContent[currentType]}
            </PageHeaderLayout>


        );
    }
}
