import React,{ Component } from 'react';
import styles from './AppRelease.less'
import Drophandle from './../../../components/DeveloperService/console/Drophandle'
import { connect } from 'dva';

import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider,Input ,Row,Col,Table,Popconfirm,Dropdown,Menu,Checkbox, Pagination
, Collapse,Select,Modal } from 'antd';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;

@connect(({ appservices, loading }) => {
    
    return {
        appservices,
        loading: loading.effects['appservices/querylist'],
    }
  })
export default class AppRelease extends  Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
        
    }
    
    handlecCoulmsAction(text, record){
        if (record.requeststate == '未发布审核'){
            return (<div>
                <a style={{color:'#6A97C2'}} 
              onClick={this.props.addCompant.bind(this,{id:record.id,url:'/console/fbsqxg',titel:'发布申请',param:{row:record}})}
              >发布申请</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{color:'#6A97C2'}} 
              onClick={this.props.addCompant.bind(this,{id:record.id,url:'/console/fbsq',titel:'应用详情',param:{row:record}})}
              >应用详情</a></div>)
        }else{
            return (<div>
                <a style={{color:'#6A97C2'}} 
              onClick={this.props.addCompant.bind(this,{id:record.id,url:'/console/fbsqxg',titel:'修改发布申请',param:{row:record}})}
              >修改</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style={{color:'#6A97C2'}} 
              onClick={this.props.addCompant.bind(this,{id:record.id,url:'/console/fbsq',titel:'应用详情',param:{row:record}})}
              >应用详情</a></div>)
        }
        
    }

    handerTableCoulm =(culcolumns) => {
        const newcolums = [...this.props.culcolumns];
        const type = this.props.tabletype;
        let  htmlaction = {
            title: '操作',
            dataIndex: 'action',
            render: (text,record) => this.handlecCoulmsAction(text,record)
       
        }
    
        newcolums.push(htmlaction)
        return newcolums;
        
    }

    handleLookModel=(record) =>{
        this.props.dispatch({
            type:'appservices/appservicesdetail',
            ...record
        })
        this.setState({
            visiable :true
        })
    }

    handleCancel = () =>{
        this.setState({
            visiable: false
        })
    }
    
    render(){

        return (
        <div className={styles.pancontainer}> 
        
            
                <div className={styles.cardtitel} style={{ background: '#ECECEC',width:'100%',margin:'auto'}}>
                    <Card width='auto' bordered={false}>
                    <Collapse defaultActiveKey={['1']} >
                    <Panel header={<div><Icon type="search" /><span>查询条件</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">
                    
                    <div className='tab1' style={{margin:'auto'}}>
                    <Row gutter={16} align='middle'>
                    <Col span={8} offset='1' ><span style={{color:'#8D8F91'}}>时间范围</span><br/>
                    <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="选择开始时间"
                    value={this.props.stime}
                    onChange={this.props.onChangeStime.bind(this)}
                    onOk={this.onOk}
                  />
                  &nbsp;至&nbsp;<DatePicker
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="选择结束时间"
                  value={this.props.etime}
                  onChange={this.props.onChangeEtime.bind(this)}

                  onOk={this.onOk}
                /></Col>
                <Col span={4} offset='1' ><span style={{color:'#8D8F91'}}>审核状态</span><br/>
                <Select placeholder='请选择' style={{width:200}} onChange={this.props.onChangeSelect}>
                    <Option value='1'>dasdas</Option>
                    <Option value='2'>dasdas2</Option>
                    <Option value='3'>dasdas3</Option>
                    <Option value='4'>dasdas4</Option>                
                </Select>

                </Col>
                <Col span={5} offset='1' ><span style={{color:'#8D8F91'}}>应用名称</span><br/>
                <Input placeholder='请输入应用名称' style={{width:'80%'}} onChange={this.props.onInputChange}/>
                </Col>

                       
                    <Col span={2} offset={1}><br/><Button type="primary" icon="search" onClick={this.props.queryClick}>查询</Button></Col>
                    </Row>
                    </div>
                      
                        </Panel>
                        </Collapse>
                    <div className={styles.tablelist} style={{marginTop:'4%'}}>
                    <div style={{width:'100%'}}>
                    
                    <div style={{textAlign:'right',width:'60%',marginBottom:'0.5%',marginLeft:'39.9%'}}>
                    <ButtonGroup>
                        <Button onClick={this.props.reloadClick}><Icon type="reload" /></Button>
                        <Button onClick={this.props.profileClick}><Icon type="profile" /></Button>  
                        <Drophandle dropchange={this.props.dropchange} styles={this.props.styles} columns={this.props.columns} onChange={this.props.dropchange} dataSource={this.props.dataSource}></Drophandle>
                    </ButtonGroup>                    
                    </div>
                    </div>
                    <Table  
                    dataSource={this.props.titelcardssPaginationSet.dataSource} 
                    bordered columns={this.handerTableCoulm()}
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


