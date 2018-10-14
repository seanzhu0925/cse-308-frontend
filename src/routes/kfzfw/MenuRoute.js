import React, { Component } from 'react';
import { Breadcrumb, notification, Button } from 'antd';
import { getRoutes, getMatchRoute } from './../../utils/utils';
import { getRouterData } from './../../common/router';
import { connectAdvanced } from 'react-redux';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

class MenuRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breadcrumblist: [],    //面包絮   path   breadcrumbName   可选id
      url: '',   //当前页面url
      param: {},   //组件 到 某组件的 数据 对象
      paramlist: [],   //组件到某组件的   数据集合对象
      titel: '',     //当前组件的名称
      initurl: this.props.initurl,    //初始页面的url
      inittitel: this.props.inittitel,   //....

    }
  }

  componentDidMount() {   //初始页面
    if (this.state.breadcrumblist.length < 1) {
      let { inittitel, initurl } = this.state;
      let bread = { path: initurl != '' ? initurl : '', breadcrumbName: inittitel }
      let breadlist = [];
      breadlist.push(bread);
      this.setState({
        url: initurl,
        titel: inittitel,
        breadcrumblist: breadlist,


      })
    }
  }


  openPage = (url) => {
    const { initurl } = this.props;
    this.props.openPage({
      routeUrl: initurl,
      targetUrl: url
    })
  }




  getListBread() {       //获取组件列表 
    const html =

      this.state.breadcrumblist.map(item =>
        <Breadcrumb.Item key={item.path} onClick={this.changeBreadState.bind(this, { id: item.id, path: item.path, breadcrumbName: item.breadcrumbName, param: item.param, paramlist: item.paramlist })}>
          {item.breadcrumbName}</Breadcrumb.Item>)


    return html;
  }

  changeBreadState(bread) {
    let { id, path, breadcrumbName } = bread;
    let breadlist = [...this.state.breadcrumblist]
    let newbreadlist = [];
    if (id != '' && id != undefined) {
      for (let i = 0; i < breadlist.length; i++) {
        newbreadlist[i] = breadlist[i]
        if (breadlist[i].id == id) {
          break;
        }

      }
    } else {
      for (let i = 0; i < breadlist.length; i++) {
        newbreadlist[i] = breadlist[i]
        if (breadlist[i].path == path) {
          break;
        }
      }
    }

    this.setState({
      breadcrumblist: newbreadlist,
    })
  }


  delClick() {
    let { breadcrumblist } = this.state;
    let newbreadcrumblist = [];
    if (breadcrumblist.length == 1) {
      notification.error({
        message: "警告",
        description: "根页面不能删除",
        duration: 20,
      });
      return;
    }
    for (let i = 0; i < breadcrumblist.length - 1; i++) {
      newbreadcrumblist.push(breadcrumblist[i])
    }
    // console.log(newbreadcrumblist[newbreadcrumblist.length - 1].path)
    this.setState({
      breadcrumblist: newbreadcrumblist,
      url: newbreadcrumblist[newbreadcrumblist.length - 1].path,
      titel: newbreadcrumblist[newbreadcrumblist.length - 1].titel,
      param: newbreadcrumblist[newbreadcrumblist.length - 1].param,
      paramlist: newbreadcrumblist[newbreadcrumblist.length - 1].paramlist,

    })
  }


  getMatchRoute(path, routerData) {   //匹配面包絮路由
    let routes = Object.keys(routerData).filter(routePath => routePath == path);
    let route = routerData[routes[0]];
    if (route) {
      route.key = path;
    }
    return route || {};
  }

  addCompant(router) {    //添加组件     ****方法父级组件 全局使用
    // console.log(router, "x")
    let breadcrumblists = [...this.state.breadcrumblist]
    if (router.url != "" && router.titel != "") {
      let flag = false;

      for (let i = 0; i < breadcrumblists.length; i++) {
        if ((breadcrumblists[i].path == router.url && (router.id == "" || router.id == undefined)) || (breadcrumblists[i].id == router.id && breadcrumblists[i].path == router.url)) {
          flag = true;
          notification.error({
            message: "添加组件失败",
            description: "检查所传入参数格式 addCompant(this,{id(必选):,url:,titel:,param:{.....}}) 当前参数：url:" + router.url + "titel:" + router.titel,
            duration: 20,
          });
          break;
        }
      }
      if (!flag) {
        breadcrumblists.push({
          path: router.url,
          breadcrumbName: router.titel,
          id: router.id,
          param: router.param,
          paramlist: router.paramlist,


        })

        this.setState({
          breadcrumblist:
            breadcrumblists

        })
      }
    }
  }
  // 格式  {url:''}
  delCompantByUrl(router) {    //删除当前组件   或制定组件    全局组件使用   向下组件
    let breadcrumblist = [...this.state.breadcrumblist];
    let newbreadlist = [];
    if (router) {
      for (let i = 0; i < breadcrumblist.length; i++) {
        if (breadcrumblist[i].path != router.url) {
          newbreadlist.push(breadcrumblist[i])
        }
      }
      this.setState({
        breadcrumblist: newbreadlist,
      })
    } else {
      notification.error({
        message: "删除组件失败",
        description: "检查所传入参数格式 addCompant(this,{id(必选):,url:,titel:,param:{.....}}) 当前参数：url:" + router.url + "titel:" + router.titel,
        duration: 20,
      });
    }

  }

  // 格式  {id:'',url:''}
  delCompantById(router) {    //删除当前组件   或制定组件    全局组件使用   向下组件
    let breadcrumblist = [...this.state.breadcrumblist];
    let newbreadlist = [];
    if (router && router.id != '' && router.url != '') {
      for (let i = 0; i < breadcrumblist.length; i++) {
        if (breadcrumblist[i].path != router.url && breadcrumblist[i].id != router.id && breadcrumblist[i]) {
          newbreadlist.push(breadcrumblist[i])
        }
      }
      this.setState({
        breadcrumblist: newbreadlist,
      })
    } else {
      notification.error({
        message: "删除组件失败",
        description: "检查所传入参数格式 addCompant(this,{id(必选):,url:,titel:,param:{.....}}) 当前参数：url:" + router.url + "titel:" + router.titel,
        duration: 20,
      });
    }

  }

  //预获取数据   放入制定 组件   必要参数  引入router-- service 方法  url  和制定查询参数
  preGetData(routerservice, param) {
    if (routerservice) {
      let data = this.routerservice(param);

      return data;

    }
  }


  render() {
    const getbreadcrumbList = () => {
      const { initurl } = this.props;
      const breadcrumbList = breadcrumbData[initurl];
      return breadcrumbList || [];
    }
    const getCompantDiv = () => {    //获取组件并 渲染到页面     //设置全局方法
      let breadcrumblist = [...this.state.breadcrumblist];

      let path = '';
      let param = {};
      let paramlist = [];
      if (breadcrumblist.length == 0) {
        path = this.state.initurl
        param = this.state.param;
        paramlist = this.state.paramlist;
      } else {
        path = breadcrumblist[breadcrumblist.length - 1].path;
        param = breadcrumblist[breadcrumblist.length - 1].param;
        paramlist = breadcrumblist[breadcrumblist.length - 1].paramlist;
      }
      // const route = this.getMatchRoute(path, this.props.routerData);
      // console.log("initUrl", this.props.initurl)
      const route = this.getMatchRoute(this.props.initurl, this.props.routerData);
      const matchroute = route;
      // console.log("dd", route)
      return (
        <div>
          {
            matchroute ?
              <route.component
                openPage={this.props.openPage}
                delCompantById={this.delCompantById.bind(this)}
                delCompantByUrl={this.delCompantByUrl.bind(this)}
                addCompant={this.addCompant.bind(this)}
                param={param}
                paramlist={paramlist}
                handleTab={this.props.handleTab}  //打开新标签页方法
              />
              : ""
          }
        </div>
      )


    }
    return (
      <div>
        {/* <div className='titel' style={{ height: '10%', marginBottom: '1%' }}>
          <Breadcrumb separator=">">
            {this.getListBread()}
          </Breadcrumb>
        </div> */}
          {
            getCompantDiv()
          }
      </div>
    );
  }
}

export default MenuRoute;
