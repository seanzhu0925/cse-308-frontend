import { Form, Input, Button, Checkbox,Card } from 'antd';
import styles from './FristPageDetail.less'
import FristPageDetailForm from './FristPageDetailForm';
import { connect } from 'dva';

const FormItem = Form.Item;


const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};

@connect(({ plafom, loading }) => {
    
  return {
      plafom,
      loading: loading.effects['plafom/querydetail'],
  }
})
class FristPageDetail extends React.Component {

  
  componentDidMount(){
     this.props.dispatch({
       type:'plafom/querydetail',
       ...this.props.param.row
     })
  }
  

  render() {
    return (
    <div  >
      <div className={styles.cardtitel} style={{ background: '#F5F5F5', padding: '2%' }}>
      <Card title={<div style={{textAlign:'center'}}>动态详情</div>} bordered={true}  style={{ width: '100%' }}>
        <FristPageDetailForm param={this.props.param} datasource={this.props.plafom.plafomlist.plafom}/>
      </Card>
    </div>
  </div>
    );
  }
}

export default FristPageDetail;