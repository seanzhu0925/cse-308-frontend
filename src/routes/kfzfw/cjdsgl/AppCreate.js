import {
  Form, Input, Button,
  Checkbox, Row, Col, Modal, Card, Collapse, Icon, Radio, Upload, List, Select, Steps

  , Transfer, Cascader
} from 'antd';
import { Component } from 'react';
import styles from './AppCreate.less'
import { connect } from 'dva';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { TextArea } = Input;
const Panel = Collapse.Panel;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Step = Steps.Step;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: { span: 8 },
};
const formItemLayoutTextarea = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: { span: 12 },

}
const formItemLayoutMuti = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: { span: 16 },

}
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
  {
    title: 'Ant Design Title 4',
  }
];

const options = [{
  code: 'zhejiang',
  name: 'Zhejiang',
  items: [{
    code: 'hangzhou',
    name: 'Hangzhou',
    items: [{
      code: 'xihu',
      name: 'West Lake',
    }],
  }],
}, {
  code: 'jiangsu',
  name: 'Jiangsu',
  items: [{
    code: 'nanjing',
    name: 'Nanjing',
    items: [{
      code: 'zhonghuamen',
      name: 'Zhong Hua Men',
    }],
  }],
}];



const interinfo = [{ value: '获取警请反馈接口', key: '1' }, { value: '获取警请反馈接口2', key: '2' }, { value: '获取警请反馈接口3', key: '3' },
{ value: '获取警请反馈接口', key: '4' }, { value: '获取警请反馈接口', key: '6' }, { value: '获取警请反馈接口', key: '7' }, { value: '获取警请反馈接口', key: '8' },
{ value: '获取警请反馈接口', key: '5' }, { value: '获取警请反馈接口', key: '9' }, { value: '获取警请反馈接口', key: '10' }
]

@connect()
@Form.create()
export default class AppCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apptypelist: [],

      imgurl: '',
      visible: false,
      ackey: ['1', '2', '3'],
      acvisable: false,
      current: 0,

      fileList192: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      fileList144: {
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      fileList: []



    }

  }




  handleChange = ({ fileList }) => {

    if (fileList.length > 0) {


      if (fileList[0].response != undefined && fileList[0].response.status == 200) {
        let filelist192 = this.state.fileList192;

        filelist192[0].url = fileList[0].response.url;
        filelist192[0].name = fileList[0].name;
        this.setState({
          fileList192:
            filelist192
        })

      }

    }
  }

  handleChangefile(info) {
    let fileList = info.fileList;

    // 1. 上传列表数量的限制
    //    只显示最近上传的一个，旧的会被新的顶掉
    fileList = fileList.slice(-1);
    // 2. 读取远程路径并显示链接
    fileList = fileList.map((file) => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        file.url = file.response.url;
      }
      return file;
    });

    // 3. 按照服务器返回信息筛选成功上传的文件
    fileList = fileList.filter((file) => {
      console.log(file)
      if (file.response) {
        return file.response.status === 200;
      }
      return true;
    });
    this.setState({ fileList: fileList });
  }

  backpanpal(key) {   //切换面板
    let { ackey } = this.state;
    if (ackey == key) {
      this.setState({
        ackey: '0',
      })
    } else {
      this.setState({
        ackey: key,
      })
    }

  }

  onChange() { }

  onLookImg(url) {
    this.setState({
      imgurl: url.url,
      visible: true
    })
  }

  onhideModal() {
    this.setState({
      imgurl: '',
      visible: false
    })
  }

  checkboxChange(e) {    //终端资源 数据回调
    console.log(e)
  }

  formvalue(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

      } else {
        alert("请检查必填项")
      }
    });
  }

  filterOption = (inputValue, option) => {   //接口数据过滤规则
    return option.description.indexOf(inputValue) > -1;
  }
  handleChanges = (targetKeys) => {   //选择接口数据
    console.log(this.state.targetKeys, targetKeys)
    this.setState({ targetKeys });
  }

  handelApptype = (value) => {
    this.setState({
      apptypelist: apptypelist[value],
    })
  }

  onChanges = (e) => {
    console.log(e)
  }

  render() {
    const breadcrumbList = [
      {
        title: '应用管理',
        url: '/console/appManage',
      },
      {
        title: '应用创建',
      }
    ]
    const { getFieldDecorator } = this.props.form;
    const { previewVisible, previewImage, fileList, apptypelist } = this.state;
    //const provinceOptions = provinceData.map(province => <Option key={province}>{province}</Option>);
    /* const cityOptions = apptypelist.map(city => <Option key={city}>{city}</Option>);*/
    const interinfos = interinfo.map(item => <Col style={{ marginTop: '3%' }} span={12}><Checkbox value={item.key}>{item.value}</Checkbox></Col>)
    return (
      <PageHeaderLayout openPage={this.props.openPage} breadcrumbList={breadcrumbList}>
        <div className={styles.cardtitels} style={{ background: '#F3F3F3', margin: 'auto' }}>
          <Card title='应用创建' bordered={false}  >
            <div className={styles.pancontainer}>
              <Modal
                visible={this.state.visible}
                onOk={this.onhideModal.bind(this)}
                onCancel={this.onhideModal.bind(this)}
                destroyOnClose={true}
                footer={null}
              >
                <div style={{ margin: 'auto', textAlign: 'center' }}><img src={this.state.imgurl} /></div>
              </Modal>
              <Steps current={this.state.current} >
                <Step title={`应用信息填写`} />
                <Step title='审核中' />
                <Step title='完成' />
              </Steps>
              <div id='formlist' style={{ width: '85%', margin: 'auto', marginTop: '3%' }}>
                <Collapse defaultActiveKey={['1']} activeKey={this.state.ackey} bordered='false'>
                  <Panel header={<div onClick={this.backpanpal.bind(this, '1')}><Icon type="codepen" /><span>应用信息填写</span></div>} style={{ width: '100%', height: '40%', margin: 'auto', borderColor: '#22c6c8' }} key="1">
                    <div>
                      <FormItem {...formItemLayout} label="">
                        {getFieldDecorator('id', {
                        })(
                          <Input style={{ fontSize: '15px', display: 'none' }} />
                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="应用名称">
                        {getFieldDecorator('appname', {
                          rules: [{
                            required: true, message: '应用名称1～15字(提交后不可修改)'
                          }],
                        })(
                          <Input style={{ fontSize: '15px' }} />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用简称">
                        {getFieldDecorator('appinfo', {
                          rules: [{
                            required: true, message: '应用名称1～4字'
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用类型">
                        {getFieldDecorator('type', {
                          rules: [{
                            required: true,
                          }],
                        })(

                          <Cascader options={options} onChange={this.onChanges} placeholder="Please select" />

                        )}
                      </FormItem>

                      <FormItem {...formItemLayout} label="包名">
                        {getFieldDecorator('apppackagename',
                          {
                            rules: [{
                              required: true, message: '必须与APK中包名一致'
                            }],
                          })(
                            <Input />
                          )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="服务电话">
                        {getFieldDecorator('appservicetel', {
                          rules: [{
                            required: true,
                          }],
                        })(
                          <Input />
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="服务邮箱">
                        {getFieldDecorator('serviceemail', {
                        })(
                          <Input />
                        )}
                      </FormItem>

                      <FormItem {...formItemLayoutTextarea} label="应用简介">
                        {getFieldDecorator('appinfos', {
                          rules: [{
                            required: true, message: '请输入15～1000字以内应用简介'
                          }],
                        })(
                          <TextArea autosize={{ minRows: 4, maxRows: 6 }} />
                        )}
                      </FormItem>



                      <FormItem {...formItemLayout} label="应用图标192*192">
                        {getFieldDecorator('appicon192', {
                          rules: [{
                            required: true,
                          }],
                        })(
                          <div className={styles.noneloadingupload}>
                            <Upload
                              action="/api/uploadimg"
                              listType="picture"
                              onChange={this.handleChange}
                            >
                              <img alt="192*192" style={{ width: 192, height: 192 }} src={this.state.fileList192[0].url} />
                            </Upload>
                          </div>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用图标144*144">
                        {getFieldDecorator('appicon144',
                        )(

                          <Upload

                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture"
                            onChange={this.handleChange}
                          >
                            <img alt="144*144" style={{ width: 144, height: 144 }} src={this.state.fileList192[0].url} />
                          </Upload>

                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用图标96*96">
                        {getFieldDecorator('appicon96',
                        )(

                          <Upload
                            action="//jsonplaceholder.typicode.com/posts/"
                            listType="picture"
                            onChange={this.handleChange}
                          >
                            <img alt="96*96" style={{ width: 96, height: 96 }} src={this.state.fileList192[0].url} />
                          </Upload>

                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用图标72*72">
                        {getFieldDecorator('appicon72',
                        )(
                          <div>
                            <Upload
                              action="//jsonplaceholder.typicode.com/posts/"
                              listType="picture"
                              fileList={this.state.fileList}
                              onChange={this.handleChange}
                            >
                              <img alt="72*72" style={{ width: 72, height: 72 }} src={this.state.fileList192[0].url} />
                            </Upload>
                          </div>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用图标48*48">
                        {getFieldDecorator('appicon48',
                        )(
                          <div>
                            <Upload
                              action="//jsonplaceholder.typicode.com/posts/"
                              listType="picture"
                              onChange={this.handleChange}
                            >
                              <img alt="48*48" style={{ width: 48, height: 48 }} src={this.state.fileList192[0].url} />
                            </Upload>
                          </div>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用图标36*36">
                        {getFieldDecorator('appicon36',
                        )(
                          <div>
                            <Upload
                              action="/api/uploadimg"
                              listType="picture"
                              onChange={this.handleChange}
                            >
                              <img alt="36*36" style={{ width: 36, height: 36 }} src={this.state.fileList192[0].url} />
                            </Upload>
                          </div>
                        )}
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用预览图">
                        {getFieldDecorator('apppreimg',
                        )(
                          <Upload
                            action="/api/uploadimg"
                            listType="picture"
                            onChange={this.handleChange}
                          >
                            <img alt="预览" style={{ width: '150px', height: '250px' }} src={this.state.fileList192[0].url} />
                          </Upload>
                        )}
                        <span style={{ color: 'red' }}><Icon type="question-circle-o" /></span><span>大小2M以内，png格式图片</span>
                      </FormItem>
                      <FormItem {...formItemLayout} label="应用截图">
                        {getFieldDecorator('appshotimg',
                        )(
                          <Upload
                            action="/api/uploadimg"
                            listType="picture"
                            onChange={this.handleChange}
                          >
                            <img alt="预览" style={{ width: '150px', height: '250px' }} src={this.state.fileList192[0].url} />
                          </Upload>
                        )}
                        <span style={{ color: 'red' }}><Icon type="question-circle-o" /></span><span>大小2M以内，png格式图片</span>
                      </FormItem>
                    </div>
                    <div style={{ textAlign: 'center' }}><Button style={{ backgroundColor: '#6796E8', color: '#fff' }} onClick={this.backpanpal.bind(this, '2')}>确定,下一步?</Button></div>
                  </Panel>


                  <Panel header={<div onClick={this.backpanpal.bind(this, '2')}>终端资源 </div>} key="2">
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ overflowX: 'scroll', overflowX: 'hidden', height: '300px', marginRight: '-5%' }}>
                        <List
                          itemLayout="horizontal"
                          dataSource={data}
                          renderItem={item => (
                            <List.Item>
                              <Checkbox.Group style={{ width: '100%' }} onChange={this.checkboxChange}>
                                <div style={{ width: "100%" }}>
                                  <Row gutter={16}>
                                    <Col span={1} style={{ backgroundColor: '#BAC2CA', color: '#fff', width: '50px', height: '50px' }}><div style={{ margin: 'auto', textAlign: 'center', fontSize: '2.4em' }}><span>1</span></div></Col>
                                    <Col span={12} offset={2}  >
                                      <li style={{ fontWeight: 'bold', fontStyle: 'italic', fontSize: '1.5em' }}>lkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</li>
                                      <li style={{ color: '#8C8C8C' }}>lkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk</li>
                                    </Col>
                                    <Col span={3} offset={5} style={{ color: '#fff', textAlign: 'right' }}>
                                      <Checkbox value={item.title} style={{ fontSize: '1.2em' }} />
                                    </Col>
                                  </Row>

                                </div>
                              </Checkbox.Group>
                            </List.Item>
                          )}
                        />
                      </div>
                    </div>
                  </Panel>

                  <Panel header={<div onClick={this.backpanpal.bind(this, '3')}>其他信息 </div>} key="3">

                    <FormItem {...formItemLayout} label="适用终端">
                      {getFieldDecorator('apptype', {
                        rules: [{
                          required: true,
                        }],
                      })(
                        <RadioGroup  >
                          <Radio value={1}>手机</Radio>
                          <Radio value={2}>平板</Radio>
                          <Radio value={3}>电脑</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="前端组件">
                      {getFieldDecorator('apptype', {
                        rules: [{
                          required: true,
                        }],
                      })(
                        <RadioGroup  >
                          <Radio value={1}>消息推送</Radio>
                          <Radio value={2}>token生成方式</Radio>
                          <Radio value={3}>移动端应用更新开发说明</Radio>
                        </RadioGroup>
                      )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="服务分组">
                      {getFieldDecorator('appinterfacegroup',
                        {
                          rules: [{
                            required: true,
                          }],
                        })(
                          <Select
                            size='default'
                            style={{ width: 345 }}

                          >
                            <Option value='a1'>自建服务</Option>
                            <Option value='a2'>公开服务不包括自建而公开</Option>
                          </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayoutMuti} label="选择接口">
                      {getFieldDecorator('appinterfaces',
                        {
                          rules: [{
                            required: true,
                          }],
                        })(
                          /*<Transfer dataSource={this.state.mockData} 
                                                titles = {['接口选择列表','已选择列表']}
                                                targetKeys = {this.state.targetKeys}
                                                showSearch
                                                filterOption = {this.filterOption}
                                                onChange = {this.handleChanges.bind(this)}
                                                render={item => item.title}
                                                 listStyle = {{width:'35%',backgroundColor:'#8C8C8C'}}
                    
                          
                          /> */
                          <Card className={styles.cardtitelinter} title='选择接口' style={{ width: '60%' }}>
                            <Checkbox.Group >
                              <Row>
                                {interinfos}
                              </Row>
                            </Checkbox.Group>
                          </Card>

                        )}
                    </FormItem>
                    <FormItem {...formItemLayoutTextarea} label="备注">
                      {getFieldDecorator('appbz',
                        {
                          rules: [{
                            required: true,
                          }],
                        })(
                          <TextArea placeholder='申请接口说明' autosize={{ minRows: 4, maxRows: 6 }} />
                        )}
                    </FormItem>

                    <div style={{ width: '100%', textAlign: 'center' }}>
                      <Button style={{ backgroundColor: '#6796E8', color: '#fff' }} onClick={this.formvalue.bind(this)}>提交</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Button onClick={this.backpanpal.bind(this, '2')} style={{ backgroundColor: '#6796E8', color: '#fff' }}>返回上一步</Button>
                    </div>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </Card>
        </div>

      </PageHeaderLayout>
    );
  }

}

// AppCreate = Form.create({

//   mapPropsToFields(props) {
//     console.log(props)
//     /*  if (props.datasource != undefined){
//       let plaformdetail = props.datasource;
//       let plaform = plaformdetail ;
//       if (plaform){ 
//             return {
//                 id: Form.createFormField({
//                     value : plaform.id,
//                 }),
//                 appname: Form.createFormField({
//                     value : plaform.appname,
//                 }),
//                 appinfo: Form.createFormField({
//                     value : plaform.appinfo,
//                 }),
//                 apppackagename: Form.createFormField({
//                   value : plaform.apppackagename,
//                 }),
//                 appservicetel: Form.createFormField({
//                   value : plaform.appservicetel,
//                }),
//                serviceemail: Form.createFormField({
//                   value : plaform.serviceemail,
//                }),
//                }      

//         }

//   }*/}
// })(AppCreate);



