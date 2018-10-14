import { Component } from 'react';
import styles from './FristPage.less'
import { Card } from 'antd';
import { connect } from 'dva';

import AppCompantList from './AppCompantList';
import AppCompantDetail from './AppCompantDetail';

const columns = [{
    title: '组件名称',
    dataIndex: 'appconponentname',
    key: 'appconponentname',
  }, {
    title: '是否默认',
    dataIndex: 'isdefault',
    key: 'isdefault',
  }, {
    title: '创建时间',
    dataIndex: 'creattime',
    key: 'creattime',
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    key: 'creator',
  },
]
const documnetcolunms =[
    {
        title: '文档名称',
        dataIndex: 'documentname',
        key: 'documentname',
      },{
        title: '文档类型',
        dataIndex: 'documenttype',
        key: 'documenttype',
      }
]




@connect(({ appcompants, loading }) => {
    
    return {
        appcompants,
        loading: loading.effects['appcompants/querylist'],
    }
  })
class FristPage extends Component{

    constructor(props){
        super(props)
        this.state = {
            querystring:'',
            dataSource: [],
            dataildata:{},
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
            type:'appcompants/querylist',
            current:this.state.pagination.defaultCurrent,
            pageSize:this.state.pagination.defaultPageSize,
        })
    }

      
    queryClick(){  //查询按钮 回调
        let {defaultCurrent,defaultPageSize} = this.state.pagination;
        console.log( this.state)
        this.props.dispatch({
            type:'appcompants/querylist',
           
            querystring: this.state.querystring,
            current: defaultCurrent,
            pageSize: defaultPageSize
        })
    }

    

    reloadClick(){   //重载按钮 点击回掉
        this.props.dispatch({
            type:'appcompants/querylist',
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
            type:'appcompants/querylist',
            
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
        let {total,dataSource} = this.props.appcompants.Pagination;
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
        let {total,current} = this.props.appcompants.Pagination;
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

    onSelect(e){
        let {id} = e;
       
        if (id == 1){
            this.setState({
                dataildata:{
                    id:"1",
                    componentname:'dsadas',
                    creator:'yan',
                    createtime:'2018-10-12 01:01:01',
                    isdefault:'是',
                    componentinfo:'dasdasdsadsadassssssssssssssssssssssssssssssss哈哈哈哈和'

                }
            })
        }else{
            this.setState({
                dataildata:{
                    id:"2",
                    componentname:'别试了',
                    creator:'测试',
                    createtime:'2018-10-12 01:01:01',
                    isdefault:'是',
                    componentinfo:'等等'

                }
            })
        }
    }
    render(){

        return (<div >
        <Card>
            <div className={styles.cardtitel} style={{backgroundColor:'#fff'}}>
          
                <Card title={<div  style={{textAlign:'left'}}>前端组件数据列表</div>} bordered={false} >
                <AppCompantList
                pagination = {this.state.pagination}
               
                onInputChange={this.onInputChange.bind(this)} 
                queryClick={this.queryClick.bind(this)}
                appcompants = {this.props.appcompants.Pagination}
                columns = {this.state.columns}
                culcolumns = {this.state.culcolumns}
                dropchange = {this.dropchange.bind(this)}
                reloadClick = {this.reloadClick.bind(this)}
                onShowSizeChange = {this.onShowSizeChange.bind(this)}
                styles = {styles}
                onSelect = {this.onSelect.bind(this)}
               
                documnetcolunms = {documnetcolunms}

                dataildata = {this.state.dataildata}
                />
                </Card>
        
          
  </div>
  </Card>
         </div>)
    }
}

export default FristPage;