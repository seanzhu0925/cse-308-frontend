import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Layout, Divider, Tree, Row, Col } from 'antd';
import styles from './AppList.less';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import ClassifyAppList from '../../../components/DeveloperService/AppList/ClassifyAppList';
import { appCategory } from '../../../common/init';
const { Content, Header, Footer, Sider } = Layout;
const TreeNode = Tree.TreeNode;


@connect(({ applist, loading }) => {
    const { list, pagination } = applist;
    return {
        list,
        pagination,
        loading: loading.effects['applist/queryAppListByTypeId'],
    }
})
export default class AppList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeId: '',
            selectTypeId: this.props.selectTypeId,
            autoExpandParent: true,
            current: '',
            breadcrumbList: [{ title: '首页', callBackParams: ['homePage'] }, { title: '移动应用' }],
        };
    }


    componentDidMount() {
        this.props.dispatch({
            type: 'applist/queryAppListByTypeId',
            id: this.state.typeId
        });
    }

    showAppList() {
        this.props.dispatch({
            type: 'applist/queryAppListByTypeId',
            id: this.state.typeId
        });
    }

    componentWillUnmount() {
        this.props.setSelectTypeId(this.state.selectTypeId);
        this.props.dispatch({
            type: 'applist/resetState'
        })
    }

    pageChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'applist/pageChange',
            payload: {
                typeId: this.state.typeId,
                current,
                pageSize
            }
        })
    }

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        this.props.dispatch({
            type: 'app/getListByType',
            appType: e.key
        })
    }

    changeTypeId = (selectedKeys) => {
        this.props.dispatch({
            type: 'applist/resetState'
        });
        this.setState({
            typeId: selectedKeys,
            selectTypeId: selectedKeys
        }, () => {
            this.showAppList();
        });
    }

    //点击app获取app详情
    parentShowDetail = (appId) => {
        this.props.showDetail(appId, 'fromMoreApp');
    }




    changeCurrentType = (callBackParams) => {
        this.props.changeCurrentType(callBackParams[0])
    }
    render() {
        const loop = data => data.map((item) => {
            if (item.children && item.children.length) {
                return <TreeNode key={item.id} title={item.text}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode key={item.id} title={item.text} />;
        });
        return (
            <div style={{ marginTop: 24,width:'100%' }}>
                <Row>
                    <Col span={24} style={{ marginLeft: 10 }}>
                        <PageHeaderLayout style={{ marginLeft: 50 }} breadcrumbList={this.state.breadcrumbList} callBackMethod={this.changeCurrentType} />
                    </Col>
                </Row>
                <Row>
                    <Col span={4}>
                        <div style={{ marginLeft: 50, fontSize: 24, color: 'red' }}>
                            <Tree
                                onExpand={this.onExpand}
                                defaultExpandAll
                                defaultSelectedKeys={this.state.selectTypeId}
                                autoExpandParent={this.state.autoExpandParent}
                                onSelect={this.changeTypeId}
                            >
                                {loop(appCategory)}
                            </Tree>
                        </div>

                    </Col>
                    <Col span={1}>
                        <Divider type="vertical" className={styles.dividerClass} style={{ width: 3, marginTop: 10, marginBottom: 10 }} />
                    </Col>
                    <Col span={19}>
                        <Card className={styles.classifyAppList} bordered={false} style={{ marginLeft: 100 }}>
                            <ClassifyAppList
                                pageChange={this.pageChange}
                                data={this.props.list}
                                pagination={this.props.pagination}
                                typeId={this.state.typeId}
                                parentShowDetail={this.parentShowDetail}
                                loading={this.props.loading}
                            />
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }


}


