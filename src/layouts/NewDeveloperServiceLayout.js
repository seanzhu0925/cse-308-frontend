import React, { Fragment } from 'react';
import { Menu, Layout } from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import LoginModal from '../components/Login/LoginModal';
import { getRoutes } from '../utils/utils';
import styles from './NewDeveloperServiceLayout.less';
import RegisterModal from '../components/DeveloperService/Register/RegisterModal';
import Sider from 'antd/lib/layout/Sider';
const { Content, Header } = Layout;

@connect(({ developerServiceMenu }) => {
    return {
        current: developerServiceMenu.current
    }
})
export default class NewDeveloperServiceLayout extends React.PureComponent {

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
                <Header className={styles.header}>
                    <div >
                        <div className={styles.right}>
                            <LoginModal />
                            <RegisterModal
                                visible={this.state.registerVisible}
                                setRegisterVisible={this.setRegisterVisible}
                            />
                            <ul className={styles.menuList}>
                                <li>
                                    <a onClick={this.showLoginModal}>
                                        <img style={{ width: 60, height: 27 }} src={require('../images/login.png')} />
                                    </a>
                                </li>

                                <li>
                                    <a onClick={this.showRegisterModal}>
                                        <img style={{ width: 60, height: 27 }} src={require('../images/register.png')} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Header>
                <Layout className={styles.layout}>
                    <Sider className={styles.sider}>
                        <div >
                            <div className={styles.homePageMenuItem} >
                                <Menu
                                    selectedKeys={[this.props.current]}
                                    onClick={this.handleClick}
                                >
                                    <Menu.Item key="/developerService/home" >
                                        <Link to="/developerService/home">
                                            <div style={{ backgroundColor: '#F9F9F9' }}>
                                                <img className={styles.Menuimg} src={require('../images/homePage.png')} />
                                                <div>首页</div>
                                            </div>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/developerService/ReasourceDown" >
                                        <Link to="/developerService/ReasourceDown">
                                            <div style={{ backgroundColor: '#F9F9F9' }}>
                                                <img className={styles.Menuimg} src={require('../images/resourceDownload.png')} />

                                                <div>资源下载</div>
                                            </div>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/developerService/question" >
                                        <Link to="/developerService/question">
                                            <div style={{ backgroundColor: '#F9F9F9' }}>
                                                <img className={styles.Menuimg} src={require('../images/commonProblem.png')} />
                                                <br />
                                                <span>常见问题</span>
                                            </div>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="http://tjsj.ydjw.sc:8080/forum.php" >
                                        <Link to="http://tjsj.ydjw.sc:8080/forum.php">
                                            <div style={{ backgroundColor: '#F9F9F9' }}>
                                                <img className={styles.Menuimg} src={require('../images/developerForum.png')} />
                                                <br />
                                                <span>开发者论坛</span>
                                            </div>
                                        </Link>
                                    </Menu.Item>
                                    <Menu.Item key="/developerService/contact">
                                        <Link to="/developerService/contact">
                                            <div style={{ backgroundColor: '#F9F9F9' }}>
                                                <img className={styles.Menuimg} src={require('../images/contactUs.png')} />
                                                <br />
                                                <span>联系我们</span>
                                            </div>
                                        </Link>
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </div>
                    </Sider>
                    <Content className={styles.content}>
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
                </Layout>
            </Layout>

        );
    }
}
