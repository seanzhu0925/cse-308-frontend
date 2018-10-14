
import React,{ Component } from 'react';
// import ExtTable from '../../../components/DeveloperService/EXtable/ExtTable'
import StandardTable from 'components/StandardTable';
import DataPickerPlus from '../../../components/DataPicker/DataPickerPlus'
import CardsAndListByTime from '../../../components/DeveloperService/console/CardsAndListByTime'
import styles from './FristPage.less'
import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider, Input, Row, Col, Table, Popconfirm, Dropdown, Menu, Checkbox, notification, Pagination } from 'antd';
import { connect } from 'dva';

const CheckboxGroup = Checkbox.Group;
const operations = <Button>Extra Action</Button>;
const ButtonGroup = Button.Group;

const dataSource = [{
    id: '1',
    appname: '胡彦斌',
    apppackagename: 'dsadas',
  }];
  
  const columns = [{
    title: '应用名称',
    dataIndex: 'appname',
    key: 'appname',
  }, {
    title: '应用版本',
    dataIndex: 'appversion',
    key: 'appversion',
  }, {
    title: '应用包名',
    dataIndex: 'apppackagename',
    key: 'apppackagename',
  },
  {
    title: 'appkey',
    dataIndex: 'appkey',
    key: 'appkey',
  },
  {
    title: '申请时间',
    dataIndex: 'requesttime',
    key: 'requesttime',
  },
  {
    title: '状态',
    dataIndex: 'appstate',
    key: 'appstate',
  },
]
  

@connect(({ applist, loading }) => {
    
    return {
        applist,
        loading: loading.effects['applist/querylist'],
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
                total:  '',//this.getPageSet("total"), 
                showQuickJumper: true,
                onShowSizeChange: this.onShowSizeChange.bind(this),
                onChange : this.onPageChange.bind(this),
                showTotal :this.onshowTotal.bind(this),
               }
            
        }
        
    }
    
    componentDidMount(){  //初始获取数据
        this.props.dispatch({
            type:'applist/querylist',
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
        let {defaultCurrent,defaultPageSize} = this.state.pagination;
        console.log( this.state)
        this.props.dispatch({
            type:'applist/querylist',
            stime:this.state.starttime,
            etime:this.state.endtime,
            querystring: this.state.querystring,
            current: defaultCurrent,
            pageSize: defaultPageSize
        })
    }

    

    reloadClick(){   //重载按钮 点击回掉
        this.props.dispatch({
            type:'applist/querylist',
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
            type:'applist/querylist',
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
        let {total,dataSource} = this.props.applist.applist.Pagination;
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
        let {total,current} = this.props.applist.applist.Pagination;
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
  
 
    render(){
     
        return (
     
       <CardsAndListByTime
         pagination = {this.state.pagination}
         onChange={this.onChange.bind(this)}
         onInputChange={this.onInputChange.bind(this)} 
         queryClick={this.queryClick.bind(this)}
         titelcardssPaginationSet = {this.props.applist.applist.Pagination}
         columns = {this.state.columns}
         culcolumns = {this.state.culcolumns}
         dropchange = {this.dropchange.bind(this)}
         reloadClick = {this.reloadClick.bind(this)}
         onShowSizeChange = {this.onShowSizeChange.bind(this)}
         styles = {styles}
         addCompant = {this.props.addCompant}
         tabletype='applist'
         />

        );
    }
} 