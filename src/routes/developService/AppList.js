import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Card, Menu, Layout, List, Divider } from 'antd';
import styles from './AppList.less';

import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import { getMenuData } from '../../common/menu';
import ClassifyAppList from '../../components/DeveloperService/AppList/ClassifyAppList';

const { Content, Header, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
@connect(({ app, loading }) => {
    return {
        list: app.list,
        pagination: app.pagination,
        loading: loading.effects['app/fetch'],
    }
})
export default class AppList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '',


        };
        let winHeight = document.documentElement.clientHeight;
        let winWidth = document.documentElement.clientWidth;
        console.log(winHeight, winWidth)
    }


    componentDidMount() {
        // window.addEventListener('')
        this.props.dispatch({
            type: 'app/fetch'
        })
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'app/resetState'
        })
    }

    pageChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'app/pageChange',
            payload: {
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

    render() {


        return (
            <Layout style={{ color: '#FFF', width: '100%', backgroundColor: '#fff' }}>
                <Layout style={{ backgroundColor: '#fff', color: '#FFF', margin: 'auto' }}>

                    <Sider className={styles.listyle} width={257} style={{
                        backgroundColor: '#fff',
                        /* boxSizing:'border-box',position:'fixed',left:'0',right:'0',zIndex:'9999',boxShadow:'0 2px 4px 0 rgba(0, 0, 0, 0.20)',opacity:'0.8'*/
                    }}>


                        <Menu
                            style={{ width: 256 }}
                            mode="inline"
                            inlineIndent={80}
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                        >
                            <MenuItemGroup key="g1" title="应用类">
                                <Menu.Item key="1">权限类</Menu.Item>
                                <Menu.Item key="2">图书阅读</Menu.Item>
                                <Menu.Item key="3">实用工具</Menu.Item>
                                <Menu.Item key="4">办公软件</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup key="g2" title="终端类">
                                <Menu.Item key="5">平板</Menu.Item>
                                <Menu.Item key="6">手机</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup key="g3" title="应用权限类">
                                <Menu.Item key="7">地州市通用</Menu.Item>
                                <Menu.Item key="8">警种专业</Menu.Item>
                                <Menu.Item key="9">全省通用</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup key="g4" title="应用类">
                                <Menu.Item key="1">权限类</Menu.Item>
                                <Menu.Item key="2">图书阅读</Menu.Item>
                                <Menu.Item key="3">实用工具</Menu.Item>
                                <Menu.Item key="4">办公软件</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup key="g5" title="终端类">
                                <Menu.Item key="5">平板</Menu.Item>
                                <Menu.Item key="6">手机</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup key="g6" title="应用权限类">
                                <Menu.Item key="7">地州市通用</Menu.Item>
                                <Menu.Item key="8">警种专业</Menu.Item>
                                <Menu.Item key="9">全省通用</Menu.Item>
                            </MenuItemGroup>
                        </Menu>
                    </Sider>
                    <Content style={{ width: '100%', marginLeft: '1%' }}>
                        <Card className={styles.classifyAppList} bordered={false}>
                            <ClassifyAppList
                                pageChange={this.pageChange}
                                data={this.props.list}
                                pagination={this.props.pagination}
                            />
                        </Card>
                    </Content>

                </Layout>
            </Layout>

        );
    }


}


