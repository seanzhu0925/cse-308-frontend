import { Component } from 'react';
import { Form, Input, Button } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import { Card } from 'antd';
//import FristPageForm from './FirstPageForm'
import styles from './../sjyygl/AppsHistoryPage.less'

const { TextArea } = Input;

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};


//@connect()
@Form.create()
export default class FirstPage extends Component {
//class FrisPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      limitcount: 300
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

  countchange(e) {
    this.setState({
      limitcount: 300 - e.target.value.length
    })


  }

  render(){

    const breadcrumbList = [
      {
        title: '意见反馈',
        url: '/feedback',
      },
      {
        title: '新增反馈',
      }
    ]
    const { getFieldDecorator } = this.props.form;
    return (
      <PageHeaderLayout openPage={this.props.openPage} breadcrumbList={breadcrumbList}>
        <div className={styles.cardtitels} style={{ background: '#F3F3F3', margin: 'auto' }}>
          <Card title='新增反馈' bordered={false}  >
          <div className={styles.pancontainer}>
            <div><Form onSubmit={this.handleSubmit.bind(this)}>
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
                  <TextArea placeholder="请输入你的反馈内容" onChange={this.countchange.bind(this)} autosize={{ minRows: '14', maxRows: '20' }} maxLength={300} />
                )}
              </FormItem>
              <div style={{ float: 'right', width: '30%' }}>字数限制300内，目前你还能输入<span style={{ color: 'red', fontWeight: 'bold', fontSize: '20px' }}>{this.state.limitcount}字</span></div>
              <div style={{ width: '40%', margin: 'auto' }}>
                <div style={{ margin: 'auto', width: '20%' }}>
                  <Button type='primary' htmlType='submit' onClick={this.check.bind(this)}>提交</Button>
                </div>
              </div>
            </Form>
            </div>
            </div>
          </Card>
        </div>
      </PageHeaderLayout>
    )


  }

}

// FrisPageForm = Form.create()(FrisPageForm);
//export default FristPage;
// export default FrisPageForm;