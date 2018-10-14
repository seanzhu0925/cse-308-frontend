import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Carousel, Card, Divider } from 'antd';
import Notice from '../../components/DeveloperService/Home/Notice';
import styles from './Home.less';
import RecommendAppList from '../../components/DeveloperService/Home/RecommendAppList';

@connect(({ notice, loading }) => {
    return {
        noticeList: notice.list,
        noticeLoading: loading.effects['notice/fetch'],
    }
})
export default class Home extends Component {
    state = {
        currentIndex: 0,
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'notice/fetch'
        })
    }

    changeNotice = (action) => {
        let { noticeList, currentIndex } = this.state;
        if (action == 'previous') {
            currentIndex = currentIndex - 1;
        }
        if (action == 'next') {
            currentIndex = currentIndex + 1;
        }
        this.setState({ currentIndex });
    }

    render() {
        return (
            <div className={styles.container} style={{ overflow: 'hidden' }}>
                <div>
                    <Carousel autoplay>
                        <div style={{ background: `url(${require("../../assets/banner1.png")}) center center no-repeat`, width: '100%', height: '383px' }}>
                            {/* <img style={{ width: '100%',height:'50%',overflow: 'hidden' }} src={require('../../assets/banner1.png')}/>*/}
                        </div>
                        <div style={{ background: `url(${require("../../assets/banner2.jpg")}) center center no-repeat`, width: '100%', height: '383px' }}>

                        </div>
                        <div style={{ background: `url(${require("../../assets/banner4.jpg")}) center center no-repeat`, width: '100%', height: '383px' }}>

                        </div>
                    </Carousel>
                </div>
                <div className={styles.content} style={{ backgroundColor: '#FFF' }}>
                    
                    <Card className={styles.notice} bordered={false} loading={this.props.noticeLoading} >
                        <Notice data={this.props.noticeList} currentIndex={this.state.currentIndex} changeNotice={this.changeNotice}/>
                    </Card>
                    {/* <Card className={styles.notice} bordered={false}   >
                        <Card bordered={false} style={{ width: '80%', float: 'right' }} title={<div style={{ fontSize: 20, fontWeight: 'bold' }}>平台公告</div>} extra={<div style={{ flex: 2 }}>
                            <a style={{ textDecoration: "none" }} target='_blank' href='/developerService/palaformNotice'>更多</a>

                        </div>}>

                            <Card style={{ marginTop: '5%', width: '90%', float: 'right' }} bordered={false} title={<div>移动门户网站应用更名</div>} extra={<div>
                                <div className={styles.date}>
                                    <div className={styles.month}>2月</div>
                                    <div>12日</div>
                                </div>
                            </div>}>
                                <div></div>
                            </Card>
                            <div style={{ width: '90%', textAlign: 'center', color: 'gray', paddingTop: '10%', float: 'right' }}>侧向测试测试测试测试</div>
                        </Card>
                    </Card> */}
                    <div className={styles.appList}>
                        <RecommendAppList />
                    </div>

                </div>

            </div>
        );
    }
}