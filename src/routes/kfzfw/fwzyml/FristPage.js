
import { Component } from 'react';
import styles from './FristPage.less'
import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider, Input, Row, Col, Table, Popconfirm, Dropdown, Menu, Checkbox, notification, Pagination } from 'antd';
import moment from 'moment'
import { connect } from 'dva';
import ResourceFile from './ResourceFile';

const CheckboxGroup = Checkbox.Group;
const ButtonGroup = Button.Group;
moment.locale('zh-cn');


  







  
  const columns = [{
    title: '中文名称',
    dataIndex: 'servicename',
    key: 'servicename',
  }, {
    title: '英文名称',
    dataIndex: 'serviceapi',
    key: 'serviceapi',
  }, {
    title: '接口所属分组',
    dataIndex: 'requeststate',
    key: 'requeststate',
  },
  {
    title: '创建时间',
    dataIndex: 'requesttime',
    key: 'requesttime',
  },
  
]
  

@connect(({ appservices, loading }) => {
    
    return {
        appservices,
        loading: loading.effects['appservices/querylist'],
    }
  })
export default class FristPage extends  Component{
    constructor(props){
        super(props)
        this.state = {
           
            appapigroup:'查询所有',
            servicename:'',
            isdocument:'',
            stime:'',
            etime:'',
            fstime:'',
            fetime:'',
            dataSource: [],
            culcolumns:columns,
            columns:columns,          
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
            type:'appservices/querylist',
            current:this.state.pagination.defaultCurrent,
            pageSize:this.state.pagination.defaultPageSize,
        })
    }



      
    queryClick(){  //查询按钮 回调
        let {defaultCurrent,defaultPageSize} = this.state.pagination;
        let {appapigroup,servicename,isdocument,stime,etime} = this.state;
        console.log(this.state)
        this.props.dispatch({
            type:'appservices/querylist',
         
            appapigroup:appapigroup,
            servicename:servicename,
            isdocument: isdocument,
            stime:stime,
            etime:etime,
            current: defaultCurrent,
            pageSize: defaultPageSize
        })
    }

    

    reloadClick(){   //重载按钮 点击回掉
        this.props.dispatch({
            type:'appservices/querylist',
            current:this.state.pagination.defaultCurrent,
            pageSize:this.state.pagination.defaultPageSize,
        })
    }
    onInputChange(event){  //获取输入框值
        this.setState({
            servicename:event.target.value,
        })
    }
    onChangeDispatherData(current,pageSize){  //翻页数据请求
        let {appapigroup,servicename,isdocument,stime,etime} = this.state;
        this.props.dispatch({
            type:'appservices/querylist',  
           
            appapigroup:appapigroup,
            servicename:servicename,
            isdocument: isdocument,
            stime:stime,
            etime:etime,
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
        let {total,dataSource} = this.props.appservice.Pagination;
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
        let {total,current} = this.props.appservices.Pagination;
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
    
  
    appapigrouphandleChange(value){
        this.setState({
            appapigroup: value,
        })
    }
    servicenamehandleChange(value){
      
        this.setState({
            servicename: value.target.value,
        })
    }
  
    onChangeStime(value,dataString){
       
       this.setState({
           fstime: moment(dataString),
           stime:dataString,
       })
      
    }
    isdocumenthandleChange(value){
        this.setState({
            isdocument:value,
        })
    }
    onChangeEtime(value,dataString){
       this.setState({
           fetime: moment(dataString),
           etime:dataString
       })
    }
    onChangeReset(){
        this.setState({
            appapigroup:'查询所有',
            servicename:'',
            isdocument:'',
            stime:'',
            etime:'',
            fstime:'',
            fetime:'',
        })
    }
    render(){
        return (
        <div className={styles.cardtitels} style={{ background: '#F3F3F3',width:'95 %' ,margin:'auto'}}>
            <Card title='公开服务'    bordered={false}  >
       <ResourceFile
         pagination = {this.state.pagination}
         onInputChange={this.onInputChange.bind(this)} 
         queryClick={this.queryClick.bind(this)}
         titelcardssPaginationSet = {this.props.appservices.Pagination}
         columns = {this.state.columns}
         culcolumns = {this.state.culcolumns}
         dropchange = {this.dropchange.bind(this)}
         reloadClick = {this.reloadClick.bind(this)}
         onShowSizeChange = {this.onShowSizeChange.bind(this)}
         styles = {styles}
         addCompant = {this.props.addCompant}

         appapigrouphandleChange = {this.appapigrouphandleChange.bind(this)}
         servicenamehandleChange = {this.servicenamehandleChange.bind(this)}
         isdocumenthandleChange = {this.isdocumenthandleChange.bind(this)}
         onChangeStime = {this.onChangeStime.bind(this)}
         onChangeEtime = {this.onChangeEtime.bind(this)}
         onChangeReset= {this.onChangeReset.bind(this)}

         appapigroup ={this.state.appapigroup}
         servicename = {this.state.servicename}
         isdocument = {this.state.isdocument}
         stime = {this.state.fstime}
         etime = {this.state.fetime}
         />
    </Card>
    </div>
        );
    }
} 