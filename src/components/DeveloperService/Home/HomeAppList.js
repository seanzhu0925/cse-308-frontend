import React, { Fragment } from 'react';
import { Layout, Icon, message, Tabs, Divider, Card } from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import { appCategory } from '../../../common/init';
import { getDefaultId } from '../../../utils/utils'
import Sider from 'antd/lib/layout/Sider';
import styles from './HomeAppList.less';
import HomeRankingAppList from './HomeRankingAppList';
import RecommendAppList from './RecommendAppList';

const { Content, Header, Footer } = Layout;
const TabPane = Tabs.TabPane;

@connect(({ applist,loading }) => {
    const { rankingAppList, commonAppList, recommendAppList, hotAppList ,onLineAppCount,appTotal} = applist;
    return {
        rankingAppList,
        commonAppList,
        recommendAppList,
        hotAppList,
        onLineAppCount,
        appTotal,
        loading: loading.effects['applist/queryHomePageAppList'],
    }
})

export default class HomeAppList extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            rankingAppList: []
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'applist/queryAppCountOfOnlineAndTotal'
        }).then(()=>{
            this.props.dispatch({
                type: 'applist/queryHomePageAppList'
            });
        })
        
    }

    componentWillUnmount() {
        this.props.setSelectTypeId(this.state.selectTypeId);
        this.props.dispatch({
            type: 'applist/resetState'
        })
    }


    queryAppDetail = (id) => {
        this.props.showDetail(id, 'fromHomePage');
    }

    getMoreAppList = () => {
        this.props.setSelectTypeId([getDefaultId(appCategory)]);
        this.props.clearAppList();
        this.props.changeCurrentType('moreApp');
    }

    render() {
        const operations =  <div className={styles.appStatistics}>
                                <div>                               
                                <span >已上线{this.props.onLineAppCount}款应用</span>
                                <span style={{ marginLeft: '5%' }}>应用总下载量：{this.props.appTotal}次</span>
                                </div>
                            </div>;
        return (
            <div className={styles.homeAppList}>
                <Layout>
                    <Header className={styles.header}>
                        <div style={{ height: 50, width: '100%' }}>
                            <div style={{ height: 50, width: '100%' }}>
                                <Divider type="vertical" className={styles.dividerClass} style={{ width: 10, height: 30, float: 'left', backgroundColor: '#76E091', marginTop: 11 }} />
                                <div style={{ height: 50, fontSize: 20, fontWeight: 'bold', float: 'left', display: 'flex', alignItems: 'center' }}>移动应用</div>
                                <div style={{ float: 'right', fontSize: 14 }}>
                                    <a onClick={this.getMoreAppList}> 查看更多>></a>
                                </div>
                            </div>

                        </div>
                    </Header>
                    <Layout >
                        <Content className={styles.content}>                            
                            <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                                <TabPane tab="常用应用" key="1">
                                    <RecommendAppList data={this.props.commonAppList} queryAppDetail={this.queryAppDetail} />
                                </TabPane>
                                <TabPane tab="推荐应用" key="2">
                                    <RecommendAppList data={this.props.recommendAppList} queryAppDetail={this.queryAppDetail} />
                                </TabPane>
                                <TabPane tab="热门应用" key="3">
                                    <RecommendAppList data={this.props.hotAppList} queryAppDetail={this.queryAppDetail} />
                                </TabPane>
                            </Tabs>
                        </Content>
                        <Sider className={styles.sider}>
                            <HomeRankingAppList queryAppDetail={this.queryAppDetail} rankingAppList={this.props.rankingAppList} loading={this.props.loading} />
                        </Sider>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
