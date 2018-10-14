import React, { Component } from 'react';
import { Card } from 'antd';
import Column from 'antd/lib/table/Column';
import {
    yuan,
    Pie,
} from 'components/Charts';
import styles from './Summary.less';

const Summary = ({ data }) => {
    let spz = 0;
    let ysj = 0;
    let yxj = 0;
    if(data){
        spz = data['spz'];
        ysj = data['ysj'];
        yxj = data['yxj'];
    }
    let total = spz + ysj + yxj;
    console.log(spz,ysj,yxj);
    return (
        <Card title="应用情况汇总" style={{ width: '100%', height: 270 }}>
            <div className={ styles.container }>
                <div style={{ flex: 1 }}>
                    <Pie percent={spz / total * 100} subTitle="审批中" total={spz} height={140} color="#1C3845" />
                </div>
                <div style={{ flex: 1 }}>
                    <Pie percent={ysj / total * 100} subTitle="已上架" total={ysj} height={140} color="#40CF7F" />
                </div>
                <div style={{ flex: 1 }}>
                    <Pie percent={yxj / total * 100} subTitle="已下架" total={yxj} height={140} color="#FE6057"/>
                </div>
            </div>
        </Card>
    )
}

export default Summary;