import React, { Component } from 'react';
import { Icon, Tabs, Modal, Button, Card, Input, Form, Tag, Alert, Divider } from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import PersonRegister from '../../../routes/kfzfw/kfzfwzc/PersonRegister';
import CompanyRegister from '../../../routes/kfzfw/kfzfwzc/CompanyRegister';
import PoliceRegister from '../../../routes/kfzfw/kfzfwzc/PoliceRegister';
import styles from './RegisterModal.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

export default class RegisterModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            registerType: '' //1个人注册，2企业注册，3公安机关
        }
    }

    handleCancel = () => {
        this.changeregisterType('')
        this.props.setRegisterVisible(false)
    }

    changeregisterType = (type) => {
        this.setState({
            registerType: type
        })
    }

    render() {
        const { registerType } = this.state;
        const title = registerType == '1' ? '个人用户注册'
            : registerType == '2' ? '企业用户注册'
                : registerType == '3' ? '公安机关注册'
                    : '用户注册';
        const footer = (
            <Button onClick={this.handleCancel}>关闭</Button>
        )

        const renderRegisterForm = (
            registerType == '1'? <PersonRegister handleRegisterSuccess={this.handleCancel} changeregisterType={this.changeregisterType} /> :
            registerType == '2'? <CompanyRegister handleRegisterSuccess={this.handleCancel} changeregisterType={this.changeregisterType} />: 
            registerType == '3'? <PoliceRegister handleRegisterSuccess={this.handleCancel} changeregisterType={this.changeregisterType} />: ''
        )
        const chooseType = (
            <div>
                <div style={{ width: '80%', margin: 'auto', paddingTop: 10, paddingBottom: 20 }}>
                    <Divider>注册类型选择</Divider>
                </div>
                <ul className={styles.types}>
                    <li onClick={this.changeregisterType.bind(this,'1')}>
                        <div className={styles.person}>
                            <img src={require("../../../assets/register-person.png")} style={{ width: 50, height: 50 }} />
                        </div>
                        <span>个人用户</span>
                    </li>
                    <li onClick={this.changeregisterType.bind(this,'2')}>
                        <div className={styles.company}>
                            <img src={require("../../../assets/register-company.png")} style={{ width: 60, height: 60 }} />
                        </div>
                        <span>社会企业</span>
                    </li>
                    <li onClick={this.changeregisterType.bind(this,'3')}>
                        <div className={styles.police}>
                            <img src={require("../../../assets/register-police.png")} style={{ width: 50, height: 50 }} />
                        </div>
                        <span>公安机关</span>
                    </li>
                </ul>
            </div>
        )
        return (
            <Modal
                title={title}
                visible={this.props.visible}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                footer={false}
                wrapClassName={styles.container}
            >
                <div>
                    {registerType == '' ? chooseType : renderRegisterForm}
                </div>
            </Modal>
        );
    }
}
