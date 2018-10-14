import { Row, Col, Table } from 'antd';
import styles from './ResourceFileDetail.less'

 
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
const ResourceFileDetail = ({dataildata,documnetdata,documnetcolunms}) =>{

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
        <div className='dataildata'>
        <ul style={{listStyleType:'none',margin:'auto'}}>
            <li>
            <Row gutter={12}>
            <Col span={6}>中文名称：</Col>
            <Col offset={1} span={10}>查询创建文件列表</Col>
            </Row>
            </li>
            <li style={{marginTop:'8%'}}>
            <Row gutter={12}>
            <Col span={6}>英文名称：</Col>
            <Col offset={1} span={10}>dyzhmp_dazhdsadasdasdsad</Col>
            </Row></li>
            <li style={{marginTop:'8%'}}>
            <Row gutter={12}>
            <Col span={6}>接口描述：</Col>
            <Col offset={1} span={10}>查询创建文件列表2</Col>
            </Row></li>
            <li style={{marginTop:'8%'}}>
            <Row gutter={12}>
            <Col span={6}>总线地址：</Col>
            <Col offset={1} span={10}>http:1121321313131331311313/131313/1313//3131</Col>
            </Row></li>
        </ul>
        </div>
        <div className={styles.tablelist} style={{paddingLeft:'6%',width:'100%'}}>
        <Table
            columns={documnetcolunms}
            title={() => <div><span style={{color:'gray',fontWeight:'bold',}}>帮助文档 </span></div>}
        />
        </div>
        </div>)
}

export default ResourceFileDetail;