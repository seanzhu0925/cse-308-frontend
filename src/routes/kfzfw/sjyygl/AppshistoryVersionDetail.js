import { Form, Input, Button, Checkbox, Row, Col, Modal, Avatar } from 'antd';
import { Component } from 'react';
import styles from './AppsHistoryVersion.less'
const FormItem = Form.Item;
const { TextArea } = Input;


const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  

class AppshistoryVersionDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      imgurl:'',
      visible:false,
    }
  }
  

 
  onLookImg(url){
    this.setState({
      imgurl: url.url,
      visible:true
    })
  }
  
  onhideModal(){
    this.setState({
      imgurl: '',
      visible:false
    })
  }
                      

      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <div>
          <Modal
           visible={this.state.visible}
          onOk={this.onhideModal.bind(this)}
          onCancel={this.onhideModal.bind(this)}
          destroyOnClose = {true}
          footer={null}
        >
          <div style={{margin:'auto',textAlign:'center'}}><img  src={this.state.imgurl}/></div>
        </Modal>
        <div className={styles.forms}>
          <FormItem {...formItemLayout} label="">
          {getFieldDecorator('id', {
          })(
            <Input  style={{fontSize:'15px',display:'none'}}/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="应用名称">
          {getFieldDecorator('appname', {
          })(   
            <Input  style={{fontSize:'15px'}} disabled/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="应用简历">
        {getFieldDecorator('appinfo', {
        })(            
            <TextArea     disabled/>                
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="应用图标">
      <Avatar  size='large' src={"https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/dmas/pic/item/72dfa9ec8a136327a5ec0da6998fa0ec08fac727.jpg"}/>
        
      </FormItem>
      <FormItem {...formItemLayout} label="应用预览图">
       <Row gutter={16}>
         <Col> <img style={{width:'150px',height:'250px'}} src={"https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/dmas/pic/item/72dfa9ec8a136327a5ec0da6998fa0ec08fac727.jpg"} />
      </Col>
        </Row>
      </FormItem>
      <FormItem {...formItemLayout} label="应用截图">
      <img style={{width:'150px',height:'250px'}} src={"https://gss0.baidu.com/7LsWdDW5_xN3otqbppnN2DJv/dmas/pic/item/72dfa9ec8a136327a5ec0da6998fa0ec08fac727.jpg"} />

      </FormItem>
      <FormItem {...formItemLayout} label="包名">
        {getFieldDecorator('apppackagename', {
        })(   
          <Input  style={{fontSize:'15px'}} disabled/>
        )}
        
      </FormItem>
      <FormItem {...formItemLayout} label="服务电话">
        {getFieldDecorator('appservicetel', {
        })(   
          <Input  style={{fontSize:'15px'}} disabled/>
        )}
        
      </FormItem>
      <FormItem {...formItemLayout} label="服务邮箱">
        {getFieldDecorator('serviceemail', {
        })(   
          <Input  style={{fontSize:'15px'}} disabled/>
        )}
        
      </FormItem>
     </div>
     </div>
        );
      }

}

AppshistoryVersionDetail = Form.create({

  mapPropsToFields (props){
    console.log(props)
    if (props.datasource != undefined){
    let plaformdetail = props.datasource;
    let plaform = plaformdetail ;
    if (plaform){ 
          return {
              id: Form.createFormField({
                  value : plaform.id,
              }),
              appname: Form.createFormField({
                  value : plaform.appname,
              }),
              appinfo: Form.createFormField({
                  value : plaform.appinfo,
              }),
              apppackagename: Form.createFormField({
                value : plaform.apppackagename,
              }),
              appservicetel: Form.createFormField({
                value : plaform.appservicetel,
             }),
             serviceemail: Form.createFormField({
                value : plaform.serviceemail,
             }),
             }      
              
      }
  
}}})(AppshistoryVersionDetail);
export default AppshistoryVersionDetail;


