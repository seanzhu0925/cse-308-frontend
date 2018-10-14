import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import styles from './CardAppList.less';

const CardAppList = ({ data,addComponent }) => {
    return (
        <div className={styles.container}>
            <Card
                title={<span style={{color:"#fff"}}><Icon type="android" />&nbsp;{data.appname}</span>}
                extra={<a onClick={addComponent.bind(this,{url:'/console/yyxqs',titel: `${data.appname}---应用详情`})}><Icon type="search" />&nbsp;查看详情</a>}
                style={{ width: '95%' }}
            >
                <div className={styles.item}>
                    <div className={styles.icon}>
                        <img src={data.icon} />
                    </div>
                    <div className={styles.detail}>
                        <div className={styles.name}>
                            <div>
                                <span className={styles.title}>应用名称：</span>
                                <span>{data.appname}</span>
                            </div>
                        </div>
                        <div className={styles.type}>
                            <div>
                                <span className={styles.title}>应用类型：</span>
                                <span>{data.type}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default CardAppList;