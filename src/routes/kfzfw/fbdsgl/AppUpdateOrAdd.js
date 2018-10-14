import { Form, Input, Button, 
    Checkbox, Row, Col, Modal, Avatar ,Icon,Radio, Upload,List,Select
    
  ,Transfer} from 'antd';
  import { Component } from 'react';
  import styles from './AppUpdateOrAdd.less'
  
  const FormItem = Form.Item;
  const { TextArea } = Input;
  const RadioGroup = Radio.Group;
  const Option = Select.Option;
  
  const formItemLayout = {
      labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },     },
      wrapperCol: { span:  8},
    };
  const formItemLayoutTextarea={
      labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },     },
          wrapperCol: { span:  12},
        
  }
  const formItemLayoutMuti={
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },     },
        wrapperCol: { span:  16},
      
  }

  class AppUpdateOrAdd extends Component {
    constructor(props){
      super(props)
      this.state={
        apptypelist:[],

        imgurl:'',
        visible:false,
        ackey:'1',
        acvisable:false,
       
        
        fileList:[]
          
      
      
    }
    
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }


    render() {
          const { getFieldDecorator } = this.props.form;
          
          return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                 <FormItem
          {...formItemLayout}
          label="APPKEY"
        >
          {getFieldDecorator('APPKEY', {
            rules: [{
              required: true, message: '请输入appkey!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="应用名称"
      >
        {getFieldDecorator('appname', {
          rules: [ {
            required: true, message: '请输入应用名称!',
          }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem
      {...formItemLayout}
      label="应用简介"
    >
      {getFieldDecorator('appinfo', {
        rules: [{
          required: true, message: '请输入简介!',
        }],
      })(
        <Input />
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="联系人手机"
    >
      {getFieldDecorator('tel', {
        rules: [{
          required: true, message: '请输入手机号码!',
        }],
      })(
        <Input />
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="联系人邮箱"
    >
      {getFieldDecorator('email', {
        rules: [{type:'email',message:'请输入正确的邮箱地址'},{
          required: true, message: '请输入联系人邮箱!',
        }],
      })(
        <Input />
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="是否强制安装"
    >
      {getFieldDecorator('method', {
        rules: [{
          required: true, message: '请选择!',
        }],
      })(
        <Select >
            <Option value='1'>强制安装</Option>
            <Option value='2'>普通安装</Option>
        </Select>
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="机构范围"
    >
      {getFieldDecorator('orgarea', {
        rules: [{
          required: true,
        }],
      })(
        <Input/>
      )}
    </FormItem>
    <FormItem
      {...formItemLayout}
      label="责任单位"
    >
      {getFieldDecorator('orgarea', {
        rules: [{
          required: true,
        }],
      })(
        <Input/>
      )}
    </FormItem>
    
        <Row gutter={1}>
            <Col span={12}>
            <FormItem
      {...formItemLayoutMuti}
      label="联系人1"
    >
      {getFieldDecorator('telname1', {
       
      })(
        <Input  />
    )}
     </FormItem>   
    </Col>
    <Col span={12}>
            <FormItem
      {...formItemLayoutMuti}
      label="联系人1电话号码"
    >
      {getFieldDecorator('tel1', {
        rules: [{
          required: true,
        }],
      })(
        <Input  style={{width:'200px'}}/>
    )}
     </FormItem>   
    </Col>
    <Col span={12}>
            <FormItem
      {...formItemLayoutMuti}
      label="联系人2"
    >
      {getFieldDecorator('orgarea', {
        rules: [{
          required: true,
        }],
      })(<Input  style={{width:'200px'}}/>
    )}
     </FormItem>   
    </Col>
    <Col span={12}>
            <FormItem
      {...formItemLayoutMuti}
      label="联系人2电话号码"
    >
      {getFieldDecorator('orgarea', {
        rules: [{
          required: true,
        }],
      })(<Input  style={{width:'200px'}}/>
    )}
     </FormItem>   
    </Col>
    <Col span={12}>
            <FormItem
      {...formItemLayoutMuti}
      label="联系人3"
    >
      {getFieldDecorator('orgarea', {
        rules: [{
          required: true,
        }],
      })(<Input  style={{width:'200px'}}/>
    )}
     </FormItem>   
    </Col>
    <Col span={12}>
            <FormItem
      {...formItemLayoutMuti}
      label="联系人3电话号码"
    >
      {getFieldDecorator('orgarea', {
        rules: [{
          required: true,
        }],
      })(<Input  style={{width:'200px'}}/>
    )}
     </FormItem>   
    </Col>
    
            
        </Row>
    
            </Form>
       </div>
          );
        }
  
  }
  
  AppUpdateOrAdd = Form.create({
  
    //mapPropsToFields (props){
     // console.log(props)
    /*  if (props.datasource != undefined){
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
    
  }*///}
})(AppUpdateOrAdd);
  export default AppUpdateOrAdd;
  
  
  