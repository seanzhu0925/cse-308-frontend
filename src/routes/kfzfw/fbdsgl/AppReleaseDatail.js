import { Card, Table, Row, Col,Button,Collapse,Icon,List ,Divider,Input} from 'antd';
import styles from './AppReleaseDatail.less'


const Panel = Collapse.Panel;
const { TextArea } = Input;
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

const AppReleaseDatail =() =>{


    return (<div>
       
        <div className={styles.pancontainer}>                       
            
        <div className={styles.cardtitel} style={{ background: '#ECECEC',width:'100%',margin:'auto'}}>
            
            <Collapse defaultActiveKey={['1']} bordered='false'>
            <Panel header={<div><Icon type="codepen" /><span>概况</span></div>}  style={{width: '100%',height:'40%',margin:'auto',borderColor:'#22c6c8' }} key="1">

            <div className={styles.forms} style={{margin:'auto',width:'80%'}}>
           
            
            <List
            itemLayout="vertical"
            size="large"
            >                   
              <List.Item
                extra = {<img width={272} height={150} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
              >
                <List.Item.Meta
                  title={<span><h2>大蚂蚁</h2></span>}
                  description={<div ><li><span style={{fontWeight:'bold'}}>审核状态：</span>审核未通过</li>
                  <li style={{marginTop:'2%'}}><span style={{fontWeight:'bold'}}>审核意见：</span>
                  <TextArea maxLength='500' width={100} autosize={{minRows:'5',maxRows:'6'}} disabled bordered={false} value='  daadddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssssssssdddddddddddddddddddddddddddddddddddddddd'/>
                    </li>
                  </div>}   
                />
              
                </List.Item>
        
          </List>
          <Divider>应用信息</Divider>
          <li ><span style={{fontWeight:20}}>应用简介：</span><span>xxxxxxxxsssssssssssssssssssssssssssssssssss</span><br/></li>
          <li style={{marginTop:'1%'}}><span style={{fontWeight:'20'}}>应用类型：</span><span>xxxxxxxx</span><br/></li>
          <li  style={{marginTop:'1%'}}><span style={{fontWeight:'20'}}>appkey&nbsp;&nbsp;&nbsp;：</span><span>xxxxxxxx</span><br/></li>
          </div>
                </Panel>
                </Collapse>
            <div className={styles.tablelist} style={{marginTop:'1%'}}>
     
            <Table  
          
            columns = {columns}      
            rowKey = {(item)=>item.id}
            title={() => <div style={{backgroundColor:'#6796E8'}}><span style={{color:'#fff'}}>申请总线接口列表</span></div>}
           />
                </div>                
   
</div>
   
</div>
           
        </div>)
}

export default AppReleaseDatail;