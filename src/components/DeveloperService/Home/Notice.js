import React, { Component } from 'react';
import { Icon } from 'antd';
import styles from './Notice.less';
import Slider from '../Slider/Slider';

const Notice = ({ noticeList }) => {
    return (
        <div className={styles.body}>
            <div className={styles.noticeImage}>
                <img style={{ height: 40 }} src={require('../../../images/notice.png')} />
                <div className={styles.news}>
                    <Slider
                        items={noticeList}
                        speed={1.2}
                        delay={5}
                        pause={true}
                        autoplay={true}
                        dots={false}
                        arrows={true}
                    />
                </div>
            </div>           
        </div>
    )
}

export default Notice;