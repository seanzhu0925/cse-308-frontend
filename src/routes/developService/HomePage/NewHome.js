import React, { Component } from 'react';
import { connect } from 'dva';
import {  Carousel} from 'antd';
import styles from './NewHome.less';
import AppList from './AppList';
import AppDetailInfo from './AppDetailInfo';
import HomeAppList from '../../../components/DeveloperService/Home/HomeAppList';
import DeveloperTitle from '../DeveloperTitle/DeveloperTitle';
import DeveloperTitleDetail from '../DeveloperTitle/DeveloperTitleDetail';


@connect(({ notice}) => {
    const { noticeList } = notice;
    return {
        noticeList,
    }
})
export default class NewHome extends Component {
    state = {
        currentType: 'homePage',
        order: 'first',
        appId: '',
        noticeId: '',
        selectTypeId: '',
        fromPage: 'fromHomePage'
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'notice/queryNoticeList'
        })
    }

   

    changeCurrentType = (param) => {
        this.setState({
            currentType: param,
            fromPage: 'fromHomePage'
        })
    }

    changeNoticeId = (param) => {
        this.setState({
            noticeId:param,
        },()=>{
            this.changeCurrentType('noticeDetail')
        })
    }

    showdetail = (appId, fromPage) => {
        this.setState({
            appId: appId,
            fromPage: fromPage,
            currentType: 'detail'
        })
    }
    clearAppList = () => {
        this.props.dispatch({
            type: 'applist/resetTypeId'
        })
    }
    setSelectTypeId = (selectTypeId) => {
        this.setState({
            selectTypeId: selectTypeId
        })
    }

    render() {
        console.log('noticeList===========',this.props.noticeList)
        const homePage = (
            <div className={styles.container} style={{ overflow: 'hidden' }}>
                <DeveloperTitle noticeList={this.props.noticeList} changeNoticeId={this.changeNoticeId} />
                <div style={{ marginTop: 10 }}>
                    <Carousel autoplay>
                        <div style={{ background: `url(${require("../../../images/imageNotice.png")}) center center no-repeat`, width: '100%', height: '383px' }}/>
                        <div style={{ background: `url(${require("../../../assets/banner2.jpg")}) center center no-repeat`, width: '100%', height: '383px' }}/>
                        <div style={{ background: `url(${require("../../../assets/banner4.jpg")}) center center no-repeat`, width: '100%', height: '383px' }}/>
                    </Carousel>
                </div>
                <div className={styles.content} style={{ backgroundColor: '#FFF' }}>
                    <div className={styles.appList}>
                        <HomeAppList changeCurrentType={this.changeCurrentType} showDetail={this.showdetail} clearAppList={this.clearAppList} setSelectTypeId={this.setSelectTypeId} />
                    </div>
                </div>
            </div>
        )

        const renderContent = {
            homePage: homePage,
            moreApp: <AppList changeCurrentType={this.changeCurrentType} showDetail={this.showdetail} order={this.state.order} selectTypeId={this.state.selectTypeId} setSelectTypeId={this.setSelectTypeId} />,
            detail: <AppDetailInfo changeCurrentType={this.changeCurrentType} appId={this.state.appId} fromPage={this.state.fromPage} />,
            noticeDetail: <DeveloperTitleDetail data={this.state.noticeId} />
        }
        return (
            <div>
                {renderContent[this.state.currentType]}
            </div>
        );
    }
}