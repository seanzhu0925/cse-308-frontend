import { Component } from 'react';
import { List,Row,Col } from 'antd';

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];


const ListShow = (datasource,handleDatail) =>{
    console.log(handleDatail)
    return  (
            
        <List
        itemLayout="horizontal"
        dataSource={datasource.datasource}
        renderItem={item => (
            
          <List.Item>
          <Row gutter={48}>
            <Col span={12} style={{textAlign:'center'}} >动态名称：</Col>
            <Col span={12} >{item.theme}</Col>
            <Col span={12} style={{textAlign:'center'}}>动态内容：</Col>
            <Col span={12} >{item.content}</Col>
            <Col span={12} style={{textAlign:'center'}}>操作时间：</Col>
            <Col span={12} >{item.actiontime}</Col>
            <Col span={12} style={{textAlign:'center'}}>操作：</Col>
            <Col span={12} ><a style={{color:'#6A97C2'}} onClick={handleDatail}>查看详情</a>&nbsp;&nbsp;</Col>          
        </Row>  
          </List.Item>  
        )}
      />
        )


}
export default ListShow;