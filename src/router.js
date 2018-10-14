import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import styles from './index.less';

 
const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;
dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  const DeveloperServiceLayout = routerData['/developerService'].component;
  const  RegisterLayout= routerData['/developerService/register'].component;
  //const ReasourceDown = routerData['/developerService/ReasourceDown'].component;
  const plafomnotice  = routerData['/developerService/palaformNotice'].component;
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          {/* <Route path="/user" component={UserLayout} /> */}
          {/* <AuthorizedRoute
            path="/"
            render={props => <BasicLayout {...props} />}
            authority={['admin', 'user']}
            redirectPath="/user/login"
          /> */}
          <Route path='/developerService/palaformNotice' component={plafomnotice} />
          {/* <Route path='/developerService/ReasourceDown' component={ReasourceDown} /> */}
          <Route path='/developerService/register' component={RegisterLayout} />
          <Route path="/developerService" component={DeveloperServiceLayout} />

          
          <Route path="/" component={BasicLayout} />
          
          

        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  );
}

export default RouterConfig;
