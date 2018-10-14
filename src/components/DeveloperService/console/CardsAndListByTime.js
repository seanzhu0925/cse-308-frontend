import React,{ Component } from 'react';
import ExtTable from '../../../components/DeveloperService/EXtable/ExtTable'
import StandardTable from 'components/StandardTable';
import DataPickerPlus from '../../../components/DataPicker/DataPickerPlus'
import CardAndListByTimePagination from './CardAndListByTimePagination'
import styles from './CardsAndListByTime.less'
import Drophandle from './Drophandle'
import ListShow from './ListShow';

import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider,Input ,Row,Col,Table,Popconfirm,Dropdown,Menu,Checkbox, Pagination

, Collapse } from 'antd';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;

export default class CardsAndListByTime extends  Component{
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
        const type = this.props.tabletype;
        let  htmlaction = ""
        if (type== 'applist'){
            console.log(this.props,)
            htmlaction = {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => 
                  <div><a style={{color:'#6A97C2'}} 
                  onClick={this.props.addCompant.bind(this,{id:record.sorceid,url:'/console/lsbb',titel:'历史版本',param:{row:record}})}
                  >历史版本</a>&nbsp;&nbsp;&nbsp;<a style={{color:'#6A97C2'}}   onClick={this.props.addCompant.bind(this,{id:record.sorceid,url:'/console/yyxq',titel:'应用详情',param:{row:record}})}   >查看详情</a></div>
           
            }
        }else{
            htmlaction = {
                title: '操作',
                dataIndex: 'action',
                render: (text, record) => 
                  <a style={{color:'#6A97C2'}} onClick={this.props.addCompant.bind(this,{id:record.id,url:'/console/dtxq',titel: '动态详情',param:{row:record}})} >查看详情</a>
           
            }
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
                    <Panel header={<div><Icon type="search" /><span>查询条件</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">
                    
                    <div className='tab1' style={{margin:'auto'}}>
                    <Row gutter={16} align='middle'>
                         <Col span={8} offset='2' ><span style={{color:'#8D8F91'}}>时间范围</span><br/><DataPickerPlus onChange={this.props.onChange}/></Col>
                         <Col span={8} offset='2'><span style={{color:'#8D8F91'}}>动态主题</span><br/><Input id='theme' onChange={this.props.onInputChange}  placeholder="请输入动态主题" style={{width:'80%'}}/></Col>
                         <Col span={2} ><br/><Button type="primary" icon="search" onClick={this.props.queryClick}>查询</Button></Col>
                    </Row>
                    </div>
                      
                        </Panel>
                        </Collapse>
                    <div className={styles.tablelist} style={{marginTop:'1%'}}>
                    <div style={{textAlign:'right'}}>
                    <ButtonGroup>
                        <Button onClick={this.props.reloadClick}><Icon type="reload" /></Button>
                        <Button onClick={this.props.profileClick}><Icon type="profile" /></Button>  
                        <Drophandle dropchange={this.props.dropchange} styles={this.props.styles} columns={this.props.columns} onChange={this.props.dropchange} dataSource={this.props.dataSource}></Drophandle>
                    </ButtonGroup>                    
                    </div>
                    <Table  
                    dataSource={this.props.titelcardssPaginationSet.dataSource} 
                    bordered columns={this.handerTableCoulm(this.props.culcolumns)}
                    pagination={this.props.pagination}
                    rowKey = {(item)=>item.id}
                   />
                        </div>                
            </Card>
        </div>
           
        </div>
        );
    }
}


