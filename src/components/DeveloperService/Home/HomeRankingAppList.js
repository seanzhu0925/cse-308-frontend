import React, { Component } from 'react';
import { Icon, Card, Divider, List, Tag } from 'antd';
import { Link } from 'dva/router';
import styles from './HomeRankingAppList.less';

const HomeRankingAppList = (props) => {
    return (
        <div className={styles.cardTitel}>
            <Card title='热门排行榜' bordered={1}  >
                <List
                    itemLayout="vertical"
                    size="large"
                    loading={props.loading}
                    dataSource={props.rankingAppList}
                    renderItem={(item, index) => (
                        <List.Item
                            key={item.appId}
                        >
                            <div style={{ cursor: 'pointer' }} onClick={props.queryAppDetail.bind(this, item.appId)}>
                                <List.Item.Meta
                                    title={
                                        <div className={styles.cardContent} >
                                            <div className={styles.content}>
                                                <Tag color={item.ranking == 1 ? "#f50" : (item.ranking == 2 ? "#FFA028" : (item.ranking == 3 ? "#FEC01F" : "#5DD0FF"))}>{item.ranking}</Tag>
                                                &nbsp;&nbsp;{item.appName}
                                            </div>
                                            <div className={styles.downcount}>
                                                {item.downcount}<span style={{ fontSize: 10 }}>&nbsp;次下载</span>
                                            </div>
                                        </div>}
                                />
                            </div>
                        </List.Item>
                    )}
                />
            </Card>
        </div>

    )
}

export default HomeRankingAppList;