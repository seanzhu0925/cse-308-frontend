import React, { Component } from 'react';
import { Icon, Card, Divider } from 'antd';
import { Link } from 'dva/router';
import styles from './RecommendAppList.less';

const RecommendAppList = ({ data, queryAppDetail }) => {
    return (
        <div style={{ textAlign: 'center', width: '100%' }}>
            {<ul className={styles.appList}>
                {
                    (data && data.length != 0) ? (
                        data.map((app, index) => {
                            return (
                                <li key={index}>
                                    <div onClick={queryAppDetail.bind(this, app.id)}>
                                        <div className={styles.appIcon}>
                                            <img src={app.icon} />
                                        </div>
                                        <div className={styles.appInfo}>
                                            <div style={{ left: 0, height: 25, marginTop: 5 }}>
                                                <span style={{ float: 'left', marginLeft: 5 }}><span style={{ fontSize: 16, fontWeight: 600 }} >{app.appName}</span>&nbsp;&nbsp;<span style={{ fontSize: 8 }}>{app.version}</span></span>
                                            </div>
                                            <div style={{ left: 0, fontSize: 12, height: 20, marginTop: 5 }}>
                                                <span style={{ float: 'left', marginLeft: 5 }}>{app.total}&nbsp;&nbsp;<span>{app.downcount}次下载</span></span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    ) : '暂无数据'
                }
            </ul>}
        </div>
    )
}

export default RecommendAppList;