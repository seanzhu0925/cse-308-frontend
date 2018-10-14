import React, { Component } from 'react';
import styles from './AppRegisterList.less'
import Drophandle from './../../../components/DeveloperService/console/Drophandle'
import { connect } from 'dva';

import {
    Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider, Input, Row, Col, Table, Popconfirm, Dropdown, Menu, Checkbox, Pagination
    , Collapse, Select, Modal
} from 'antd';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;

@connect(({ appservices, loading }) => {

    return {
        appservices,
        loading: loading.effects['appservices/querylist'],
    }
})
export default class AppRegisterList extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }


    handerTableCoulm = (culcolumns) => {
        const newcolums = [...this.props.culcolumns];
        const type = this.props.tabletype;
        let htmlaction = {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div><a style={{ color: '#6A97C2' }} onClick={this.props.addCompant.bind(this, { id: record.id, url: '/console/yyxg', titel: '应用修改', param: { row: record } })}>修改&nbsp;&nbsp;&nbsp;</a><a style={{ color: '#6A97C2' }}
                    onClick={this.props.addCompant.bind(this, { id: record.id, url: '/servicemanager/myservicedetail', titel: '服务状态', param: { row: record } })}
                >查看详情</a></div>
            )

        }

        newcolums.push(htmlaction)
        return newcolums;

    }

    handleLookModel = (record) => {
        this.props.dispatch({
            type: 'appservices/appservicesdetail',
            ...record
        })
        this.setState({
            visiable: true
        })
    }

    handleCancel = () => {
        this.setState({
            visiable: false
        })
    }

    render() {

        return (
            <div className={styles.pancontainer}>


                <div className={styles.cardtitel} style={{ width: '100%', margin: 'auto' }}>
                    <Card width='auto' bordered={false}>
                        <Collapse defaultActiveKey={['1']} >
                            <Panel header={<div><Icon type="search" /><span>查询条件</span></div>} style={{ width: '100%', height: '40%', margin: 'auto' }} key="1">

                                <div className='tab1' style={{ margin: 'auto' }}>
                                    <Row gutter={16} align='middle'>
                                        <Col span={8} offset='2' ><span style={{ color: '#8D8F91' }}>时间范围</span><br />
                                            <DatePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
                                                placeholder="选择开始时间"
                                                value={this.props.stime}
                                                onChange={this.props.onChangeStime.bind(this)}
                                                onOk={this.onOk}
                                            />
                                            &nbsp;至&nbsp;<DatePicker
                                                showTime
                                                format="YYYY-MM-DD HH:mm:ss"
                                                placeholder="选择结束时间"
                                                value={this.props.etime}
                                                onChange={this.props.onChangeEtime.bind(this)}

                                                onOk={this.onOk}
                                            /></Col>
                                        <Col span={8} offset='1' ><span style={{ color: '#8D8F91' }}>应用名称</span><br />
                                            <Input placeholder='请输入应用名称' style={{ width: '80%' }} onChange={this.props.onInputChange} />
                                        </Col>


                                        <Col span={3} offset={1}><br /><Button type="primary" icon="search" onClick={this.props.queryClick}>查询</Button></Col>
                                    </Row>
                                </div>

                            </Panel>
                        </Collapse>
                        <div className={styles.tablelist} style={{ marginTop: '4%' }}>
                            <div style={{ width: '100%' }}>
                                <div style={{ float: 'left', width: '30%', marginBottom: '0.5%' }}>
                                    <Button onClick={this.props.addCompant.bind(this, { url: '/console/yycj', titel: '应用创建' })} icon='plus'>创建应用</Button>
                                </div>
                                <div style={{ textAlign: 'right', width: '60%', marginBottom: '0.5%', marginLeft: '39.9%' }}>
                                    <ButtonGroup>
                                        <Button onClick={this.props.reloadClick}><Icon type="reload" /></Button>
                                        <Button onClick={this.props.profileClick}><Icon type="profile" /></Button>
                                        <Drophandle dropchange={this.props.dropchange} styles={this.props.styles} columns={this.props.columns} onChange={this.props.dropchange} dataSource={this.props.dataSource}></Drophandle>
                                    </ButtonGroup>
                                </div>
                            </div>
                            <Table
                                dataSource={this.props.titelcardssPaginationSet.dataSource}
                                bordered columns={this.handerTableCoulm()}
                                pagination={this.props.pagination}
                                rowKey={(item) => item.id}
                                size="small"
                            />
                            
                        </div>
                    </Card>
                </div>

            </div>
        );
    }
}


