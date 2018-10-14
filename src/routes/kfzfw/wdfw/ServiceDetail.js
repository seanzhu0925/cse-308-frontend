import { Component } from 'react';
import { Form, Input, Icon, Card, Row, Col, Button, Select, Radio, InputNumber, Modal } from 'antd';

import styles from './ServiceDatail.less';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };



class ServiceDetail extends Component {
    constructor(props){
        super(props)
       this.state ={
           visiable: false,
           srcimg:'',
       }
    }   

    showImg(imgsrc){
        alert(imgsrc)
        this.setState ({
            visiable: true,
            srcimg:imgsrc,
        })
    }
    handleCancel =() =>{
        this.setState ({
            visiable: false,
            srcimg:'',
        })
    }
    render() {
       
        return (
            <div>
     <Modal
      maskClosable = {true}
      visible={this.state.visiable}
      
      width={700}
      wrapClassName={styles.modeltyle}
      destroyOnClose = {true}
      onCancel = {this.handleCancel}
      >
    <div style={{width:'100%',textAlign:'center'}}>
        <img  src={this.state.srcimg}/>  
        dsdas
    </div>       
      </Modal>
            <Card className={styles.container} bordered={false}>
                <Form >
                    <table style={{ width: '100%', borderColor: '#DDDDDD' }} border="1">
                        <tbody>
                            <tr>
                                <th width="14%">服务创建者</th>
                                <td colSpan="3">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ lineHeight: '32px' }}>admin</div>
                                        
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th width="14%" >服务名称（英文）</th>
                                <td width="37%">
                                    <FormItem {...formItemLayout}>
                                       test
                                    </FormItem>
                                </td>
                                <th width="14%">服务名称（中文）</th>
                                <td width="35%">
                                    <FormItem {...formItemLayout}>
                                       test
                                    </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <th>服务地址</th>
                                <td>
                                    <FormItem {...formItemLayout}>
                                        dasda
                                    </FormItem>
                                </td>
                                <th>接口业务域</th>
                                <td>
                                <FormItem {...formItemLayout}>
                                        dasd
                                </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <th>请求方式</th>
                                <td>
                                <FormItem {...formItemLayout}>
                                        dasdas
                                </FormItem>
                                </td>
                                <th>&nbsp;</th>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <th>传递方式</th>
                                <td>
                                <FormItem {...formItemLayout}>
                                        dasda
                                </FormItem>
                                </td>
                                <th>参数方式</th>
                                <td>
                                <FormItem {...formItemLayout}>
                                        dasdsa
                                </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <th>接口超时时间(秒)</th>
                                <td>
                                <FormItem {...formItemLayout}>
                                        asdas
                                </FormItem>
                            </td>
                                <th>是否有URL参数</th>
                                <td>
                                <FormItem {...formItemLayout}>
                                        dasda
                                </FormItem>
                                </td>
                            </tr>
                            {
                              
                                    <tr valign="top">
                                        <th>请求参数</th>
                                        <td colSpan="3">
                                        <FormItem {...formItemLayout}>
                                        dasdsa
                                    </FormItem>
                                        </td>
                                    </tr>
                           
                            }
                            <tr valign="top">
                                <th>返回结果</th>
                                <td colSpan="3">
                                <FormItem {...formItemLayout}>
                                        dasda
                                </FormItem>
                                </td>
                            </tr>
                            <tr>
                                <th>API文档</th>
                                <td colSpan="2">
                                <FormItem {...formItemLayout}>
                                      <Button htmlType='submit' type='primary'>下载</Button>
                                </FormItem>
                                </td>
                                
                            </tr>
                            <tr>
                                <th>服务LOGO</th>
                                <td colSpan="2">
                                <FormItem {...formItemLayout}>
                                       <a onClick={this.showImg.bind(this,'//www.baidu.com/img/baidu_jgylogo3.gif')}>xxxxx.jpg</a>
                                </FormItem>
                                </td>
                               
                            </tr>
                            <tr valign="top">
                                <th>服务描述</th>
                                <td colSpan="3">
                                <FormItem {...formItemLayout}>
                                        dsada
                                </FormItem>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </Form>
            </Card>
            </div>
        )
    }
}

export default ServiceDetail;