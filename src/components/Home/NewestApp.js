import React, { Component } from 'react';
import { Card } from 'antd';
import Column from 'antd/lib/table/Column';
import styles from './NewestApp.less';

const NewestApp = ({ data }) => {
    return (
        <Card title="最新应用" style={{ width: '100%',height: 270 }}>
            <div className={ styles.container }>
                {
                    (!data || data.length==0) ? '无最新应用':
                    data.map(ele => {
                        return (
                            <div className={ styles.item }>
                                <div>
                                    <div>
                                        <img src={ ele.icon } style={{ width: 50,height: 50 }}/>
                                    </div>
                                    <div>
                                        { ele.name }
                                    </div>
                                    <div>
                                        上架时间
                                        <br />
                                        { ele.date }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </Card>
    )
}

export default NewestApp;