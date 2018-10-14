import { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Icon,
  Card,
  Table,
  Button,
  Popconfirm,
  Divider,
  Modal,
  Form,
  message,
  Breadcrumb,
  DatePicker,
  Select,
  Checkbox,
  Cascader
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Feedback.less';
import { dic } from '../../config/dic';
import { getNameFromConfig } from '../../utils/utils';
import { connect } from 'dva';
import DescriptionList from 'components/DescriptionList';
//import styles from './../kfzfw/sjyygl/AppsHistoryPage.less'
const { Description } = DescriptionList;
const ButtonGroup = Button.Group;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const FormItem = Form.Item;
const confirm = Modal.confirm;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;


@connect(({ feedback }) => {
  const { list } = feedback;
  return {
    record: feedback.record,
    list,
  };
})


// @connect(({ feedback, loading }) => {
//   const { list, pagination, current, pageSize, searchValues } = feedback;
//   return {
//       list,
//       pagination,
//       searchValues,
//       loading: loading.effects['feedback/fetch'],
//       submitting: loading.effects['feedback/doEdit'],
//   };
// })
@Form.create()
export default class FdDetail extends Component {
  //class FrisPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      record: this.props.record,
      limitcount: 300,
      loading: false,
    }
  }



  componentDidMount() {
    this.show();
  }
  componentWillUnmount() {
  }
  // componentWillUnmount() {
  //     this.props.dispatch({
  //         type: 'feedback/resetState'
  //     });
  // }

  show = () => {
    console.log('This Is SHOW function');
    this.props.dispatch({ type: 'feedback/fetch' });
  }
  render() {
    const { record } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    return (
      // <Card title='反馈详情' bordered={false}  >
      //   <div className={styles.pancontainer}>
      //     <div><Form>
      //       <FormItem {...formItemLayout} label="反馈主题">
      //         {<Input placeholder={record.title} maxLength={100} disabled />}
      //       </FormItem>
      //       <FormItem {...formItemLayout} label="反馈内容">
      //         {<TextArea placeholder={record.content} maxLength={300} disabled
      //           autosize={{ minRows: '14', maxRows: '20' }} color='black' />}
      //       </FormItem>
      //       <FormItem {...formItemLayout} label="回复内容">
      //         {<TextArea placeholder={record.responseContent} maxLength={300} disabled autosize={{ minRows: '14', maxRows: '20' }} />}
      //       </FormItem>
      //       <FormItem
      //         {...submitFormLayout}
      //       >
      //         <Button onClick={this.props.changeCurrentType.bind(this, ['list'])}>返回</Button>
      //       </FormItem>
      //     </Form>
      //     </div>
      //   </div>
      // </Card>
      <Card  bordered={false}>
        <div className={styles.pancontainer}>
        <div><Form>
            <DescriptionList size="small" style={{ marginBottom: 16 }} col="1">
            <Description term='反馈主题'>{record.title}</Description>
            <Description term='反馈时间'>{record.sysRecordTime}</Description>
              <Description term='反馈内容'>{record.content}</Description>
              <Description term='回复内容'>{record.responseContent}</Description>
            </DescriptionList>
            {/* <FormItem
              // {...submitFormLayout}
            >
              <Button float='left' onClick={this.props.changeCurrentType.bind(this, ['list'])}>返回</Button>
            </FormItem> */}
            </Form>
           </div>
        </div>
          </Card>
    )
  }
}