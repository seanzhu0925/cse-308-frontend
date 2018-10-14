import { Component } from 'react';
import { Form, Input, Button, Checkbox, Modal, Icon } from 'antd';
import styles  from './../../../layouts/BasicLayout.less'
import { connect } from 'dva';
import PersionForm from './PersionForm';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12     },
};


@connect(({ userinfo, loading }) => {
    
  return {
    userinfo,
      loading: loading.effects['userinfo/getinfobycontion'],
  }
})
class   Persioninfo extends Component {
  state = {
    checkNick: false,
    updatevisable:false,   //是否处于修改状态
    visiable:false,  //是否可返回父组件状态
    disable:{   //部分输入框 是否禁用
        mobilenumisable:true,
        telisable:true,
        emailable:true,
        signadressable:true,
        conpanyinfo:true,
    }
    ,
    
  };
  check = () =>  {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          console.info('success');
        }
      },
    );
  }


  componentDidMount(){  //初始获取数据
  
      this.props.dispatch({
          type:'userinfo/getinfobycontion',
          id:'dasdsadas',
          userid:'dasdsadasd'
      })
    
  }

  /*handleOk= (e) =>{
    this.setState({
      visiable: false,
    });
    console.log(  this.props.form.getFieldsValue())  // this.props.handleOk();
  }*/
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visiable: false,
    });
    this.props.handleCancel();
  }
 
  updateinfo(newuserinfo){
    this.props.dispatch({
      type:'userinfo/updateuserinfo',
      ...newuserinfo
  })
  }

  
  render() {    
    return (
      
        <div>         
        <Modal
        title={<div style={{textAlign:'center',fontSize:'20px',color:'#FFFFFF'}}>个人资料</div>}
        visible={this.props.visiable}
        width={600}
        maskClosable={false}
        wrapClassName={styles.modeltyle}
        destroyOnClose = {true}
        footer={null}
        onCancel = {this.handleCancel}
        >
      <div style={{width:'100%'}}>     
      <PersionForm updateinfo={this.updateinfo.bind(this)} onOk={this.props.handleOk} onCancel={this.props.handleCancel} userinfo={this.props.userinfo}/>           
      </div>       
      </Modal>
      </div>

    );
  }
}



export default Persioninfo;