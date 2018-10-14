import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, [], () => import('../layouts/BasicLayout')),
    },
    '/home': {
      component: dynamicWrapper(app, [], () => import('../routes/Home/Home')),
    },
    '/ui': {
      component: dynamicWrapper(app, ['equipment'], () => import('../routes/UI/UI')),
    },
    '/dashboard/analysis': {
      component: dynamicWrapper(app, ['chart'], () => import('../routes/Dashboard/Analysis')),
    },
    '/dashboard/monitor': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/Monitor')),
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, ['project', 'activities', 'chart'], () =>
        import('../routes/Dashboard/Workplace')
      ),
      // hideInBreadcrumb: true,
      // name: '工作台',
      // authority: 'admin',
    },
    '/console': {
      name: '主页',
      component: dynamicWrapper(app, ['consolesss'], () => import('../routes/kfzfw/Consoles')),
    },
    // '/console/yygk': {
    //   name: '应用概览',
    //   component: dynamicWrapper(app, ['applist'], () => import('../routes/kfzfw/yygk/FristPage')),
    // },
    '/console/appManage': {
      name: '应用管理',
      component: dynamicWrapper(app, ['appManage'], () => import('../routes/AppManage/AppManage')),
    },
    '/console/appManage/add': {
      component: dynamicWrapper(app, ['appManage'], () => import('../routes/AppManage/AddApp')),
    },
    '/console/appManage/edit': {
      component: dynamicWrapper(app, ['appManage'], () => import('../routes/AppManage/EditApp')),
    },
    '/console/ptgg': {
      name: '平台公告',
      component: dynamicWrapper(app, ['plafom'], () => import('../routes/kfzfw/ptgg/FristPage')),
    },
    '/console/dtxq': {
      name: '动态详情',
      component: dynamicWrapper(app, ['consolesss'], () => import('../routes/kfzfw/ptgg/FristPageDetail')),
    },
    '/console/yyxqs': {
      name: '应用详情',
      component: dynamicWrapper(app, ['consolesss'], () => import('../components/DeveloperService/console/AppDetailPage')),
    },
    '/console/cjdsgl': {
      name: '创建待审管理',
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/cjdsgl/FristPage')),
    },
    '/console/yycj': {
      name: '应用创建',
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/cjdsgl/AppCreate'))
    },
    '/console/yyxg': {
      name: '应用修改',
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/cjdsgl/AppUpdatePage'))
    },
    '/console/djyygl': {
      name: '待检应用管理',
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/djyygl/FristPage'))
    }
    ,
    '/console/djyyxq': {
      name: '应用详情',
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/djyygl/AppDetailPage'))
    },

    '/console/fbdsgl': {
      name: '发布待审管理',
      component: dynamicWrapper(app, ['appPublish'], () => import('../routes/kfzfw/fbdsgl/FristPage'))
    }
    ,
    '/console/fbsq': {
      name: '发布详情',
      component: dynamicWrapper(app, ['appPublish'], () => import('../routes/kfzfw/fbdsgl/AppReleaseDetaIlPage'))
    },
    '/console/fbsqxg': {
      name: '发布申请',
      component: dynamicWrapper(app, ['appPublish'], () => import('../routes/kfzfw/fbdsgl/AppUpdateOrAddPage'))
    },
    '/console/fbsqzy': {
      name: '发布填写与修改',
      component: dynamicWrapper(app, ['appPublish'], () => import('../routes/kfzfw/fbdsgl/AppReleaseFormPage'))
    }
    ,
    '/console/test': {
      name: 'test',
      component: dynamicWrapper(app, [], () => import('../components/DeveloperService/MutipleSelectForList/MutipleSelectForList')),
    },
    // '/console/sjyygl': {
    //   name: '上架应用管理',
    //   component: dynamicWrapper(app, ['applist'], () => import('../routes/kfzfw/sjyygl/FristPage')),
    // },
    // '/console/lsbb': {
    //   name: '历史版本',
    //   component: dynamicWrapper(app, ['applist'], () => import('../routes/kfzfw/sjyygl/FristPageDetail')),
    // },
    // '/console/lsbbxq': {
    //   name: '历史应用详情',
    //   component: dynamicWrapper(app, ['applist'], () => import('../routes/kfzfw/sjyygl/AppsHistoryVersionPage')),
    // },
    // '/console/yyxq': {
    //   name: '应用详情',
    //   component: dynamicWrapper(app, ['applist'], () => import('../routes/kfzfw/sjyygl/AppHistoryPageDetailFristpage')),
    // }
    // ,
    // '/console/yygx': {
    //   name: '应用更新',
    //   component: dynamicWrapper(app, ['applist'], () => import('../routes/kfzfw/sjyygl/AppUpdateInfo')),
    // },
    '/servicemanager/myservice': {
      name: '我的服务',
      component: dynamicWrapper(app, ['appservices'], () => import('../routes/kfzfw/wdfw/FristPage')),
    },
    '/servicemanager/cservice': {
      name: '创建服务',
      component: dynamicWrapper(app, ['appservices'], () => import('../routes/kfzfw/wdfw/CreatServicePage')),
    },
    '/servicemanager/myservicedetail': {
      name: '服务状态',
      component: dynamicWrapper(app, ['appservices'], () => import('../routes/kfzfw/wdfw/MyServiceListDetail')),
    },
    '/servicemanager/moredetail': {
      name: '服务详情',
      component: dynamicWrapper(app, ['appservices'], () => import('../routes/kfzfw/wdfw/ServiceDetailPage')),
    },
    '/servicemanager/resourcefile': {
      name: '公开服务',
      component: dynamicWrapper(app, ['appservices'], () => import('../routes/kfzfw/fwzyml/FristPage')),
    },
    '/appcomponents': {
      name: '应用组件',
      component: dynamicWrapper(app, ['appcompants'], () => import('../routes/kfzfw/yyzj/FristPage')),
    },


    // '/feedback': {
    //   name: '新增建议反馈666',
    //   component: dynamicWrapper(app, [], () => import('../routes/kfzfw/yjfk/FirstPage')),
    // },



    // '/feedback': {
    //   name: 'User Information',
    //   component: dynamicWrapper(app, ['feedback'], () => import('../routes/Feedback/Feedback')),
    // },

    '/sysAdmin/usersInfo': {
      name: 'User Information',
      component: dynamicWrapper(app, ['feedback'], () => import('../routes/Feedback/UsersInfo')),
    },
    '/UserCreate': {
      name: 'Add New User',
      component: dynamicWrapper(app, [], () => import('../routes/Feedback/UserCreate')),
    },

    // '/createfeedback': {
    //   name: '新增反馈',
    //   component: dynamicWrapper(app, [], () => import('../routes/Feedback/FdCreate')),
    // },

    '/fddetail': {
      name: '反馈详情',
      component: dynamicWrapper(app, [], () => import('../routes/Feedback/FdDetail')),
    },



    '/myinfo/basicInfo': {
      name: '基本资料',
      component: dynamicWrapper(app, ['basicInfo'], () => import('../routes/AccountManage/BasicInfo')),
    },
    '/myinfo/passwordChange': {
      name: '修改密码',
      component: dynamicWrapper(app, ['basicInfo'], () => import('../routes/AccountManage/PasswordChange')),
    },


    '/form/basic-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/BasicForm')),
    },
    '/form/step-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
    },
    '/form/step-form/info': {
      name: '分步表单（填写转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step1')),
    },
    '/form/step-form/confirm': {
      name: '分步表单（确认转账信息）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
    },
    '/form/step-form/result': {
      name: '分步表单（完成）',
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
    },
    '/form/advanced-form': {
      component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
    },
    '/list/table-list': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/TableList')),
    },
    '/list/basic-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
    },
    '/list/card-list': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/CardList')),
    },
    '/list/search': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/List')),
    },
    '/list/search/projects': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Projects')),
    },
    '/list/search/applications': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Applications')),
    },
    '/list/search/articles': {
      component: dynamicWrapper(app, ['list'], () => import('../routes/List/Articles')),
    },
    '/profile/basic': {
      component: dynamicWrapper(app, ['profile'], () => import('../routes/Profile/BasicProfile')),
    },
    '/profile/advanced': {
      component: dynamicWrapper(app, ['profile'], () =>
        import('../routes/Profile/AdvancedProfile')
      ),
    },
    '/result/success': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Success')),
    },
    '/result/fail': {
      component: dynamicWrapper(app, [], () => import('../routes/Result/Error')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
    },
    '/user/register-result': {
      // component: dynamicWrapper(app, [], () => import('../routes/User/RegisterRessetItemult')),
    },
    '/developerService': {
      component: dynamicWrapper(app, ['developerServiceMenu'], () => import('../layouts/NewDeveloperServiceLayout')),
    },
    '/developerService/home': {
      component: dynamicWrapper(app, ['notice','appDetailInfo'], () => import('../routes/developService/HomePage/NewHome')),
    },
    // '/developerService/appList': {
    //   component: dynamicWrapper(app, ['app'], () => import('../routes/developService/AppList')),
    // },
    '/developerService/question': {
      component: dynamicWrapper(app, ['developerProblem'], () => import('../routes/developService/DeveloperProblem/DeveloperProblem')),
    },
    '/developerService/ReasourceDown': {
       component: dynamicWrapper(app, ['resources'], () => import('../routes/developService/rscDownload/RscDownload')),
      //component: dynamicWrapper(app, ['app'], () => import('../routes/developService/ReasourceDown')),
    },
    '/developerService/contact': {
      component: dynamicWrapper(app, ['app'], () => import('../routes/developService/lxwm/CallUs')),
    }
    , '/developerService/palaformNotice': {
      component: dynamicWrapper(app, ['app'], () => import('../routes/developService/ptgg/PlafomNoticce')),
    },
    '/developerService/appdetailinfo': {
      component: dynamicWrapper(app, ['app'], () => import('../routes/developService/yyck/AppDetailInfo')),
    }
    ,
    '/developerService/ReasourceDown/Appresource': {
      component: dynamicWrapper(app, ['app'], () => import('../routes/developService/zyxz/ydyykf/AppResourcePage')),
    },
    '/developerService/register': {
      component: dynamicWrapper(app, ['register'], () => import('../routes/kfzfw/kfzfwzc/RegisterLayout')),
    },

    '/developerService/register/person': {
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/kfzfwzc/PersonRegister')),
    },
    '/developerService/register/index': {
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/kfzfwzc/RegisterIndex')),
    },
    '/developerService/register/company': {
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/kfzfwzc/CompanyRegister')),
    },
    '/developerService/register/police': {
      component: dynamicWrapper(app, [], () => import('../routes/kfzfw/kfzfwzc/PoliceRegister')),
    },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
