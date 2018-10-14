import React, { Fragment } from 'react';
import { Menu, Layout, Icon, message, Tabs, Divider } from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import LoginModal from '../../../components/Login/LoginModal';
import { getRoutes } from '../../../utils/utils';
import { getMenuData } from '../../../common/menu';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const { Content, Header, Footer } = Layout;

@connect(({ register }) => {
    return {
        headTitle: register.headTitle
    }
})
export default class RegisterLayout extends React.PureComponent {

    
    render() {
        const registerpage = this.props.history.location.pathname;
        const pathname = registerpage.split('/');
        let  titel = pathname[3] == 'person' ? '个人注册' : pathname[3] == 'company' ? '企业用户注册' : pathname[3] =='police' ?'机关部门注册' : '用户注册页面';
        const { routerData, match } = this.props;
        return (
            <Layout>
                <Header style={{ backgroundColor: '#6a9dd2', padding: 0,color: '#FFF',fontSize: 24,textAlign: 'center' }}>
                    {titel}
                </Header>
                <Content style={{ width: '100%', backgroundColor: '#FFF', marginBottom: 30 }}>
                    <Switch>
                        {getRoutes(match.path, routerData).map(item => (
                            <Route
                                key={item.key}
                                path={item.path}
                                component={item.component}
                                exact={item.exact}
                            />
                        ))}
                        <Redirect exact from="/developerService/register" to="/developerService/register/index" />
                    </Switch>
                </Content>
                <Footer style={{
                    backgroundColor: '#212639',
                    width: '100%',
                    color: '#FFF',
                    textAlign: 'center',
                    padding: 5,
                    fontSize: 12,
                    position: 'fixed',
                    bottom: 0
                }}>
                    <span>四川省公安厅科技信息化处</span>
                </Footer>
            </Layout>
        );
    }
}
