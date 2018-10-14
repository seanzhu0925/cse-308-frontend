import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon, message, Tabs, Modal } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import { enquireScreen } from 'enquire-js';
import { List } from 'immutable';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import { getRoutes, getMatchRoute } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData } from '../common/menu'
import styles from './BasicLayout.less';;
import logo from '../assets/logo.svg';

import Persioninfo from '../routes/kfzfw/grzl/Persioninfo'
import MenuRoute from '../routes/kfzfw/MenuRoute';
import PageHeaderLayout from './PageHeaderLayout';

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;
const TabPane = Tabs.TabPane;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`,
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {};
  const childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

let isMobile;
// enquireScreen(b => {
//   console.log("b",b);
//   isMobile = b;
// });

@connect(({ userinfo, loading }) => {

  return {
    userinfo,
  }

})
class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  state = {
    isMobile,
    tabPanes: List(),
    activeKey: '',
    visiable: false,
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'userinfo/getinfobycontion',
    })


    const { tabPanes } = this.state;
    const route = getMatchRoute('/console', this.props.routerData);
    route.name = '首页';
    this.setState({
      tabPanes: tabPanes.push(route),
      activeKey: route.key
    });

    // enquireScreen(mobile => {
    //   this.setState({
    //     isMobile: mobile,
    //   });
    // });
    // this.props.dispatch({
    //   type: 'user/fetchCurrent',
    // });
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = '5555555';
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - 555555`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData } = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== '/'
      );
      return authorizedPath;
    }
    return redirect;
  };
  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };
  handleNoticeClear = type => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'));
      return;
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'login/logout',
      });
    }
  };
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  };
  onChange = (key) => {
    this.setState({
      activeKey: key
    })
  }
  onEdit = (key) => {
    if (key == '/console') {
      message.warning('首页标签不能删除');
      return false;
    }
    let tabPanes = this.state.tabPanes;
    let index = tabPanes.findIndex(function (ele) {
      return ele.key == key;
    })
    let activeKey = this.state.activeKey;
    if (index > 0 && activeKey == key) {
      activeKey = tabPanes.get(index - 1).key;
    }
    const route = getMatchRoute(key, this.props.routerData);
    this.setState({
      tabPanes: tabPanes.delete(index),
      activeKey
    });
  }
  getFlatMenuData = (menus) => {
    let keys = {};
    menus.forEach(item => {
      if (item.children) {
        keys[item.path] = { ...item };
        keys = { ...keys, ...this.getFlatMenuData(item.children) };
      } else {
        keys[item.path] = { ...item };
      }
    });
    return keys;
  }
  handleTab = (which) => {
    let key = which.key;
    let tabPanes = this.state.tabPanes;
    let route = getMatchRoute(which.key, this.props.routerData);
    let flag = false; //判断是否是model类型
    if (route.type == 'model') {
      flag = true;
      this.setState({
        visiable: true,
      })
    }
    if(route.current){
      route.current = undefined;
    }
    if (Object.keys(route).length == 0) {
      const menuData = this.getFlatMenuData(getMenuData());
      const name = menuData[key].name;
      key = "/exception/404" + name;
      const route404 = getMatchRoute("/exception/404", this.props.routerData);
      // this.state.tabPanes.forEach((value,key)=>{
      //   console.log("val1",value);
      // })
      route = {
        ...route404,
        name,
        key
      }
    }

    if (!flag) {
      let index = tabPanes.findIndex(function (ele) {
        return ele.key == key;
      })
      if (index < 0) {
        this.setState({
          tabPanes: tabPanes.push(route),
          activeKey: route.key
        });
      } else {
        this.setState({
          activeKey: route.key
        });
      }

    }
  }


  handleCancel = (e) => {
    this.setState({
      visiable: false,
    });
  }

  handleOk = (e) => {
    this.setState({
      visiable: false,
    });
  }

  openPage = ({ routeUrl, targetUrl }) => {
    if (targetUrl) {
      let { tabPanes } = this.state;
      let index = tabPanes.findIndex(function (ele) {
        return ele.key == routeUrl;
      })
      let pane = tabPanes.get(index);
      pane.current = targetUrl;

      this.setState({
        tabPanes: tabPanes.set(index, { ...pane })
      })
    }
  }
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
      userinfo
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const getInitUrl = (pane) => {
      if (pane.current && pane.current != '') {
        return pane.current;
      }
      return pane.key;
    }
    const layout = (
      <Layout>
        <Header style={{ padding: 0, position: 'fixed', width: '100%', zIndex: 999 }}>
          <GlobalHeader
            userinfo={userinfo}
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            collapsed={collapsed}
            isMobile={this.state.isMobile}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
        </Header>
        <Layout style={{ marginTop: 72, width: '100%', marginBottom: -72 }}>
          <SiderMenu
            logo={logo}
            // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
            // If you do not have the Authorized parameter
            // you will be forced to jump to the 403 interface without permission
            Authorized={Authorized}
            menuData={getMenuData()}
            collapsed={collapsed}
            location={location}
            onCollapse={this.handleMenuCollapse}
            onClick={this.handleTab}
          />
          <Layout className={collapsed ? styles.menuClose : styles.menuOpen} style={collapsed ? { marginLeft: 80 } : { marginLeft: 255 }}>
            <Content style={{ margin: '10px 20px 0', overflow: 'initial', marginBottom: 100 }}>
              <Persioninfo data='dasdas' visiable={this.state.visiable} handleCancel={this.handleCancel.bind(this)} handleOk={this.handleOk.bind(this)} />
              <Tabs
                className={collapsed ? styles.menuClose : styles.menuOpen}
                hideAdd
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
              >
                {this.state.tabPanes.map(pane => <TabPane tab={pane.name} key={pane.key} >
                  {
                    // true ? <pane.component handleTab={this.handleTab}/> : ''

                    <MenuRoute
                      openPage={(targetUrl) => { this.openPage({ routeUrl: pane.key, targetUrl }) }}
                      handleTab={this.handleTab}
                      initurl={getInitUrl(pane)}
                      inittitel={pane.name}
                      dispatch={this.props.dispatch}
                      routerData={this.props.routerData}
                    />
                  }
                </TabPane>)}
              </Tabs>
              {/* <Switch>
                {redirectData.map(item => (
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                ))}
                {getRoutes(match.path, routerData).map(item => (
                  <AuthorizedRoute
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="/exception/403"
                  />
                ))}
                <Redirect exact from="/" to={bashRedirect} />
                <Route render={NotFound} />
              </Switch> */}
            </Content>
            <Footer style={{ padding: 0 }}>
              <GlobalFooter
                links={[]}
                copyright={
                  <Fragment>
                    Copyright <Icon type="copyright" /> 2016-2017 公安部第三研究所 版权所有
                </Fragment>
                }
              />
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  //currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(BasicLayout);
