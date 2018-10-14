import { Form, Input, Button, Checkbox,Row,Col,Modal } from 'antd';
import { Component } from 'react';
const FormItem = Form.Item;
const { TextArea } = Input;


const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };

  

class FristPageDetailForm extends Component {
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
          <FormItem {...formItemLayout} label="">
          {getFieldDecorator('id', {
            rules: [{
              required: true,
            }],
          })(
            <Input  style={{fontSize:'15px',display:'none'}}/>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="平台标题">
          {getFieldDecorator('theme', {
            rules: [{
            
            }],
          })(
            <Input  style={{fontSize:'15px'}} disabled/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="平台内容">
          {getFieldDecorator('content', {
            rules: [{
             
            }],
          })(
            <TextArea  autosize={{ minRows: 8, maxRows: 8 }}  disabled/>         
         )}
        </FormItem>
        <FormItem {...formItemLayout} label="动态图标">
        <Row gutter={16}>
        {
        
          this.props.datasource.iconlist.map((item) => {

            return  <Col key={item.id} span={3} >
             <img src={item} onClick={this.onLookImg.bind(this,{url:item})} style={{width:'30px',height:'30px'}}/>
             </Col>})
          
        }       
        </Row>  
        </FormItem>
        <FormItem {...formItemLayout} label="动态图片">
        <Row gutter={16}>       
        {
          this.props.datasource.imglist.map((item) => {        
            return  <Col key={item.id} span={6} >
             <img src={item} onClick={this.onLookImg.bind(this,{url:item})}  style={{width:'100px',height:'100px'}}/>
             </Col>})
          
        }
        </Row>
          </FormItem>   
          </div>
        );
      }

}

FristPageDetailForm = Form.create({

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
              theme: Form.createFormField({
                  value : plaform.theme,
              }),
              content: Form.createFormField({
                  value : plaform.content,
              }),
            }      
              
      }
  
}}})(FristPageDetailForm);
export default FristPageDetailForm;


