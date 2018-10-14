import { Component } from 'react';
import { connect } from 'dva';
import styles from './AppDetailInfo.less'
import { Divider, Card, Row, Col, Tag } from 'antd';
import CommentList from './CommentList';
import request from '../../../utils/request';
import querystring from 'querystring';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

@connect(({ appDetailInfo, loading }) => {
    const { appInfo,screenshotList, commontList,commontTotal,downcount,appScore,pagination } = appDetailInfo;
    return {
        appInfo,
        screenshotList,
        commontList,
        commontTotal,
        downcount,
        appScore,
        pagination,
        loading: loading.effects['appDetailInfo/queryAppDetailInfo'],
    }
})
class AppDetailInfo extends Component {
    constructor(props) {
        super(props)
        let id = this.props.appId;
        this.state = {
            id: id,
            appInfo:{},
            screenshotList:[],
            commontList:[],
            score: 0,
            downcount: 0,
            ratecount: 0
        }
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'appDetailInfo/queryAppDetailInfo',
            id: this.state.id
        });
    }

    componentWillUnmount(){
        this.props.dispatch({
            type:'appDetailInfo/resetState'
        });
    }

    pageChange = (current, pageSize) => { 
        this.props.dispatch({
            type: 'appDetailInfo/pageChange',
            payload: {
                current,
                pageSize
            }
        })
    }

    changeBreadcrumbList = () => {
        let fromPage = this.props.fromPage;
        let list;
        switch (fromPage) {
            case 'fromHomePage':
                list = [
                    { title: '首页', callBackParams: ['homePage'] },
                    { title: '移动应用详情' }
                ]
                break;
            case 'fromMoreApp':
                list = [
                    { title: '首页', callBackParams: ['homePage'] },
                    { title: '移动应用', callBackParams: ['moreApp'] },
                    { title: '移动应用详情' }
                ]
                break;
            default:
                break;
        }
        return list;
    }


    changeCurrentType = (callBackParams) => {
        this.props.changeCurrentType(callBackParams[0])
    }

    render() {
        var screenshotList= [];
        var commontList = [];
        var commontTotal = '';
        var downcount = '';
        var appScore = '';
        if(this.props.appInfo){
            var { appId,appName,appIntroduction,version,developer,contactPhone,sysAcquisitionTime,contactEmail } = this.props.appInfo;
            screenshotList= this.props.screenshotList;
            commontList = this.props.commontList;
            commontTotal = this.props.commontTotal;
            downcount = this.props.downcount;
            appScore = this.props.appScore;
        }      
        
        return (
            <div style={{ marginTop: 24 }}>
                <div style={{ marginLeft: 10 }}>
                    <PageHeaderLayout breadcrumbList={this.changeBreadcrumbList()} callBackMethod={this.changeCurrentType} />
                </div>
                <div className={styles.box} >
                    <div className={styles.bg} ></div>
                    <Card style={{ opacity: '0.9', width: '55%', height: '100%', margin: 'auto' }} title={<span><h2 style={{ fontWeight: 'bold' }}>APP 预览</h2></span>}>
                        <div className='titelapp' style={{ margin: 'auto' }}>
                            <Row gutter={16} className={styles.rowstyle}>
                                <Col style={styles.colstyleicon} span={5} style={{ textAlign: 'center' }}>
                                    <img style={{ borderRadius: '20%' }} width='100%' height='100%' src={appId} />
                                </Col>
                                <Col className={styles.colstyletext} span={19}>
                                    <li style={{ fontSize: '2em', fontWeight: 'bold', color: '#1E1E1E' }}>{appName}</li>
                                    <li><span style={{ color: '#F3AB37' }}>{appScore}分</span><span style={{ color: '#686763', marginLeft: '5%' }} >{commontTotal}条评价</span>
                                        <span style={{ color: '#686763', marginLeft: '5%', marginTop: '20%' }}>版本号：{version}</span><span style={{ color: '#686763', marginLeft: '5%' }}>下载{downcount}次</span>
                                    </li>
                                    <li>
                                        <span style={{ color: '#686763' }}>开发商:{developer}</span>
                                        <span style={{ color: '#686763', marginLeft: '5%', marginTop: '20%' }}>创建时间：{sysAcquisitionTime}</span>
                                    </li>
                                        
                                    <li>
                                        <span style={{ color: '#686763' }}>联系人方式:{contactPhone}
                                        </span><span style={{ color: '#686763', marginLeft: '5%' }} >联系人邮箱:{contactEmail}</span> 
                                    </li>
                                    {/* <li>
                                        <Tag color="#2db7f5"><span style={{ fontWeight: 'bold', fontSize: '1.5em' }}>{}</span></Tag>
                                    </li> */}

                                </Col>
                            </Row>
                        </div>
                        <Divider />
                        <li style={{ fontSize: '1.5em', color: 'black' }}>应用截图</li>
                        <li style={{ marginTop: '2%' }}>
                            { <Row gutter={16} style={{ display: 'flex', flexDirection: 'row' }}>
                                {
                                    screenshotList.map(function (item, index) {
                                        return (
                                            <Col key={index} span={8} style={{ display: 'flex' }}>
                                                <img width='80%' height='90%' src={item} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row> }
                        </li>
                        <Divider />
                        <li style={{ fontSize: '1.5em', color: 'black' }}>应用介绍</li>
                        <li style={{ marginTop: '2%' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{appIntroduction}
                        </li>
                        <Divider />
                        <li style={{ fontSize: '1.5em', color: 'black' }}>评价列表</li>
                        <CommentList pageChange={this.pageChange} pagination={this.props.pagination} commontList={commontList} loading={this.props.loading} />
                    </Card>
                </div>

            </div>

        )
    }
}


export default AppDetailInfo;
