import React, { Component } from 'react';
import { Icon, Card, Divider, List, Tag } from 'antd';
import styles from './DeveloperTitleDetail.less';
const DeveloperTitleDetail =(data)=>{
    console.log("noticeId=========",data);
    return (
        <div style={{ textAlign: 'center', width: '100%' }}>
            {data}
        </div>
    )
}

export default DeveloperTitleDetail;