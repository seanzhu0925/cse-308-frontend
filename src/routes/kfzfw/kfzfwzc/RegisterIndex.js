import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress, Divider, Icon } from 'antd';
import styles from './RegisterIndex.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
const Search = Input.Search;

@connect()
@Form.create()
export default class RegisterIndex extends Component {
    state = {};

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.dispatch({
                    type:'register/submit',
                    values
                })
              
            }
        });
    }
    render() {
        const addonAfter = (
            <div>查询</div>
        )
        return (
            <div className={styles.container} style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
                <div style={{ width: '30%', margin: 'auto', paddingTop: 50, paddingBottom: 50 }}>
                    <Divider>开发账号注册状态查询</Divider>
                </div>
                <div style={{ width: '40%', margin: 'auto' }}>
                    <Row>
                        <Col span={18}>
                            <Search placeholder="请输入账号..." enterButton="查询" size="large" />
                        </Col>
                        <Col span={6}>
                            <Button type="primary" onClick={()=>{this.props.history.goBack()}}>返回</Button>
                        </Col>
                    </Row>
                </div>
                <div style={{ width: '30%', margin: 'auto', paddingTop: 100, paddingBottom: 30 }}>
                    <Divider>注册类型选择</Divider>
                </div>
                <ul className={styles.types}>
                    <li>
                        <Link to="/developerService/register/person" handleSubmit={this.handleSubmit}>
                            <div className={styles.person}>
                                <img src={require("../../../assets/register-person.png")} style={{ width: 50, height: 50 }} />
                            </div>
                            <span>个人用户</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/developerService/register/company">
                            <div className={styles.company}>
                                <img src={require("../../../assets/register-company.png")} style={{ width: 60, height: 60 }} />
                            </div>
                            <span>社会企业</span>
                        </Link>

                    </li>
                    <li>
                        <Link to="/developerService/register/police">
                            <div className={styles.police}>
                                <img src={require("../../../assets/register-police.png")} style={{ width: 50, height: 50 }} />
                            </div>
                            <span>公安机关</span>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}
