import { Card, Table, Row, Col } from 'antd';
import { markerAction } from '@antv/g2/src';
import styles from './MyServiceListDetail.less'
import { Component } from 'react';

  
const columns = [{
    title: '服务名称',
    dataIndex: 'servicename',
    key: 'servicename',
  }, {
    title: '应用类别',
    dataIndex: 'serviceapi',
    key: 'serviceapi',
  }, {
    title: '应用简介',
    dataIndex: 'requesttime',
    key: 'requesttime',
  },
  {
    title: '开发商名称',
    dataIndex: 'requeststate',
    key: 'requeststate',
  },
  {
    title: '联系电话',
    dataIndex: 'requeststate',
    key: 'requeststate',
  },
  {
    title: '申请时间',
    dataIndex: 'requeststate',
    key: 'requeststate',
  },
  
]

class  MyServiceListDetail extends Component{



    render(){
    return (<div>
        <Card>
        <div className='cardtile' style={{width:'100%'}}>

        <Row gutter={16}>
            <Col span={11}>
           
            <Card id={styles.cardtile1} title={<div>服务一览</div>}>
                <Row gutter={16}>
                    <Col span={12} >
                    <div style={{width:'300px',height:'80px',backgroundColor:'#FCF6E4'}}>
                        <div style={{width:'90%',height:'90%',textAlign:'center',margin:'auto',paddingTop:'10%'}}>
                    <span style={{fontWeight:'bold'}}>服务名称：</span>服务创建测试一
                        </div>
                    </div>
                    </Col>
                    <Col span={12}>
                    <div style={{width:'300px',height:'80px',backgroundColor:'#EFDEDE'}}>
                    <div style={{width:'90%',height:'90%',textAlign:'center',margin:'auto',paddingTop:'10%'}}>
                    <span style={{fontWeight:'bold'}}>服务状态：</span>运行中
                    </div>
                    </div>
                    </Col>
                    <Col span={12} style={{marginTop:'4%'}}>
                    <div style={{width:'300px',height:'80px',backgroundColor:'#DBECF5'}}>
                    <div style={{width:'90%',height:'90%',textAlign:'center',margin:'auto',paddingTop:'10%'}}>
                    <span style={{fontWeight:'bold'}}>创建日期：</span>2018-03-29 15:38:21
                    </div>
                    </div>
                    </Col>
                </Row>
            </Card>
            
            </Col>
            <Col offset={2} span={11}>
          
            <Card id={styles.cardtile2}  title={<div>服务信息</div>} extra={<a style={{color:'#fff'}}

                onClick={this.props.addCompant.bind(this,{url:'/servicemanager/moredetail',titel:'服务基本信息详情'})}>
                更多</a>}>
               
                    <li className={styles.httpa}><span style={{fontWeight:'bold'}}>服务地址</span><a>http://10.64.49.104:8080/aaaaaa/aaaadddddddddddddddddddddddddddddddddddddffffffffffffffffsssssssssssssssssssssssssssd</a></li>
                    <li className={styles.httpa} style={{marginTop:'2%'}}><span style={{fontWeight:'bold'}}>总线测试接口地址：</span><a>http://10.64.49.104:8080/aaaaaa/aaaadddddddddddddddddddddddddddddddddddddddddd</a></li>
                    <li className={styles.httpa} style={{marginTop:'2%'}}><span style={{fontWeight:'bold'}}>总线正式接口地址：</span><a>http://10.64.49.104:8080/aaaaaa/aaaadddddddddddddddddddddddddddddddddddddddddd</a></li>
                    <li className={styles.contenta} style={{marginTop:'2%'}}><span style={{fontWeight:'bold'}}>服务概述：</span><a>服务创建新功能测试，GET请求，新创建服务dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</a></li>                         
            </Card>    
            </Col>
        </Row>
        </div>
        <div style={{marginTop:'4%'}}>
        <Card id={styles.cardtile3}  title={<div>接口应用信息</div>}>
            <Table
                columns={columns}
                bordered

            />
        </Card>
        </div>
        </Card>       
        </div>)
}
}
export default MyServiceListDetail;