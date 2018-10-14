import { Component } from 'react';
import { Form, Input, Button, Checkbox,  Icon ,notification} from 'antd';
import {updateuserinfo}  from './../../../services/userinfoservice/userinfoservice'
import { routerRedux } from 'dva/router';
import { async } from '../../../services/appservice/appservice';


const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12     },
};



class   PersionForm extends Component {
  state = {
    checkNick: false,
    updatevisable:false,   //是否处于修改状态
    visiable:false,  //是否可返回父组件状态
    divyesisable:'',   //确定  与  修改动态按钮
    divisable : 'none',
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
    let checked  = false;
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          checked = true;
        }
      },
    );
    return checked;
  }
  
  

  handleOk= (e) =>{    //确定按钮回调  
    this.props.onOk();
  }
  handleCancel = (e) => { //取消按钮回调
    this.props.onCancel(); //关闭模型窗口
  }

  updateinfo = ()=>{  //修改后回调  提交
     let newuserinfo= this.props.form.getFieldsValue();
     let checked = this.check();
     if (checked){
      this.props.updateinfo(newuserinfo) 
      
     }else{
      notification.error({
        message: "修改失败",
        description: "注意检查必填项列名",
        duration:20,
      });
        return ;
     }
     this.props.onOk();
   /*  $.ajax({
         url:'http:localhost:8080/userinfoservice/updateuserinfo',
         type:'POST',
         data:newuserinfo,
         async: false,
         success: function (data) {    
            console.log('成功',data); this.setState({content:'修改成功'})   
          }.bind(this)
     })*/
   
     
     
  }
 
  updatestate(event){   //点击并让编辑框可输入
    let curlstate = this.state.disable;
    
    switch(event){
        case 'mobilenum': 
        curlstate.mobilenumisable = false;
            this.setState({
                divyesisable:'none',   
                divisable : '',
                disable:
                    curlstate
                
            })
            break
        case 'tel': 
        curlstate.telisable = false;
        this.setState({
            divyesisable:'none',   
            divisable : '',
            disable:
                curlstate,
            
        })
            break
        case 'email': 
        curlstate.emailable = false;
        this.setState({
            divyesisable:'none',   
            divisable : '',
            disable:
                curlstate
            
        })
            break
        case 'signadress': 
        curlstate.signadressable = false;
        this.setState({
            divyesisable:'none',   
            divisable : '',
            disable:
                curlstate
            
        })
            break
        case 'conpanyinfo': 
        curlstate.conpanyinfo = false;
        this.setState({
            divyesisable:'none',   
            divisable : '',
            disable:
                curlstate,
            
        })
            break
        default:
            break;

          
    } 
    
  }



  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
        
             
        
      <div style={{width:'100%'}}>
       
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>开发者类型</span>}>
          {getFieldDecorator('devtype', {
            rules: [{
                
            }],
          })(
            <Input  disabled  style={{border:'0px'}}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>登录用户名</span>}>
          {getFieldDecorator('userid', {
            rules: [{
            
              message: '2',
            }],
          })(
            <Input placeholder="2" disabled   style={{border:'0px'}}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>姓名</span>}>
          {getFieldDecorator('username', {
            rules: [{
                
            }],
          })(
            <Input   disabled  style={{border:'0px'}}/>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>身份证号</span>}>
          {getFieldDecorator('idcard', {
            rules: [{
            
              message: '',
            }],
          })(
            <Input placeholder=""  disabled  style={{border:'0px'}}/>
          )}
        </FormItem>
        <div className='inputcheck' onClick={this.updatestate.bind(this,'mobilenum')}>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>手机号</span>}>
          {getFieldDecorator('mobilenum', {
            rules: [{
                required: true,message:'手机号码必填'
            }],
          })(
            <Input  id='mobilenum' disabled={this.state.disable.mobilenumisable}  onDoubleClick={this.updatestate.bind(this)}/>
          )}
        </FormItem>
        </div>
        <div className='inputcheck' onClick={this.updatestate.bind(this,'tel')}>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>固定电话</span>}>
          {getFieldDecorator('tel', {
            rules: [{
             
            }],
          })(
            <Input placeholder="" disabled={this.state.disable.telisable} />
          )}
        </FormItem>
        </div>
        <div className='inputcheck' onClick={this.updatestate.bind(this,'email')}>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>电子邮箱</span>}>
          {getFieldDecorator('email', {
            rules: [{
                required: true,message:'cc'
            }],
          })(
            <Input  disabled={this.state.disable.emailable}/>
          )}
        </FormItem>
        </div>
        <div className='inputcheck' onClick={this.updatestate.bind(this,'signadress')}>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>注册地址</span>}>
          {getFieldDecorator('signadress', {
            rules: [{
             
                
            }],
          })(
           
            <Input placeholder=""  disabled={this.state.disable.signadressable}/>
          )}
        </FormItem>
        </div>
        <div className='inputchecks' onClick={this.updatestate.bind(this,'conpanyinfo')}>
        <FormItem {...formItemLayout} label={<span style={{color:'#676A6C'}}>企业简介</span>}>
          {getFieldDecorator('conpanyinfo', {
            rules: [{      
            }],
          })(
            <TextArea placeholder="" autosize={{ minRows: 5, maxRows: 6 }}  disabled={this.state.disable.conpanyinfo}/>
        )}
        </FormItem>
        </div>
        <FormItem>
        <div style={{width:'54%',float:'left',textAlign:'right'}}><Button  htmlType="submit" onClick={this.handleCancel.bind(this)}>取消</Button></div>
        <div id='yes' style={{width:'45%',float:'right',display:this.state.divyesisable}}><Button type="primary" htmlType="submit" onClick={this.handleOk.bind(this)}>确定</Button></div>
        <div id='update' style={{width:'45%',float:'right',display:this.state.divisable}}><Button type="primary" style={{backgroundColor:'red'}} onClick={this.updateinfo.bind(this)}>修改</Button></div>
        </FormItem>
      </div>       
      

    );
  }
}


PersionForm = Form.create({
  mapPropsToFields (props){
  let userinfolist = [...props.userinfo.userinfolist];
  let userinfo = {};
  if (userinfolist.length>0&&userinfolist[0]!=null){
        userinfo = userinfolist[0];
  }
  if (userinfo){
    
        return {
            id: Form.createFormField({
                value : userinfo.id,
            }),
            devtype: Form.createFormField({
                value : userinfo.devtype,
            }),
            userid: Form.createFormField({
                value : userinfo.userid,
            }),
            username: Form.createFormField({
                value : userinfo.username,
            }),
            idcard: Form.createFormField({
                value : userinfo.idcard,
            }),
            mobilenum: Form.createFormField({
                value : userinfo.mobilenum,
            }),
            tel: Form.createFormField({
                value : userinfo.tel,
            }),
            email: Form.createFormField({
                value : userinfo.email,
            }),
            signadress: Form.createFormField({
                value : userinfo.signadress,
            }),
            conpanyinfo: Form.createFormField({
                value : userinfo.conpanyinfo,
            }),
            
    }

}
}}
)(PersionForm);
export default PersionForm;
