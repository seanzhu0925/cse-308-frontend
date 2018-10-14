import { Component } from 'react';
import styles from './ResourceFile.less'
import Drophandle from './../../../components/DeveloperService/console/Drophandle'
import ResourceFileDetail from './ResourceFileDetail'
import { connect } from 'dva';

import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider,Input ,Row,Col,Table,Popconfirm,Dropdown,Menu,Checkbox, Pagination

, Collapse,Select,Modal } from 'antd';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;

 
const documnetcolunmss =[
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




@connect(({ appservices, loading }) => {
    
    return {
        appservices,
        loading: loading.effects['appservices/querylist'],
    }
  })
export default class ResourceFile extends  Component{
    constructor(props){
        super(props)
        this.state = {
            visiable : false,
        }
        
    }
    

    handerTableCoulm =(culcolumns) => {
        const newcolums = [...this.props.culcolumns];
        const type = this.props.tabletype;
        let  htmlaction = {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div><a style={{color:'#6A97C2'}} 
              onClick={this.handleLookModel.bind(this,{record})}
              >详情</a>&nbsp;&nbsp;&nbsp;</div>
            )
       
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
    
    onOk(value){
        alert(value)
    }
    render(){

        return (
        <div className={styles.pancontainer}> 
        <Modal
        title={<div style={{fontSize:'20px'}}>服务资源接口详细</div>}
        visible={this.state.visiable}
        width={700}
        maskClosable={false}
        destroyOnClose = {true}
        onCancel = {this.handleCancel}
        className={styles.hendenbutton}
        >
        <ResourceFileDetail documnetcolunms={documnetcolunmss}/>
        </Modal>
            
                <div className={styles.cardtitel} style={{width:'100%',margin:'auto'}}>
                 
                    <Collapse defaultActiveKey={['1']} bordered='false'>
                    <Panel header={<div><Icon type="search" /><span>查询条件</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">
                    
                    <div className='tab1' style={{margin:'auto'}}>
                    <Row gutter={24}>
                    <Col span={8}><span style={{color:'#8D8F91'}}>中文名称：</span>
                         <Input id='servicename'  value={this.props.servicename} onChange={this.props.servicenamehandleChange}  placeholder="请输入接口名称" style={{width:'80%'}}/>
                         </Col>
                         <Col span={8} ><span style={{color:'#8D8F91'}}>分组名称：</span>
                         <Select
                         showSearch
                         style={{ width: 300 }}
                         optionFilterProp="children"
                         onChange={this.props.appapigrouphandleChange}
                         value={this.props.appapigroup}
                         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                       >
                         <Option value="查询所有">查询所有</Option>
                         <Option value="查询所有1">查询所有1</Option>
                         <Option value="查询所有2">查询所有2</Option>
                       </Select>
                         </Col>
                         <Col span={8}  ><span style={{color:'#8D8F91'}}>是否有文档：</span>
                         <Select
                         showSearch
                         style={{ width: 300 }}
                         optionFilterProp="children"
                         onChange={this.props.isdocumenthandleChange}
                         value={this.props.isdocument}
                         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                       >
                         <Option value={0}>有</Option>
                         <Option value={1}>无</Option>
                       </Select>
                       </Col>
                        </Row>
                       <Row style={{marginTop:'2%'}}> 
                         <Col span={9}>时间范围：<DatePicker
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
                     />
                       </Col>             
                         <Col offset={10} span={4} >
                         <Button type="primary" icon="retweet" onClick={this.props.onChangeReset} >重置</Button>
                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                         <Button type="primary" icon="search" onClick={this.props.queryClick}>查询</Button></Col>
                        </Row>
                        
                    </div>
                      
                        </Panel>
                        </Collapse>
                    <div className={styles.tablelist} style={{marginTop:'4%'}}>
                   
                    <div style={{textAlign:'right',width:'60%',marginBottom:'0.5%',marginLeft:'39.9%'}}>
                    <ButtonGroup>
                        <Button onClick={this.props.reloadClick}><Icon type="reload" /></Button>
                        <Button onClick={this.props.profileClick}><Icon type="profile" /></Button>  
                        <Drophandle dropchange={this.props.dropchange} styles={this.props.styles} columns={this.props.columns} onChange={this.props.dropchange} dataSource={this.props.dataSource}></Drophandle>
                    </ButtonGroup>                    
                    </div>
                    
                    <Table  
                    dataSource={this.props.titelcardssPaginationSet.dataSource} 
                    bordered columns={this.handerTableCoulm()}
                    pagination={this.props.pagination}
                    rowKey = {(item)=>item.id}
                   />
                        </div>                
           
        </div>
           
        </div>
        );
    }
}


