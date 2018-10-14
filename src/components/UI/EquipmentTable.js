import React, { Component } from 'react';
import { Modal, Card, Button, Table, Icon, Divider, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './EquipmentTable.less';
import { config } from '../../config/equipment';
import { getNameFromConfig } from '../../utils/utils';

const { warntype, type } = config.equipment;
const EquipmentTable = (props) => {
    const columns = [{
        title: '可用/时间',
        dataIndex: 'availabletime',
        key: 'availabletime',
        render: text => <a href="#">{text}</a>,
    }, {
        title: '告警类别',
        dataIndex: 'warntype',
        key: 'warntype',
        render: text => (
            getNameFromConfig(warntype, text)
        ),
    }, {
        title: '设备IP',
        dataIndex: 'ip',
        key: 'ip',
    }, {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '发现时间',
        dataIndex: 'foundtime',
        key: 'foundtime',
    }, {
        title: '别名',
        dataIndex: 'nickname',
        key: 'nickname',
    }, {
        title: '操作系统',
        dataIndex: 'system',
        key: 'system',
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: text => (
            getNameFromConfig(type, text)
        ),
    }, {
        title: '所属采集机',
        dataIndex: 'sscjj',
        key: 'sscjj',
    }, {
        title: '管理域',
        dataIndex: 'gly',
        key: 'gly',
    }, {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
            <span>
                <a onClick={props.showEditWithRecord.bind(this, record)}><Icon type="edit" /></a>
                <Divider type="vertical" />
                <Popconfirm title="确定删除？" okText="是" cancelText="否" onConfirm={props.delete.bind(this,record)}>
                    <a><Icon type="delete" /></a>
                </Popconfirm>
            </span>
        ),
    },];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            props.rowSelection(selectedRowKeys, selectedRows);
        },
        selectedRowKeys: props.selectedRowKeys
    };

    function showTotal(total) {
        return `Total ${total} items`;
    }

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={props.dataSource}
            bordered
            size="small"
            rowSelection={rowSelection}
            pagination={props.pagination}
            onChange={props.pageChange}
            loading={props.loading}
        />
    )
}

export default EquipmentTable;