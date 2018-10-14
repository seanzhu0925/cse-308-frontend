import { Card, Table, Row, Col } from 'antd';
import styles from './AppUpdate.less'

  
const columns = [{
    title: '接口名称',
    dataIndex: 'servicename',
    key: 'servicename',
  }, {
    title: '接口描述',
    dataIndex: 'serviceapi',
    key: 'serviceapi',
  }, {
    title: '业务域名',
    dataIndex: 'requesttime',
    key: 'requesttime',
  },
  {
    title: '请求方式',
    dataIndex: 'requeststate',
    key: 'requeststate',
  },
  {
    title: '接口提供方式',
    dataIndex: 'requeststate',
    key: 'requeststate',
  },
  
  
]

const AppUpdate =() =>{


    return (<div>
       
        <div className='cardtile' style={{width:'100%'}}>
            <Card id={styles.cardtile1} title={<div>概况</div>}>
                <Row gutter={16}>
                <Col span={3} offset={2} >
                    <div style={{width:'80px',height:'80px'}}>
                        <div style={{width:'90%',height:'90%',textAlign:'center',margin:'auto'}}>
                            <img src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'  style={{width:'80px',height:'80px'}}/>
                        </div>
                    </div>
                    </Col>
                    <Col span={6} >
                    <div style={{width:'300px',height:'80px',backgroundColor:'#FCF6E4'}}>
                        <div style={{width:'90%',height:'90%',textAlign:'center',margin:'auto',paddingTop:'10%'}}>
                    <span style={{fontWeight:'bold'}}>应用名称：</span>服务创建测试一
                        </div>
                    </div>
                    </Col>
                    <Col span={6}>
                    <div style={{width:'300px',height:'80px',backgroundColor:'#EFDEDE'}}>
                    <div style={{width:'90%',height:'90%',textAlign:'center',margin:'auto',paddingTop:'10%'}}>
                    <span style={{fontWeight:'bold'}}>状态：</span>运行中
                    </div>
                    </div>
                    </Col>
                    <Col span={6} >
                    <div style={{width:'300px',height:'80px',backgroundColor:'#DBECF5'}}>
                    <div style={{width:'90%',height:'90%',textAlign:'center',margin:'auto',paddingTop:'10%'}}>
                    <span style={{fontWeight:'bold'}}>应用类型：</span>权限类
                    </div>
                    </div>
                    </Col>
                </Row>
                <Row gutter={16} style={{marginTop:'2.5%'}}>
                    <Col offset={2} span={12}>
                        <span style={{fontWeight:'bold'}}>应用简介：</span><span style={{color:'gray'}}>dsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaas</span>
                    </Col>
                </Row>
            </Card>
            
           
            
       
        </div>
        <div style={{marginTop:'4%'}}>
        <Card id={styles.cardtile3}  title={<div>申请接口列表</div>}>
            <Table
                columns={columns}
                footer= {()=><div>总共0条记录</div>}
            />
        </Card>
        </div>
           
        </div>)
}

export default AppUpdate;