
import React,{ Component } from 'react';
import AppsHistoryVersion from './AppsHistoryVersion'
import styles from './FristPageDetail.less'
import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider, Input, Row, Col, Table, Popconfirm, Dropdown, Menu, Checkbox, notification, Pagination } from 'antd';
import { connect } from 'dva';

const CheckboxGroup = Checkbox.Group;
const operations = <Button>Extra Action</Button>;
const ButtonGroup = Button.Group;



  







  
  const columns = [{
    title: '应用名称',
    dataIndex: 'appname',
    key: 'appname',
  }, {
    title: '开发商',
    dataIndex: 'devlopbuss',
    key: 'devlopbuss',
  }, {
    title: '版本号',
    dataIndex: 'appversion',
    key: 'appversion',
  },
  {
    title: '版本描述',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: '创建时间',
    dataIndex: 'requesttime',
    key: 'requesttime',
  },
  
]
  

@connect(({ applist, loading }) => {
    
    return {
        applist,
        loading: loading.effects['applist/queryhistorydetail'],
    }
  })
export default class FristPageDetail extends  Component{
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
            type:'applist/queryhistorydetail',
            current:this.state.pagination.defaultCurrent,
            pageSize:this.state.pagination.defaultPageSize,
            id:this.props.param.row.sorceid,
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
        this.props.dispatch({
            type:'applist/queryhistorydetail',
            stime:this.state.starttime,
            etime:this.state.endtime,
            querystring: this.state.querystring,
            current: defaultCurrent,
            pageSize: defaultPageSize
        })
    }

    

 
    onInputChange(event){  //获取输入框值
        this.setState({
            querystring:event.target.value,
        })
    }
    onChangeDispatherData(current,pageSize){  //翻页数据请求
        this.props.dispatch({
            type:'applist/queryhistorydetail',
            stime:this.state.starttime,
            etime:this.state.endtime,
            querystring: this.state.querystring,
            current:current,
            pageSize:pageSize,
        })
       
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
     
       <AppsHistoryVersion
         pagination = {this.state.pagination}
         onChange={this.onChange.bind(this)}
         onInputChange={this.onInputChange.bind(this)} 
         queryClick={this.queryClick.bind(this)}
         titelcardssPaginationSet = {this.props.applist.applist.Pagination}
         columns = {this.state.columns}
         culcolumns = {this.state.culcolumns}
         onShowSizeChange = {this.onShowSizeChange.bind(this)}
         newdata = {this.props.applist.applist.newapp}
         addCompant = {this.props.addCompant}
         styles = {styles}
         />

        );
    }
} 