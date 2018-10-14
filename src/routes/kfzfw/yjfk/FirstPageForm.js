import { Component } from 'react';
import { Form ,Input,Button} from 'antd';
const {TextArea} = Input;

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

class FrisPageForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            limitcount:300
    }
}

    check = () => {
        this.props.form.validateFields(
          (err) => {
            if (!err) {
              console.info('success');
            }
          },
        );
      }

      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    
    countchange(e)
    {
        this.setState({
            limitcount:300 - e.target.value.length
        }) 
        
           
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (<div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem {...formItemLayout} label="反馈主题">
            {getFieldDecorator('feedbacktitle', {
              rules: [{
                required: true,
                message: '请输入你反馈标题不能为空',
              }],
            })(
              <Input placeholder="请输入你反馈标题" maxLength={100} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="反馈内容">
          {getFieldDecorator('feedbackcontent', {
            rules: [{
              required: true,
              message: '反馈内容不能为空',
            }],
          })(
            <TextArea placeholder="请输入你的反馈内容"  onChange={this.countchange.bind(this)} autosize={{minRows:'14',maxRows:'20'}}   maxLength={300}/>
          )}
        </FormItem>
        <div style={{float:'right',width:'30%'}}>字数限制300内，目前你还能输入<span style={{color:'red',fontWeight:'bold',fontSize:'20px'}}>{this.state.limitcount}字</span></div>
       <div style={{width:'40%',margin:'auto'}}>
          <div style={{margin:'auto',width:'20%'}}>
       <Button type='primary' htmlType='submit' onClick={this.check.bind(this)}>提交</Button>
       </div>
       </div>
        </Form>
            </div>)
    }
    
}

FrisPageForm = Form.create()(FrisPageForm);

export default FrisPageForm;