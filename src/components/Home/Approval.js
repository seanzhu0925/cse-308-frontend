import React, { Component } from 'react';
import { Card, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import styles from './Approval.less';

const Approval = () => {
    const columns = [{
        title: '审批事项',
        dataIndex: 'spsx',
    }, {
        title: '事项类型',
        dataIndex: 'sxlx',
    }, {
        title: 'Address',
        dataIndex: 'address',
    }];

    const data = [{
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
    }];
    return (
        <div className={styles.card}>
            <Card title="最新应用" style={{ width: '100%', minHeight: 270 }}>
                <div className={styles.container}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                    />
                </div>
            </Card>
        </div>
    )
}

export default Approval;