import React from 'react';
import { Menu, Layout,List ,Divider} from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import { getRoutes } from '../../utils/utils';
import { getMenuData } from '../../common/menu';
import styles from './ReasourceDown.less'


const { Content, Header, Footer,Sider } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const data = [{
   title: '移动应用开发',
   url:'/developerService/ReasourceDown/Appresource',
},
{
    title: '测试1',
    url:'/developerService/ReasourceDown/Appresource',
 },
 {
    title: '测试2',
    url:'/developerService/ReasourceDown/Appresource',
 },
    
    
  ];

export default class ReasourceDown extends React.PureComponent {

    
    onSelectItem(item,key,keypath){
       // this.context.router.push(key);
        console.log('x',item,key,keypath)
    }
    render() {
   /*     const registerpage = this.props.history.location.pathname;
        const pathname = registerpage.split('/');*/
       // let  titel = pathname[3] == 'person' ? '个人注册' : pathname[3] == 'company' ? '企业用户注册' : pathname[3] =='police' ?'机关部门注册' : '用户注册页面';
        const { routerData, match } = this.props;
        return (
            <Layout  style={{ color: '#FFF',width:'100%'}}>
                <Header style={{ backgroundColor: '#6a9dd2', padding: 0,color: '#FFF',fontSize: 40,textAlign: 'center'}} >             
                 资源下载                     
                </Header>
                <Layout  style={{ backgroundColor: '#F0F2F5', padding: 0,color: '#FFF',width:'100%',margin:'auto' }}>
                
                <Sider  className={styles.listyle} width={300} style={{backgroundColor:'#fff'}}>
               
                <div style={{color:'#6a9dd2',fontWeight:'bold',fontSize:'1.6em',textAlign:'center',paddingTop:'6%'}}>资源类型
                <Divider/>
                </div>
                <Menu 
                onClick= {this.onSelectItem}
                style={{width:'256',fontWeight:'bold',textAlign:'center',fontSize:'2em'} }  mode="inline"  defaultSelectedKeys = {['0']} >
               
                {
                  
                    
                    data.map(function(item,index){
                        return (
                            <Menu.Item key={index}>
                           <Link to={item.url}>
                           <span>
                           {item.title}
                           </span>
                           </Link>
                            </Menu.Item>
                       
                    )
                    })
                }
                
                </Menu>
               </Sider>
                <Content style={{ width: '70%',marginLeft:'1%'}}>
                <Switch>
                {getRoutes(match.path, routerData).map(item => (
                    <Route
                        key={item.key}
                        path={item.path}
                        component={item.component}
                        exact={item.exact}
                    />
                ))}
               
            </Switch>
                </Content>
              
               </Layout>
            </Layout>
        );
    }
}
