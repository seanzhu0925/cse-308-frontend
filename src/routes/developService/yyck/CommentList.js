import { Component } from 'react';
import {Rate,List,Pagination} from 'antd';
import styles from './CommentList.less'
import request from '../../../utils/request';
import querystring from 'querystring';


class CommentList extends Component{
    constructor(props){
        super(props)
      
        this.state={
            id: this.props.id[1],
            data:[],
            pagination:{
                defaultCurrent:1,
                defaultPageSize:5,
                current: 1,//this.getPageSet("current"),
                pageSize: 5, //this.getPageSet("pagesize"),
                simple: true,
                total: 0,//this.getPageSet("total"), 
              
             
                onChange : this.onPageChange.bind(this),
                showTotal :this.onshowTotal.bind(this),
               }
        }
    }
    componentDidMount() {
        let {pagination,id} = this.state;
        this.getData((res) => {              
           pagination.total = res.total;
            this.setState({
              data: res.ratelist ,
              pagination:pagination,
            });
          });
        }

      getData = (callback) => {
      let {current,defaultCurrent,defaultPageSize} = this.state.pagination;
      let {id} = this.state;
      const params = {current:current,pageSize:defaultPageSize,id:id};
      const res =   request(`/api/app/rateList?${querystring.stringify(params)}`)
      res.then((result) => {     
         callback(result)
      }).catch((err) => {        
      })     
    }

    onChangeDispatherData(current,pageSize){  //翻页数据请求
        let {id} = this.state;
        let {pagination} = this.state;
        pagination.current = current;
        pagination.pageSize = pageSize;            
        this.getData((res) => {            
            this.setState({
              data: res.ratelist,
            
            });
          });
       
    }
    
    onPageChange(current,pageSize){  //页码改变
   
       
        this.onChangeDispatherData(current,pageSize);
        //数据量少  防止每次换页都重新渲染页面  和后台获取  
        //判断所查询数据  与 pagesize 是否整除
        /*let {total,dataSource} = this.props.appPublish.Pagination;
        if (dataSource.length%pageSize==0 && total == dataSource.length){}
        else{ this.onChangeDispatherData(current,pageSize);}*/
       
    }
   /* onShowSizeChange(current,pageSize){ //每页显示条数
        this.setState({
            pagination:{
                pageSize: pageSize,
            }
        })
    }*/
    onshowTotal(){   //分页器文字显示
        let {total,current} = this.state.pagination;
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
        return (<div className={styles.ratelistpaganiation}>
                <List
                    
                    itemLayout="horizontal"
                    dataSource={this.state.data}
                    pagination={
                       this.state.pagination
                      }
                    renderItem={item => (
                      <List.Item actions={[<span>{item.ratetime}</span>]}>
                        <List.Item.Meta                       
                          title={<Rate  allowHalf defaultValue={item.rates} disabled/>}
                          description={<div>{item.content}</div>}
                        />
                      </List.Item>
                    )}
                
                />

            
            
            </div>)
    }
}

export default CommentList;