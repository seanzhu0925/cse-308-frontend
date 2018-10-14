
import React,{ Component } from 'react';
//import ExtTable from '../../../components/DeveloperService/EXtable/ExtTable'
import StandardTable from 'components/StandardTable';
import DataPickerPlus from '../../../components/DataPicker/DataPickerPlus'
import CardsAndListByTime from '../../../components/DeveloperService/console/CardsAndListByTime'
import styles from './FristPage.less'
import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider, Input, Row, Col, Table, Popconfirm, Dropdown, Menu, Checkbox, notification, Pagination } from 'antd';
import { connect } from 'dva';

const CheckboxGroup = Checkbox.Group;
const operations = <Button>Extra Action</Button>;
const ButtonGroup = Button.Group; 
  const columns = [{
    title: '动态专题',
    dataIndex: 'theme',
    key: 'theme',
  }, {
    title: '动态内容',
    dataIndex: 'content',
    key: 'content',
  }, {
    title: '操作时间',
    dataIndex: 'actiontime',
    key: 'actiontime',
  }]
  /*{
    title: '操作',
    dataIndex: 'action',
    render: (text, record) => 
        
        <a style={{color:'#6A97C2'}}>查看详情</a>
       
    
  }];*/
  /*const route = getMatchRoute('/console', this.props.routerData);


  const routes =[];
  routes.push(route);*/
  /* [{
    path: 'index',
    breadcrumbName: '首页',
    components: () => routerData['/console/dtxq'].component,
  }, {
    path: 'first',
    breadcrumbName: '一级面包屑'
  }, {
    path: 'second',
    breadcrumbName: '当前页面'
  }];*/



@connect(({ plafom, loading }) => {
    
    return {
        plafom,
        loading: loading.effects['plafom/queryplafommore'],
    }
  })
export default class FristPage extends  Component{
    constructor(props){
        super(props)
        this.state = {
            starttime:'',
            endtime:'',
            querystring:'',
            dataSource: [],
            culcolumns:columns,
            columns:columns,          
            path:'',
            pagination:{
                defaultCurrent:1,
                defaultPageSize:5,
                current: '',//this.getPageSet("current"),
                pageSize:'', //this.getPageSet("pagesize"),
                pageSizeOptions: ['5', '10', '15'],
                showSizeChanger: true,
                total:  0,//this.getPageSet("total"), 
                showQuickJumper: true,
                onShowSizeChange: this.onShowSizeChange.bind(this),
                onChange : this.onPageChange.bind(this),
                showTotal :this.onshowTotal.bind(this),
               }
            
        }
        
    }
    
    componentDidMount(){  //初始获取数据
    console.log(this.props)
        this.props.dispatch({
            type:'plafom/queryplafommore',
            current:this.state.pagination.defaultCurrent,
            pageSize:this.state.pagination.defaultPageSize,
        })
    }

    onChange(dates, dateStrings) {  //时期改变回调
        this.setState({
            starttime:dateStrings[0],
            endtime:dateStrings[1],
            
        })
      }

      
    queryClick(){  //查询按钮 回调
        this.props.dispatch({
            type:'plafom/queryplafommore',
            stime:this.state.starttime,
            etime:this.state.endtime,
            querystring: this.state.querystring,
        })
    }

    

    reloadClick(){   //重载按钮 点击回掉
        this.props.dispatch({
            type:'plafom/queryplafommore',
            current:this.state.pagination.defaultCurrent,
            pageSize:this.state.pagination.defaultPageSize,
        })
    }
    onInputChange(event){  //获取输入框值
        this.setState({
            querystring:event.target.value,
        })
    }
    onChangeDispatherData(current,pageSize){  //翻页数据请求
        this.props.dispatch({
            type:'plafom/queryplafommore',
            stime:this.state.starttime,
            etime:this.state.endtime,
            querystring: this.state.querystring,
            current:current,
            pageSize:pageSize,
        })
       
    }    
    dropchange(checkedValues){   //表格字段自定义过滤列
        let checkedarr = [...checkedValues];
        let newcolunms = [...this.state.columns];
        if (checkedarr.length>0){
        let arr = newcolunms.filter(function(item){
            let flag = false;
            checkedValues.forEach(element => {
             if (item.title == element){
                 flag = true;
                 return ;
             }
            
            });
            
             return flag;   
        })    
        this.setState({
            culcolumns : arr,
        })
    }else{
        notification.error({
            message: "操作失败",
            description: "注意至少保留一个列名",
            duration:20,
          });
    }
    }

    onPageChange(current,pageSize){  //页码改变
        this.setState({
            pagination:{
            current: current,
            pageSize: pageSize,
            }
        })
        //数据量少  防止每次换页都重新渲染页面  和后台获取  
        //判断所查询数据  与 pagesize 是否整除
        let {total,dataSource} = this.props.plafom.plafomlist.Pagination;
        if (dataSource.length%pageSize==0 && total == dataSource.length){}
        else{ this.onChangeDispatherData(current,pageSize);}
       
    }
    onShowSizeChange(current,pageSize){ //每页显示条数
        this.setState({
            pagination:{
                pageSize: pageSize,
            }
        })
    }
    onshowTotal(){   //分页器文字显示
        let {total,current} = this.props.plafom.plafomlist.Pagination;
        let totals = total!=''||total!=undefined? total: 0;
        let currents = current!=''||current!=undefined? current: this.state.pagination.defaultCurrent ;
        if (this.state.pagination.total==""|| this.state.pagination.total==undefined){   //这部防止无线循环 但是仍然要渲染两次
            this.setState({
                pagination:{
                    total:totals,
                } 
            })
        }
        return `总共${totals}条`;
    }
  /*  getPageSet(eve){
        let {total,current,pageSize} = this.props.plafom.plafomlist.Pagination;
        if ("total" ==  eve){
        let totals = total!=''||total!=undefined? total: 0  ;
        alert(totals)
        return totals;
        }
        if ("pagesize"== eve){
        let pagesizes = pageSize!=''|| pageSize!=undefined? pageSize: this.state.pagination.defaultPageSize ;
        return pagesizes;          
        }
        if ("current" == eve){
        let currents =current!=''||current!=undefined? current: this.state.pagination.defaultCurrent;
        return  currents;           
        }
    }*/
 
    render(){
        return (   
        <CardsAndListByTime
         pagination = {this.state.pagination}
         onChange={this.onChange.bind(this)}
         onInputChange={this.onInputChange.bind(this)} 
         queryClick={this.queryClick.bind(this)}
         titelcardssPaginationSet = {this.props.plafom.plafomlist.Pagination}
         columns = {this.state.columns}
         culcolumns = {this.state.culcolumns}
         styles = {styles}
         dropchange = {this.dropchange.bind(this)}
         reloadClick = {this.reloadClick.bind(this)}
         onShowSizeChange = {this.onShowSizeChange.bind(this)}
         addCompant = {this.props.addCompant}
       
         />
        
        );
    }
} 