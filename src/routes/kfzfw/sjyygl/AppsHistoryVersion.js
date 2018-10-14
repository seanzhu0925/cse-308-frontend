import React,{ Component } from 'react';
import styles from './AppsHistoryVersion.less'

import { Card, Icon, List,Avatar,Table ,Row,Col,Button

 , Collapse } from 'antd';
 

const Panel = Collapse.Panel;

export default class AppsHistoryVersion extends  Component{
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
                    <Panel header={<div><Icon type="codepen" /><span>最新版本信息</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">

                    <div className='tab1' style={{margin:'auto',width:'80%'}}>
                   
                    
                    <List
                    itemLayout="vertical"
                    size="large"
                    >                    
                      <List.Item
                        actions={[<Button icon="download"><a target="_blank" href='https://www.baidu.com/link?url=qdorqQGhQ3Y2Bg__UeWupyUALwMfG46Ow13wMAJvg28bLVtId9q8jLKqkBmidvTMXyG1rJ_c1eZf8aOXVc7406cbNx8lbMD_50yo4MZHJ47&wd=&eqid=e34bf82c00016ae2000000025ae3e8f0'>获取</a></Button>]}
                        extra = {<img width={272} height={150} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                      >
                        <List.Item.Meta
                          title={<span><h2>{this.props.newdata.appname}</h2></span>}
                          description={<div >版本号：{(this.props.newdata.newdata==undefined || this.props.newdata.newdata==null)?'-':this.props.newdata.appversion}</div>}
                        />
                        <span style={{color:'gray'}}>更新时间：{this.props.newdata.requesttime}</span>
                        </List.Item>
                
                  </List>
                    </div>
                      
                        </Panel>
                        </Collapse>
                    <div className={styles.tablelist} style={{marginTop:'1%'}}>
             
                    <Table  
                    dataSource={this.props.titelcardssPaginationSet.dataSource} 
                    bordered columns={this.handerTableCoulm(this.props.culcolumns)}
                    pagination={this.props.pagination}
                    rowKey = {(item)=>item.id}
                    title={() => <div style={{backgroundColor:'#6796E8'}}><span style={{color:'#fff'}}>{this.props.newdata.appname}---历史版本预览</span></div>}
                   />
                        </div>                
            </Card>
        </div>
           
        </div>
        );
    }
}


