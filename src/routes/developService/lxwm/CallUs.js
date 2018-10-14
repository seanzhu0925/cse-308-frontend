import { Component } from 'react';
import { Card, Row, Col, Divider } from 'antd';
import styles from './CallUs.less'

class CallUs extends Component {


    render() {
        return (<div className={styles.box} >
            <div className={styles.bg} ></div>
            <div style={{ width: '60%', margin: 'auto' }}>
                <div style={{ width: '80%', margin: 'auto', textAlign: 'center', fontWeight: 'bold', fontSize: '2.5em', paddingTop: '3%', color: '#1E1E1E' }}>联系我们</div>
                <div style={{ paddingTop: '5%', width: '80%', margin: 'auto', textAlign: 'center' }}>
                    <Row gutter={16} >
                        <Col span={12}>
                            <span style={{ fontSize: '1.2em', color: '#1E1E1E' }}>业务咨询：xxxxxxxxxxxxxxxxxxxx</span>
                        </Col>
                        <Col span={12}>
                            <span style={{ fontSize: '1.2em', color: '#1E1E1E' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;传真：xxxxxxxxxxxxxxxxxxxx</span>
                        </Col>
                        <Col span={12} style={{ marginTop: '1%' }}>
                            <span style={{ fontSize: '1.2em', color: '#1E1E1E' }}>客服服务：xxxxxxxxxxxxxxxxxxxx</span>
                        </Col>
                        <Col span={12} style={{ marginTop: '1%' }}>
                            <span style={{ fontSize: '1.2em', color: '#1E1E1E' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email：xxxxxxxxxxxxxxxxxxxx</span>
                        </Col>
                        <Col span={12} style={{ marginTop: '1%' }}>
                            <span style={{ fontSize: '1.2em', color: '#1E1E1E' }}>联系地址：xxxxxxxxxxxxxxxxxxxx</span>
                        </Col>
                        <Col span={12} style={{ marginTop: '1%' }}>
                            <span style={{ fontSize: '1.2em', color: '#1E1E1E' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;邮编：xxxxxxxxxxxxxxxxxxxx</span>
                        </Col>

                    </Row>

                </div>
                <div style={{ width: '80%', margin: 'auto', textAlign: 'right', fontWeight: 'bold', fontSize: '1.0em', paddingTop: '50%', color: '#1E1E1E' }}>四川省公安厅科技信息化处</div>

                <Divider />


            </div>

        </div>)
    }
}



export default CallUs;