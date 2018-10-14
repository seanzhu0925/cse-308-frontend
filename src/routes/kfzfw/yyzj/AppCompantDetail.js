import { Row, Col, Table } from 'antd';
import styles from './AppCompantDetail.less'

 
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
const data = [{
    id:'2',
    documentname:'dsadas',
    documenttype:'dasda'
},{
    id:'3',
    documentname:'dsad55as',
    documenttype:'dasd5a'
},{
    id:'4',
    documentname:'dsadas',
    documenttype:'dasda'
},{
    id:'5',
    documentname:'dsad55as',
    documenttype:'dasd5a'
},{
    id:'6',
    documentname:'dsadas',
    documenttype:'dasda'
},{
    id:'7',
    documentname:'dsad55as',
    documenttype:'dasd5a'
}]
const AppCompantDetail = ({dataildata,documnetdata,documnetcolunms}) =>{

    function handleColums(documnetcolunmss){
        let culdocumnetcolunmss = [...documnetcolunmss];
        let action = {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) =>(<div>下载</div>)
        }
        culdocumnetcolunmss.push(action);
        return culdocumnetcolunmss;
    }




    return (<div>
        <div className='dataildata' style={{width:'45%',float:'left'}}>
        <h2>组件名称：  {dataildata.componentname?dataildata.componentname:'暂无数据'}</h2>
        <ul style={{listStyleType:'none'}}>
           
            <li style={{marginTop:'4%'}}>
            <Row gutter={18}>
            <Col >&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:'#1E1E1E'}}>创建人：</span>   
            <span style={{wordBreak:'break-all',wordWrap:'break-word',color:'gray'}}> {dataildata.creator?dataildata.creator:'暂无数据'}</span></Col>
          
            </Row></li>
            <li style={{marginTop:'4%'}}>
            <Row gutter={18}>
            <Col > <span style={{color:'#1E1E1E'}}>创建时间：</span>    
            <span style={{wordBreak:'break-all',wordWrap:'break-word',color:'gray'}}>{dataildata.createtime?dataildata.createtime:'暂无数据'}</span></Col>
          
            </Row></li>
            <li style={{marginTop:'4%'}}>
            <Row gutter={18}>
            <Col><span style={{color:'#1E1E1E'}}>是否默认：   </span> 
            <span style={{wordBreak:'break-all',wordWrap:'break-word',color:'gray'}}>{dataildata.isdefault?dataildata.isdefault:'暂无数据'}</span></Col>
         
            </Row></li>
            <li style={{marginTop:'4%'}}>
            <Row gutter={18}>
            <Col><span style={{color:'#1E1E1E'}}>组件描述： </span>  
            <span style={{wordBreak:'break-all',wordWrap:'break-word',color:'gray'}}>{dataildata.componentinfo?dataildata.componentinfo:'暂无数据'}</span></Col>
          
            </Row></li>
        </ul>
        </div>
        <div className={styles.tablelist} style={{width:'40%',float:'right'}}>
        <Table
            pagination={false}
            columns={documnetcolunms}
            //dataSource={data}
            title={() => <div><span style={{color:'gray',fontWeight:'bold',}}>组件文档 </span></div>}
        />
        </div>
        </div>)
}

export default AppCompantDetail;