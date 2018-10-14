import React,{ Component } from 'react';
import styles from './AppInterfaceInfo.less'

import { Card, Icon, List,Avatar,Table ,Row,Col,Button,Divider

 , Collapse } from 'antd';
 

const Panel = Collapse.Panel;

export default class AppInterfaceInfo extends  Component{
    constructor(props){
        super(props)
        this.state = {
            starttime:'',
            endtime:'',
            querystring:'',
            
            
        }
        
    }
    handerTableCoulm(culcolumns){
        const newcolums = [...this.props.culcolumns];   
        const type = this.props.tabletype
       
         let    htmlaction = {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => 
                 <a style={{color:'#6A97C2'}}   onClick={this.props.addCompant.bind(this,{id:record.id,url:'/console/lsbbxq',titel: '历史版本详情',param:{row:record}})}   >查看详情</a>
           
            }
        
       
        newcolums.push(htmlaction)
        return newcolums;
    }

    
    render(){
        return (
        <div className={styles.pancontainer}>                       
            
                <div className={styles.cardtitel} style={{ background: '#ECECEC', padding: '20px',width:'100%',margin:'auto'}}>
                    <Card width='auto'>
                    <Collapse defaultActiveKey={['1']} bordered='false'>
                    <Panel header={<div><Icon type="codepen" /><span>概况</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">

                    <div className='tab1' style={{margin:'auto',width:'80%'}}>
                   
                    
                    <List
                    itemLayout="vertical"
                    size="large"
                    >                   
                      <List.Item
                        actions={[<Button icon="upload" onClick={this.props.addCompant.bind(this,{url:'/console/yygx',titel:'应用更新'})} >更新</Button>]}
                        extra = {<img width={272} height={150} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                      >
                        <List.Item.Meta
                          title={<span><h2>{this.props.newdata.appname}</h2></span>}
                          description={<div >状态：{(this.props.newdata.newdata==undefined || this.props.newdata.newdata==null)?'-':this.props.newdata.appversion}</div>}
                        />
                        <span style={{color:'gray'}}>用户：{this.props.newdata.requesttime}</span>
                        </List.Item>
                
                  </List>
                  <Divider>应用信息</Divider>
                  <li ><span style={{fontWeight:20}}>应用简介：</span><span>xxxxxxxx</span><br/></li>
                  <li style={{marginTop:'1%'}}><span style={{fontWeight:'20'}}>应用类型：</span><span>xxxxxxxx</span><br/></li>
                  <li  style={{marginTop:'1%'}}><span style={{fontWeight:'20'}}>appkey&nbsp;&nbsp;&nbsp;：</span><span>xxxxxxxx</span><br/></li>
                  </div>
                        </Panel>
                        </Collapse>
                    <div className={styles.tablelist} style={{marginTop:'1%'}}>
             
                    <Table  
                    dataSource={this.props.titelcardssPaginationSet.dataSource} 
                    bordered columns={this.handerTableCoulm(this.props.culcolumns)}
                    pagination={this.props.pagination}
                    rowKey = {(item)=>item.id}
                    title={() => <div style={{backgroundColor:'#6796E8'}}><span style={{color:'#fff'}}>申请总线接口列表</span></div>}
                   />
                        </div>                
            </Card>
        </div>
           
        </div>
        );
    }
}


