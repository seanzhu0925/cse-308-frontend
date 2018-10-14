import React, { Fragment } from 'react';
import { Menu, Layout, Icon, message, Tabs, Divider } from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import LoginModal from '../components/Login/LoginModal';
import { getRoutes } from '../utils/utils';
import { getMenuData } from '../common/menu';
import styles from './DeveloperServiceLayout.less';
import RegisterModal from '../components/DeveloperService/Register/RegisterModal';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Content, Header, Footer } = Layout;

@connect(({ developerServiceMenu }) => {
    return {
        current: developerServiceMenu.current
    }
})
export default class DeveloperServiceLayout extends React.PureComponent {

    state = {
        registerVisible: false
    }

    handleClick = (e) => {
        if (e.key == 'forum') {
           // window.location.href = 'http://www.baidu.com';
        }
    }

    showLoginModal = () => {
        this.props.dispatch({
            type: 'login/setLoginVisible',
            visible: true
        })
    }

    showRegisterModal = () => {
        this.setRegisterVisible(true);
    }

    setRegisterVisible = (visible) => {
        this.setState({
            registerVisible: visible
        })
    }

    render() {
        const { routerData, match } = this.props;
        return (
            <Layout>
                <Header style={{ backgroundColor: '#FFF', width: '100%', boxSizing: 'border-box', position: 'fixed', left: '0', right: '0', zIndex: '10', boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.20)' }}>
                    <div className={styles.container} style={{ width: '100%', minWidth: '80%', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ fontSize: 24, color: '#000', fontWeight: 'bold', marginLeft: 20 }}>
                            <span>四川新一代移动警务</span>
                        </div>
                        <div style={{  alignItems: 'flex-end' }}>
                            <Menu
                                mode="horizontal"
                                selectedKeys={[this.props.current]}
                                onClick={this.handleClick}
                            >
                                <Menu.Item key="/developerService/home">
                                    <Link to="/developerService/home">首页</Link>
                                </Menu.Item>
                                <Menu.Item key="/developerService/ReasourceDown">
                                    {/* <a target='_blank' href="/developerService/ReasourceDown">资源下载</a> */}
                                    <Link to="/developerService/ReasourceDown">资源下载</Link>
                                </Menu.Item>
                                <Menu.Item key="/developerService/question" >
                                    <Link to="/developerService/question">常见问题</Link>
                                </Menu.Item>
                                <Menu.Item key="/developerService/contact">
                                    <Link to="/developerService/contact">联系我们</Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className={styles.login}>
                            <LoginModal />
                            <RegisterModal
                                visible={this.state.registerVisible}
                                setRegisterVisible={this.setRegisterVisible}
                            />
                            <a onClick={this.showLoginModal}>登录</a>
                            <Divider type="vertical" />
                            <a onClick={this.showRegisterModal}>注册</a>
                        </div>
                    </div>
                </Header>
                <Content style={{ width: '100%', backgroundColor: '#fff', marginTop:64 }}>
                    <Switch>
                        {getRoutes(match.path, routerData).map(item => (
                            <Route
                                key={item.key}
                                path={item.path}
                                component={item.component}
                                exact={item.exact}
                            />
                        ))}
                        <Redirect exact from="/developerService" to="/developerService/home" />
                    </Switch>
                </Content>
                <Footer style={{
                    backgroundColor: '#212639',
                    width: '100%',
                    color: '#FFF',
                    textAlign: 'center',
                    padding: 5,
                    fontSize: 12,
                    overflow: 'hidden',
                    bottom: 0
                }}>
                    <span>四川省公安厅科技信息化处</span>
                </Footer>
            </Layout>
        );
    }
}
