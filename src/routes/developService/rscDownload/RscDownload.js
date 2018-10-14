import styles from './RscDownload.less'
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
    Row,
    Col,
    Icon,
    Checkbox,
    Input,
    Card,
    Table,
    List,
    Button,
    Popconfirm,
    Form,
    Tooltip,
    DatePicker,
    Divider,
    Modal,
    message,
    Breadcrumb,
    Select,
    Dropdown,
    Menu,
    Avatar,
    Radio,
    Progress,
} from 'antd';
import Ellipsis from 'components/Ellipsis';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
//import { dic } from '../../config/dic';
import { getNameFromConfig } from '../../../utils/utils';
import StandardTable from 'components/StandardTable';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const plainOptions = ['doc', 'ppt', 'xls', 'html', 'rar', 'pdf', 'txt', 'jpg', 'mp3', 'avi', 'zip'];
//const defaultCheckedList = ['Apple', 'Orange'];
const defaultCheckedList = [];

@Form.create()
@connect(({ resources, loading }) => {
    const { pagination, current, pageSize, searchValues, record, sourceList } = resources;
    return {
        //sourceList,
        pagination,
        pageSize,
        current,
        sourceList: resources.sourceList,
        record: resources.record,
        searchValues,
        loading: loading.effects['resources/fetch'],
        submitting: loading.effects['resources/doEdit'],
    };
})
export default class RscDownload extends Component {
    state = {
        record: {},
        currentType: 'list',
        sourceList: [],
        //sortedInfo: null,
        //formValues: {},
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        value: 0,
    };


    renderSearchForm() {
        console.log('资料record');
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const { searchValues } = this.props;
        return (
            <Form >
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col offset={4} md={14} sm={24}>
                        {/* <div className={styles.wan}> */}
                        <FormItem {...formItemLayout} label="搜索资源">
                            {getFieldDecorator('dataName', {
                                // initialValue: searchValues['title']
                            })(
                                <Input placeholder="请输入资源名称" />
                            )}
                        </FormItem>
                        {/* </div> */}
                    </Col>
                    {/* <Col md={6} sm={24}>
                        <FormItem {...formItemLayout} label="文件类型">
                            {getFieldDecorator('fileType', {
                                // initialValue: searchValues['dateRange']
                            })(
                                <Input placeholder="请输入文件类型" />
                            )}
                        </FormItem>
                    </Col> */}
                    <Col md={6} sm={24}>
                        <span >
                            <Button type="primary" onClick={this.handleFormSubmit}>搜索</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
                        </span>
                    </Col>
                </Row>
                <div>
                    <Row style={{ borderBottom: '1px solid #E9E9E9', borderTop: '5px' }}>
                        <Col col={24} offset={4}>
                            {/* <Checkbox
                                //indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >所有类型</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col col={24} offset={4}>
                            <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange}>
                            </CheckboxGroup> */}
                          
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio value={0}>全部</Radio>
                                <Radio value={2}>ppt</Radio>
                                <Radio value={3}>xls</Radio>
                                <Radio value={4}>doc</Radio>
                                {/* <Radio value={5}>rar</Radio> */}
                                <Radio value={6}>pdf</Radio>
                                <Radio value={7}>txt</Radio>
                                <Radio value={8}>jpg</Radio>
                                <Radio value={9}>mp3</Radio>
                                <Radio value={5}>zip</Radio>
                                <Radio value={10}>avi</Radio>
                                <Radio value={11}>html</Radio>
                            </RadioGroup>

                        </Col>
                    </Row>
                </div>
            </Form>
        );
    }




    columns = [{
        title: '资料名称',
        render: (text, record) => {
            if (record.dataName.length > 5) {
                return (<div>{record.dataName.substring(0, 5)}...</div>)
            } else {
                return (<div>{record.dataName} </div>)
            }

        },
    }, {
        title: '文件名称',
        render: (text, record) => {
            if (record.fileName.length > 12) {
                return (<div>{record.fileName.substring(0, 12)}...</div>)
            } else {
                return (<div>{record.fileName} </div>)
            }
        },
    },
    // {
    //     title: '文件类型',
    //     render: (text, record) => {
    //             return (<div>{record.fileType} </div>)
    //     },
    // },

    {
        title: '文件类型',
        dataIndex: 'fileType',
        render: (text, record) => {
            return (<div>{record.fileType} </div>)

        },
        // ( getNameFromConfig(dic.feedback.fdStatus, text)),   
        filters: [
            {
                text: '文本',
                value: 1,
            }, {
                text: 'Word文档',
                value: 2,
            }, {
                text: 'Excel',
                value: 3,
            }, {
                text: '幻灯片',
                value: 4,
            }, {
                text: '超文本',
                value: 5,
            }, {
                text: '压缩文件',
                value: 6,
            }, {
                text: '音频，视频',
                value: 7,
            }, {
                text: '图片',
                value: 8,
            }, {
                text: 'pdf',
                value: 9,
            }, {
                text: '其他',
                value: 0,
            },
        ],
        filterMultiple: true,
        onFilter: (value, record) => {
            record.type.includes(value)

        },
    },
    {
        title: '上传时间',
        dataIndex: 'sysAcquisitionTime',
        sysAcquisitionTime: 'descend',
        sorter: (a, b) => Date.parse(a.sysAcquisitionTime.replace('-', '/').replace('-', '/')) - Date.parse(b.sysAcquisitionTime.replace('-', '/').replace('-', '/')),

    }, {
        title: '下载',
        //dataIndex: 'fdOperate',
        render: (text, record) => (
            <div>
                <Button icon="download" onClick={this.downLoadSrc.bind(this, record)} />
            </div>
        )
    }]


    componentDidMount() {
        this.show();
    }
    // componentDidMount() {
    //     this.props.dispatch({ type: 'feedback/initFetch' });
    // }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'resources/resetState'
        });
    }

    show = () => {

        console.log('This Is SHOW function');
        this.props.dispatch({ type: 'resources/fetch' });
    }

    setSearchValues = (values) => {
        this.props.dispatch({
            type: 'resources/search',
            searchValues: values
        })
    }
    downLoadSrc = (record) => {
        // this.props.dispatch({
        //     type: 'feedback/saveEditRecord',
        //     record,
        // }).then(() => {
        //     // this.props.openPage('/fddetail')
        //     this.setState({ currentType: 'detail' });
        // })
        console.log('下载文件', record);
    }

    expandedRowRender = (record) => {
        console.log('expand record: ', record);
        return (
            JSON.stringify(record)
        )
    }

    handleFormReset = () => {
        this.state.value = 0,
            this.props.form.resetFields();
        this.show();
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            const values = {
                type: this.state.value,
                ...fieldsValue,

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
            type: 'resources/pageChange',
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
                type: 'resources/changeApprovalType',
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
    // onChange = (checkedList) => {
    //     this.setState({
    //         checkedList,
    //         indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
    //         checkAll: checkedList.length === plainOptions.length,
    //     });
    // }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }




    render() {
        const { currentType, record } = this.state;
        // let record=this.props.record;
        //let sourceList =this.props.sourceList;
        //console.log("资源List", this.props.sourceList);
        //console.log('record数据', this.record);
        let ListContent = ({ data: { dataName, fileName, fileType, sysAcquisitionTime } }) => (
            <div className={styles.listContent}>
                <div className={styles.listContentItem}>
                    <span>资料名称</span>
                    <p>{dataName}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>文件名称</span>
                    <p>{fileName}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>文件类型</span>
                    <p>{fileType}</p>
                </div>
                <div className={styles.listContentItem}>
                    <span>上传时间</span>
                    <p>{sysAcquisitionTime}</p>
                </div>
            </div>
        );

        const CardInfo = ({ dataName, fileName, fileType, sysAcquisitionTime }) => (
            <div style={{ width: '100%' }}>
                <Row>
                    <div>
                        <p>资源名称: </p>
                        <p>
                            <Ellipsis lines={2}>
                                {dataName}
                            </Ellipsis>
                        </p>
                    </div>
                </Row>
                <Row>
                    <div>
                        <p>文件名称: </p>
                        <p><Ellipsis lines={2}>
                            {fileName}
                        </Ellipsis>
                        </p>
                    </div>
                </Row>
                <Row>
                    <Col span={12}>
                        <p>文件类型: </p>
                        <p>{fileType}</p>
                    </Col>
                    <Col span={12}>
                        <p>上传时间: </p>
                        <p>{sysAcquisitionTime}</p>
                    </Col>
                </Row>
            </div>
        );

        const renderContent = {
            list: ListContent,
        }


        return (
            <PageHeaderLayout>
                <Card bordered={false}>
                    <div className={styles.searchForm}>{this.renderSearchForm()}</div>
                    {/* <Button style={{ width: '100%', marginBottom: 8 }} icon='download'> 批量下载 </Button> */}
                </Card>


                <div className={styles.filterCardList}>
                    <Card
                        //className={styles.listCard}
                        // className={styles.pancontainer}
                        bordered={false}
                        style={{ width: '100%' }}
                        //   title="标准列表"
                        style={{ marginTop: 0 }}
                        bodyStyle={{ padding: '0 32px 40px 32px' }}
                    //extra={extraContent}
                    >

                        <List
                            rowKey="id"
                            grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
                            loading={this.props.loading}
                            dataSource={this.props.sourceList}
                            pagination={this.props.pagination}
                            onChange={this.pageChange}
                            renderItem={record => (
                                <List.Item key={record.id}>
                                    <Card
                                        //hoverable
                                        bodyStyle={{ paddingBottom: 20 }}
                                    >

                                        {/* <Card.Meta title={record.dataName} /> */}
                                        <div className={styles.cardInfo}>
                                            <CardInfo
                                                dataName={record.dataName}
                                                fileName={record.fileName}
                                                fileType={record.fileType}
                                                sysAcquisitionTime={record.sysAcquisitionTime}

                                            // fileType={record.fileType}
                                            />
                                        </div>
                                        <Button type='submitButtons'>下载</Button>
                                    </Card>
                                </List.Item>
                            )}
                        />

                    </Card>
                </div>
            </PageHeaderLayout>
        );
    }
}
