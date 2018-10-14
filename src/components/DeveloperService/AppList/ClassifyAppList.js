import React, { Component } from 'react';
import { Icon, Pagination, Row, Col, Divider, List, Card } from 'antd';
import { Link } from 'dva/router';
import styles from './ClassifyAppList.less';

const ClassifyAppList = ({ data, pagination, pageChange, parentShowDetail, loading }) => {

    function handleItem() {
        if (data && data.length != 0) {
            const divhtml = data.map((app, index) => {
                if (index != 0 && index / 4 == 0) {
                    return
                    <div><Col span={3} style={{ backgroundColor: 'red' }}>
                        <div className={styles.appIcon}>
                            <img src={app.icon} />
                        </div>
                        <div className={styles.appName}>{app.appName}</div>
                    </Col></div>

                }
            })
        }
    }

    const queryAppDetail = (appId) => {
        parentShowDetail(appId);
    }

    return (
        <div>
            <div style={{ textAlign: 'center', width: '780px', minHeight: '50vh' }}>
                {<ul className={styles.appList}>
                    {
                        (data && data.length != 0) ? (
                            data.map((app, index) => {
                                return (
                                    <li key={index}>
                                        <a onClick={queryAppDetail.bind(this, app.id)}>
                                            <div className={styles.appIcon}>
                                                <img src={app.icon} />
                                            </div>
                                            <div className={styles.appName}><p className={styles.p}>{app.appName}</p></div>
                                        </a>
                                    </li>
                                )
                            })
                        ) : '暂无数据'
                    }
                </ul>}

            </div>
            <div className={styles.pagination}>
                <Pagination
                    total={pagination.total}
                    showTotal={total => `共 ${total} 条`}
                    pageSize={12}
                    defaultPageSize={pagination.defaultPageSize}
                    defaultCurrent={pagination.defaultCurrent}
                    current={pagination.current}
                    pageSizeOptions={['5', '10', '15']}
                    onChange={pageChange}
                    onShowSizeChange={pageChange}
                />
            </div>
        </div>
    )
}

export default ClassifyAppList;