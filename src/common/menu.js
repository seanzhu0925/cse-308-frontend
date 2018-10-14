import { isUrl } from '../utils/utils';
import { Icon } from 'antd';

const menuData = [{
  name: '应用管理',
  icon: 'appstore',
  path: 'console',
  children: [{
    name: '应用概览',
    path: 'yygk',
  },
  {
    name: '应用管理',
    path: 'appManage',
  },
    // {
    //   name: '应用管理',
    //   path: 'cjdsgl',
    // },
    //  {
    //   name: '待检应用管理',
    //   path: 'djyygl',
    // }, {
    //   name: '发布待审管理',
    //   path: 'fbdsgl',
    // }, {
    //   name: '上架应用管理',
    //   path: 'sjyygl',
    // }, {
    //   name: '更新待审管理',
    //   path: 'path6',
    // }, 
    // {
    //   name: '平台公告',
    //   path: 'ptgg',
    // }, {
    //   name: '平台公告--动态详情',
    //   path: 'dtxq'
    // }, {
    //   name: "test",
    //   path: 'test',
    // }
  ]
}, {
  name: '服务管理',
  icon: 'laptop',
  path: 'servicemanager',
  children: [{
    name: '我的服务',
    path: 'myservice'
  }, {
    name: '公开服务',
    path: 'resourcefile'
  },
    //  {
    //   name: 'test',
    //   path: 'moredetail'
    // }
  ]

}, {
  name: 'System Administrator',
  icon: 'form',
  path: 'sysAdmin',
  children: [{
    name: 'User Infromation',
    path: 'usersInfo',
  }, {
    name: 'Global Parameter',
    path: 'gloParam',
  }]
}, {
  name: '账号管理',
  icon: 'idcard',
  path: 'myinfo',
  children: [{
    name: '基本资料',
    path: 'basicInfo',
  }, {
    name: '修改密码',
    path: 'passwordChange',
  }]
}]
/*const menuData = [
  {
    name: '移动应用管理',
    icon: 'dashboard',
    path: 'app',
    children: [
      {
        name: '菜单一',
        path: 'path1',
      },
      {
        name: '菜单二',
        path: 'path2',
      }
    ],
  },
  {
    name: '在线资源管理',
    icon: 'dashboard',
    path: 'resource',
    children: [
      {
        name: '菜单一',
        path: 'path1',
      },
      {
        name: '菜单二',
        path: 'path2',
      }
    ],
  },
  {
    name: '开发用户管理',
    icon: 'dashboard',
    path: 'developuser',
  },
  {
    name: '应用仓库管理',
    icon: 'dashboard',
    path: 'repository',
  },
  {
    name: '应用类型管理',
    icon: 'dashboard',
    path: 'category',
  },
  {
    name: '应用组件管理',
    icon: 'dashboard',
    path: 'component',
  },
  {
    name: '应用统计',
    icon: 'dashboard',
    path: 'census',
  },
  {
    name: 'UI参考',
    icon: 'appstore-o',
    path: 'ui',
  },
  {
    name:'开发组服务主页',
    Icon:'dashboard',
    path:'console',
  },
  {
    name: '日志管理',
    icon: 'dashboard',
    path: 'log',
    children: [
      {
        name: '菜单一',
        path: 'path1',
      },
      {
        name: '菜单二',
        path: 'path2',
      }
    ],
  },
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: '表单页',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: '基础表单',
        path: 'basic-form',
      },
      {
        name: '分步表单',
        path: 'step-form',
      },
      {
        name: '高级表单',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: '查询表格',
        path: 'table-list',
      },
      {
        name: '标准列表',
        path: 'basic-list',
      },
      {
        name: '卡片列表',
        path: 'card-list',
      },
      {
        name: '搜索列表',
        path: 'search',
        children: [
          {
            name: '搜索列表（文章）',
            path: 'articles',
          },
          {
            name: '搜索列表（项目）',
            path: 'projects',
          },
          {
            name: '搜索列表（应用）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: '详情页',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: '基础详情页',
        path: 'basic',
      },
      {
        name: '高级详情页',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: '成功',
        path: 'success',
      },
      {
        name: '失败',
        path: 'fail',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
];
*/

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    console.log()
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
