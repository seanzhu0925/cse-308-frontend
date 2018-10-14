import React,{ Component } from 'react';
import styles from './MyServiceList.less'
import Drophandle from './../../../components/DeveloperService/console/Drophandle'
import Light from './../../../components/DeveloperService/light/Light'
import { connect } from 'dva';
import {disfile} from './Data'
import {ColumsPlusByDictiry} from './../../../components/DeveloperService/ColumsPlus/ColumsPlusByDictiry'

import { Card, Icon, Button,Input ,Row,Col,Table, Pagination,Form,Tag

, Collapse,Select,Modal,Spin } from 'antd';

const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const confirm = Modal.confirm;

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12     },
  };

  
@connect(({ appservices, loading }) => {
    
    return {
        appservices,
        loading: loading.effects['appservices/querylist'],
        loadings :loading.effects['appservices/testServerState']
    }
  })
export default class MyServiceList extends  Component{
    constructor(props){
        super(props)
        this.state = {
            visiable : false,
            culstate:'',
            visiables : false,
            visiabless: false,
            record:{},
        }
    }
    
    handleIsRquerst(record){
       
        if (record.status == 0){
            return ( <div>             
            <a style={{color:'#6A97C2'}} onClick={this.handleLookModel}
            >申请</a>
            &nbsp;&nbsp;&nbsp;&nbsp; <a style={{color:'#6A97C2'}} 
            onClick={this.props.addCompant.bind(this,{id:record.id,url:'/servicemanager/myservicedetail',titel:'服务状态',param:{row:record}})}
             >查看</a>
            &nbsp;&nbsp;&nbsp;&nbsp;<a style={{color:'#6A97C2'}} onClick={this.onhandleTeststate.bind(this,record)}>
              测试</a></div>)
            }
            else{
                return (<div> 
                   
                <a style={{color:'#6A97C2'}} 
                onClick={this.props.addCompant.bind(this,{id:record.id,url:'/servicemanager/myservicedetail',titel:'服务状态',param:{row:record}})}>查看</a>
                &nbsp;&nbsp;&nbsp;&nbsp;<a style={{color:'#6A97C2'}} onClick={this.onhandleTeststate.bind(this,record)}>
                  测试</a></div>)
            }   
    }

    handerTableCoulm =(culcolumns) => {
        const newcolums = [...this.props.culcolumns];
        const type = this.props.tabletype;

        let servertype =  ColumsPlusByDictiry(disfile.wdfw_fwlx,'服务类型','service_type',)
        let status  =ColumsPlusByDictiry(disfile.wdfw_fwzt,'服务状态','status',)

      /*  let serverhtml = {
            title: '服务可用性',
            dataIndex: 'serverstate',
            render: (text, record) => (
                <div>
                  <Light serverstate={record.serverstate}/>
              </div>
            )
        }*/
       

       
       
        let  htmlaction = {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
               <div>
                {
                   this.handleIsRquerst(record)
                }
              </div>
               
            )
       
        }
        newcolums.push(servertype)
        newcolums.push(status)
       // newcolums.push(serverhtml)
        newcolums.push(htmlaction)
        return newcolums;
        
    }
    onhandleTeststate(record){
       
        this.props.dispatch({
            type:'appservices/testServerState',
            id:record.id
        })
        this.setState({
            visiables : true,
        })

    }

    handleLookModel=() =>{
       
        this.setState({
            visiable :true
        })
    }

    handleCancel = () =>{
        this.setState({
            visiable: false,
            visiables: false,
            visiabless: false,
            record:{},
            culstate : '',
        })
    }

    onInputChange(event){  //获取输入框值
        this.setState({
            servicename:event.target.value,
        })
    }
    submitok =() =>{
        let  {servicename,culstate} = this.state;
        confirm({
            title: '注意',
            content: '即将提交给管理员审核，确认？',
            onOk :() =>{
            /*  return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              }).catch(() => console.log('Oops errors!'));*/
              alert("提交后台")
            this.setState({
                visiable:false,
            })

            },
            onCancel() {},
          });
      
            //
            
        }
       
    
    
    handleCase =() =>{
        if (this.state.culstate == 3){
            return (<FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>原因：</span>}>
            
           
              <Input placeholder="请输入您转私有服务原因"   onChange={this.onInputChange.bind(this)} style={{border:'0px'}}/>
           
          </FormItem>)
        }
    }
    optionChange =(value) =>{
        this.setState({
            culstate : value,
        })
    }

    openMethod = (record) =>{
        this.setState({
            visiabless: true,
            record : record,
        })
    }


    render(){
       let {record} = this.state;
        return (
        <div className={styles.pancontainer}> 
        <Modal
        title={<div style={{textAlign:'center',fontSize:'20px',color:'#FFFFFF'}}>服务类型转换申请</div>}
        visible={this.state.visiable}
        width={700}
        maskClosable={false}
        wrapClassName={styles.modeltyle}
        destroyOnClose = {true}
        footer={null}
        onCancel = {this.handleCancel}
        onOk={this.handleCancel}
        >
      <div style={{width:'100%'}}>     
      
       
      <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>服务转化类型</span>}>
       
          <Select defaultValue={2} onChange={this.optionChange}>
            <Option value={1}>测试服务</Option>
            <Option value={2}>公开服务</Option>
            <Option value={3}>私有服务</Option>
          </Select>
      </FormItem>
      <FormItem>
      {
          this.handleCase()
      }
      </FormItem>
      <FormItem>
      <div style={{width:'54%',float:'left',textAlign:'right'}}><Button  htmlType="submit" onClick={this.handleCancel}>取消</Button></div>
      <div id='yes' style={{width:'45%',float:'right'}}><Button type="primary" htmlType="submit" onClick={this.submitok}>确定</Button></div>
      </FormItem>
      </div>       
      </Modal>

      <Modal
        title={<div style={{textAlign:'center',fontSize:'20px',color:'#FFFFFF'}}>服务测试情况</div>}
        visible={this.state.visiables}
        width={700}
        maskClosable={false}
        wrapClassName={styles.modeltyle}
        destroyOnClose = {true}
        
        onCancel = {this.handleCancel}
        >
      <div style={{width:'100%'}}>
      <Spin spinning={this.props.loadings} tip='loading....'>  
        <Card  >
        <div style={{textAlign:'center'}}>
            {
                this.props.appservices.testServerState == 1 ?<div><span style={{fontWeight:'bold'}}>当前服务状态：</span><Tag color="#fff" style={{backgroundColor:'red'}}>不可用</Tag></div>
                :this.props.appservices.testServerState == 2 ?  <div><span style={{fontWeight:'bold'}}>当前服务状态：</span><Tag  style={{backgroundColor:'yellow'}}>延迟</Tag></div>
                : this.props.appservices.testServerState == 3 ? <div><span style={{fontWeight:'bold'}}>当前服务状态：</span><Tag color="gray" style={{backgroundColor:'green'}}>可用</Tag></div>
                : <div> <span style={{fontWeight:'bold'}}>当前服务状态：</span><Tag color="gray">测试中</Tag></div>
            }
        </div> 

        </Card>
       
     </Spin>
     
      </div>       
      </Modal>
      
      {/*<Modal
      title={<div style={{textAlign:'center',fontSize:'20px',color:'#FFFFFF'}}>查看类型</div>}
      visible={this.state.visiabless}
      width={700}
      maskClosable={false}
      wrapClassName={styles.modeltyle}
      destroyOnClose = {true}
      
      onCancel = {this.handleCancel}
      >
    <div style={{width:'100%',textAlign:'center'}}>
            <Button htmlType="submit" type="primary"  
            onClick={this.props.addCompant.bind(this,{id:record.id,url:'/servicemanager/myservicedetail',titel:'服务状态',param:{row:record}})}
             >查看服务状态详情</Button>
             &nbsp; &nbsp; &nbsp; &nbsp;
            <Button htmlType="submit" type="primary" 
            onClick={this.props.addCompant.bind(this,{id:record.id,url:'/servicemanager/myservicedetail',titel:'服务状态',param:{row:record}})}
            >服务信息详细</Button>
    </div>       
      </Modal>*/}
            
                <div className={styles.cardtitel} style={{ width:'100%',margin:'auto'}}>
                    
                    <Collapse defaultActiveKey={['1']} bordered='false'>
                    <Panel header={<div><Icon type="search" /><span>查询条件</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">
                    
                    <div className='tab1' style={{margin:'auto'}}>
                    <Row gutter={16} align='middle'>
                         <Col span={5} offset={2} ><span style={{color:'#8D8F91'}}>移动业务域</span><br/>   
                         <Select
                         showSearch
                         style={{ width: 200 }}
                         optionFilterProp="children"
                         onChange={this.props.appapiareahandleChange}
                         defaultValue = "移动应用业务域"
                         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                       >
                         <Option value="移动应用业务域">移动应用业务域</Option>
                         <Option value="移动应用业务域1">移动应用业务域1</Option>
                         <Option value="移动应用业务域2">移动应用业务域2</Option>
                       </Select>
                       </Col>
                         <Col span={5} ><span style={{color:'#8D8F91'}}>接口分组</span><br/>
                         <Select
                         showSearch
                         style={{ width: 200 }}
                         optionFilterProp="children"
                         onChange={this.props.appapigrouphandleChange}
                         defaultValue = "查询所有"
                         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                       >
                         <Option value="查询所有">查询所有</Option>
                         <Option value="查询所有1">查询所有1</Option>
                         <Option value="查询所有2">查询所有2</Option>
                       </Select>
                         </Col>
                         <Col span={5}><span style={{color:'#8D8F91'}}>服务名称</span><br/>
                         <Input id='servicename' onChange={this.props.servicenamehandleChange}  placeholder="请输入名称" style={{width:'80%'}}/>
                         </Col>
                         <Col span={4} ><span style={{color:'#8D8F91'}}>审批状态</span><br/>
                         <Select
                         showSearch
                         style={{ width: 200 }}
                         optionFilterProp="children"
                         onChange={this.props.requeststatehandleChange}
                         defaultValue = "全部"
                         filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                       >
                         <Option value="全部">全部</Option>
                         <Option value="全部1">全部1</Option>
                         <Option value="全部2">全部2</Option>
                       </Select>
                         </Col>
                         <Col span={3} ><br/><Button type="primary" icon="search" onClick={this.props.queryClick}>查询</Button></Col>
                    </Row>
                    </div>
                      
                        </Panel>
                        </Collapse>
                    <div className={styles.tablelist} style={{marginTop:'4%'}}>
                    <div style={{width:'100%'}}>
                    <div style={{float:'left',width:'30%',marginBottom:'0.5%'}}>
                    <Button onClick={this.props.addCompant.bind(this,{url:'/servicemanager/cservice',titel:'服务注册'})} icon='plus'>服务注册</Button>
                    </div>
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
            
        </div>
           
        </div>
        );
    }
}


