import { Component } from 'react';
import styles from './AppCompantList.less'
import Drophandle from './../../../components/DeveloperService/console/Drophandle'
import AppCompantDetail from './AppCompantDetail';

import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider,Input ,Row,Col,Table,Popconfirm,Dropdown,Menu,Checkbox, Pagination

, Collapse } from 'antd';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;

export default class AppCompantList extends  Component{
    constructor(props){
        super(props)
        this.state = {
            starttime:'',
            endtime:'',
            querystring:'',
            
            
        }
        
    }
  

    
    render(){

        return (
        <div className={styles.pancontainer}>                       
            
                <div className={styles.cardtitel} style={{ width:'100%',margin:'auto'}}>
                   
                    <Collapse defaultActiveKey={['1']} bordered='false'>
                    <Panel header={<div><span>组件详情</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">
                    
                    <AppCompantDetail documnetcolunms = {this.props.documnetcolunms} dataildata={this.props.dataildata}/>
        
                      
                        </Panel>
                        </Collapse>
                    <div className={styles.tablelist} style={{marginTop:'4%'}}>
                    <div style={{textAlign:'left',width:'50%'}}>
                    <Row gutter={16} align='middle'>
                    <Col span={8}  ><Input placeholder='请输入组件名称' onChange = {this.props.onInputChange}/></Col>
                    <Col span={8} ><Button type="primary" icon="search" onClick={this.props.queryClick}>查询</Button></Col>
               </Row>
                    </div>
                   
                    <Table  
                    
                    dataSource={this.props.appcompants.dataSource} 
                    bordered columns={this.props.culcolumns}
                    pagination={this.props.pagination}
                    rowKey = {(item)=>item.id}
                    onRow={(rescord) =>{
                        return {
                            onClick : this.props.onSelect.bind(this,rescord)
                        }
                    }}
                   
                   />
                        </div>                
           
        </div>
           
        </div>
        );
    }
}


