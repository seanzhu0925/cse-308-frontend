
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
import { doAddFd } from '../../services/fdback';
import moment from 'moment';

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
const plainOptions = ['Manager', 'Cavansser', 'SysAdministrator'];

@connect()
@Form.create()
export default class UserCreate extends Component {
    //class FrisPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            limitcount: 300,
            limittitle: 20,
            record: {},
            loading: false,
        }
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    checkX = () => {
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    console.info('success');
                }
            },
        );
    }

    check = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                values.sysRecordTime = moment().format('YYYY-MM-DD HH:mm:ss');
                console.log('Received values of form: ', values);
                this.setState({ loading: true }, () => {
                    doAddFd(values).then(() => {
                        //console.log('操作成功');
                        //this.props.pagination.current = 1;
                        this.props.dispatch({
                            type: 'feedback/resetCurrent',
                            searchValues: values
                        })
                        this.props.changeCurrentType(['list']);
                        //this.props.handleFormReset();
                        this.props.show();
                        this.setState({ loading: true });

                    }).catch(e => {
                        // this.setState({ loading: false })
                    })
                })
            }
        });
    }

    countchange(e) {
        this.setState({
            limitcount: 300 - e.target.value.length,
            //limittitle: 50-e.target.value.length,
        })
    }

    countTitlechange(e) {
        this.setState({
            //limitcount: 300 - e.target.value.length,
            limittitle: 50 - e.target.value.length,
        })
    }

    render() {
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
            <Card bordered={false}  >
                <div className={styles.pancontainer}>
                    <div><Form>
                    {getFieldDecorator('workStatus', {
                            initialValue: "0"
                        })(<Input type="hidden" />)}
                        <FormItem
                            {...formItemLayout}
                            label="User Name"
                        
                        >
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true,
                                    message: 'Username cannot be empty',
                                }],
                            })(
                                <Input placeholder="Please enter your user name" onChange={this.countTitlechange.bind(this)} maxLength={20} />
                            )}
                            <div style={{ float: 'right' }}>You can enter
              <span style={{ color: 'red', fontWeight: 'bold' }}>
                                    {this.state.limittitle}letters</span></div>
                        </FormItem>

                        <FormItem {...formItemLayout} label={<span>Password</span>}>
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{ required: true, message: 'Please enter the passwrod', }],
                            })(<Input type="password" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label={<span >Confirm Password</span>}>
                            {getFieldDecorator('confirm', {
                                rules: [{ required: true, message: 'Please enter your password again' }, { validator: this.compareToFirstPassword }],
                            }
                            )(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                        </FormItem>

                         <FormItem {...formItemLayout} label={<span>Choose the Role</span>}>
                         {getFieldDecorator('description', {
                                rules: [{ required: true, message: 'Please choose at least one role' },],
                            }
                            )(<CheckboxGroup options={plainOptions}/>)}


                            {/* <div>
                            <CheckboxGroup options={plainOptions}/>
                            </div> */}
                        </FormItem>


                        {/* <FormItem {...formItemLayout} label="反馈内容">
                            {getFieldDecorator('content', {
                                rules: [{
                                    required: true,
                                    message: '内容不能为空',
                                }],
                            })(
                                <TextArea placeholder="请输入你的反馈内容" onChange={this.countchange.bind(this)} autosize={{ minRows: '14', maxRows: '20' }} maxLength={300} />
                            )}
                            <div style={{ float: 'right' }}>字数限制300内，目前你还能输入
              <span style={{ color: 'red', fontWeight: 'bold' }}>
                                    {this.state.limitcount}字</span></div>
                        </FormItem> */}
                        <FormItem
                            {...submitFormLayout}
                        >
                            <Button loading={this.state.loading} type='primary' htmlType='submit' onClick={this.check.bind(this)}>提交</Button>
                            {/* <Button style={{ marginLeft: 8 }} onClick={this.props.changeCurrentType.bind(this, ['list'])}>返回</Button> */}

                        </FormItem>
                    </Form>
                    </div>
                </div>
            </Card>
        )
    }
}
