import React, { Component } from 'react';
import { Form, Input, Icon, Card, Row, Col, Button, Select, Radio, InputNumber } from 'antd';

import styles from './CreatService.less';
import UrlParamAddModal from './UrlParamAddModal';
import Required from '../../../components/public/Required';

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

class CreatService extends Component {
    constructor(props){
        super(props)
     
        this.state = {
            method: 'get',
            hasurlparam: '0',
            modalVisible: false,
           
        };


    }
   
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.props.doAddService(values)
        });
    }

    changeMethod = (e) => {
        this.setState({
            method: e.target.value
        })
    }
    changeAddParam = (e) => {
        this.setState({
            hasurlparam: e.target.value
        })
    }

    handleAddParam = () => {
        this.setState({
            modalVisible: true
        })
    }

    handleOk = (data) => {
        this.props.form.setFieldsValue({
            param: data,
        });
        this.setState({
            modalVisible: false
        })
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
     
        return (
            <Card className={styles.container} bordered={false}>
                <Form onSubmit={this.handleSubmit}>
                    <table style={{ width: '100%', borderColor: '#DDDDDD' }} border="1">
                        <tbody>
                            <tr>
                                <th width="14%">服务创建者</th>
                                <td colSpan="3">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ lineHeight: '32px' }}>admin</div>
                                        <div>
                                            <Button  loading={this.props.loading} htmlType="submit" type="primary"  >确认</Button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th width="14%" ><Required />服务名称（英文）</th>
                                <td width="37%">
                                    <FormItem>
                                        {getFieldDecorator('cname', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </td>
                                <th width="14%"><Required />服务名称（中文）</th>
                                <td width="35%">
                                    <FormItem>
                                        {getFieldDecorator('ename', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <th><Required />服务地址</th>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('address', {
                                            initialValue: '',
                                            rules: [{ required: true, message: '请输入服务原始地址!' }],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                </td>
                                <th><Required />接口业务域</th>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('domain', {
                                            initialValue: '',
                                            rules: [{ required: true, message: '请选择接口业务域!' }],
                                        })(
                                            <Select>
                                                <Option value="">选择业务域</Option>
                                                {/*
                                                    this.props.dic.busArea.map(item => {
                                                        return (
                                                            <Option key={item.key} value={item.key}>{item.name}</Option>
                                                        )
                                                    })
                                                */}
                                            </Select>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <th><Required />请求方式</th>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('request_mode', {
                                            initialValue: 'http'
                                        })(
                                            <RadioGroup>
                                                <Radio value="http">HTTP</Radio>
                                                <Radio value="restful">RestFul</Radio>
                                                <Radio value="webservice">WebService</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </td>
                                <th>&nbsp;</th>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <th><Required />传递方式</th>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('transmit_mode', {
                                            initialValue: 'get'
                                        })(
                                            <RadioGroup onChange={this.changeMethod}>
                                                <Radio value="get">GET</Radio>
                                                <Radio value="post">POST</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </td>
                                <th><Required />参数方式</th>
                                <td>
                                    {
                                        this.state.method == 'post' ? (
                                            <FormItem>
                                                {getFieldDecorator('params_mode', {
                                                    initialValue: 'a'
                                                })(
                                                    <RadioGroup>
                                                        <Radio value="a">KeyValue(键值对)</Radio>
                                                        <Radio value="b">InputBuffer</Radio>
                                                    </RadioGroup>
                                                )}
                                            </FormItem>
                                        ) : ''
                                    }
                                </td>
                            </tr>
                            <tr>
                                <th><Required />接口超时时间(秒)</th>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('timeout', {
                                            initialValue: '',
                                            rules: [{ required: true, message: '请输入接口超时时间!' }],
                                        })(
                                            <InputNumber style={{ width: '100%' }} min={1} max={120} />
                                        )}
                                    </FormItem>
                                    注：接口超时时间请填写1-120的正整数（单位为秒
                            </td>
                                <th>是否有URL参数</th>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('hasurlparam', {
                                            initialValue: '0'
                                        })(
                                            <RadioGroup onChange={this.changeAddParam}>
                                                <Radio value="0">无</Radio>
                                                <Radio value="1">有</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            {
                                this.state.hasurlparam == '1' ? (
                                    <tr valign="top">
                                        <th>请求参数</th>
                                        <td colSpan="3">
                                            <UrlParamAddModal value={this.props.form.getFieldValue('param')} visible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel} />
                                            <span className={styles.disabledInput} onClick={this.handleAddParam}>
                                                <FormItem>
                                                    {getFieldDecorator('param')(
                                                        <TextArea rows={3} disabled />
                                                    )}
                                                </FormItem>
                                            </span>
                                            注：若有参数,[param,String]参数名称:参数类型
                                        </td>
                                    </tr>
                                ) : (
                                        <tr></tr>
                                    )
                            }
                            <tr valign="top">
                                <th><Required />返回结果</th>
                                <td colSpan="3">
                                    <FormItem>
                                        {getFieldDecorator('result', {
                                            rules: [{
                                                required: true, message: '请输入返回结果'
                                            }]
                                        })(
                                            <TextArea rows={3} />
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <th><Required />API文档</th>
                                <td colSpan="2">
                                    <FormItem>
                                        {getFieldDecorator('api')(
                                          /*  <FileUpload allow={['pdf', 'doc', 'docx']} />*/
                                          <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    注：后缀为pdf,doc或docx格式
                                </td>
                            </tr>
                            <tr>
                                <th>服务LOGO</th>
                                <td colSpan="2">
                                    <FormItem>
                                        {getFieldDecorator('logo')(
                                            //<ImgUpload onUploadSuccess={(data) => { console.log(data) }} width={200} height={100} />
                                            <Input/>
                                        )}
                                    </FormItem>
                                </td>
                                <td>
                                    注：200*100px &nbsp; jpg或png格式
                                </td>
                            </tr>
                            <tr valign="top">
                                <th>服务描述</th>
                                <td colSpan="3">
                                    <FormItem>
                                        {getFieldDecorator('description')(
                                            <TextArea rows={5} />
                                        )}
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="4">
                                    注：<Required />为必填项
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(CreatService);