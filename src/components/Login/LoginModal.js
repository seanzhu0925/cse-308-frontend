import React, { Fragment } from 'react';
import { Icon, Tabs, Modal, Button, Card, Input, Form, Tag, Alert } from 'antd';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux, Link } from 'dva/router';
import styles from './LoginModal.less';
import ResetPassword from './ResetPassword';
import LoginByPasswordForm from './LoginByPasswordForm'
import LoginByCode from './LoginByCode'
import LoginForginPassword from './LoginForginPassword'

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@connect(({ login, loading }) => {
    return {
        visible: login.visible,
        msg: login.msg,
        ms: login.ms,
        accountLoginLoading: loading.effects['login/login'],
    }
})
//@Form.create()
export default class LoginModal extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            ms: 'f',
            getcodevisable: 0,
            getcodevisableByPassward: 0,
            pms: 'f',
            current: 'login'
        }
    }

    handleCancel = (e) => {

        this.props.dispatch({
            type: 'login/setLoginVisible',
            visible: false
        })
        this.setState({
            submethod: e,
            current: 'login'
        })
    }

    handleSubmitByPassword = (values) => {

        this.props.dispatch({
            type: 'login/login',
            values,
        })


    }
    handleSubmitByTelCode = (values) => {
        this.props.dispatch({
            type: 'login/loginByTelCode',
            values,
        })
    }


    handleSubmitForginPassoword = (values) => {

        this.props.dispatch({
            type: 'login/ForginPassoword',
            values,

        })
    }
    onClose = (e) => {
        this.props.dispatch({
            type: 'login/clearmsg',

        })

    }

    changeCurrent = (current) => {
        this.setState({ current });
    }

    toResetPassword = () => {
        this.changeCurrent("reset")
    }

    render() {
        const loginContent = (
            <div className={styles.cardContainer}>

                <Tabs type="card" onChange={this.onClose}>
                    <TabPane tab={<span><Icon type="lock" />账号密码登录</span>} key="1">

                        
                        <LoginByPasswordForm toResetPassword={this.toResetPassword} loading={this.props.accountLoginLoading} handleSubmitByPassword={this.handleSubmitByPassword} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="user" />手机验证码登录</span>} key="2">

                       
                        <LoginByCode
                            handleSubmitByTelCode={this.handleSubmitByTelCode}
                            getcodevisableByPassward={this.state.getcodevisableByPassward}
                            pms={this.props.pms}
                        />
                    </TabPane>

                </Tabs>

                {
                    this.props.msg != '' ? (
                        <Alert message={this.props.msg} type="error" onClose={this.onClose} closable showIcon />
                    ) : ''
                }
            </div>
        )

        const resetContent = (
            <ResetPassword changeCurrent={this.changeCurrent}/>
        )

        const title = (
            this.state.current == 'login' ? '登录窗口' : '修改密码'
        )

        return (
            <Modal
                title={title}
                visible={this.props.visible}
                onCancel={this.handleCancel}
                cancelText="关闭"
                destroyOnClose={true}
                wrapClassName={styles.container}
                destroyOnClose
                footer={false}
            >
                {
                    this.state.current == 'login' ? loginContent : resetContent
                }
            </Modal>
        );
    }
}
