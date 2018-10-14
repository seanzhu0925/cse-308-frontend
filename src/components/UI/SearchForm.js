import React, { Component } from 'react';
import { Modal, Card, Row, Col, Input, Button, Checkbox, Tooltip, DatePicker, Icon, Cascader, Form, Radio, Select } from 'antd';
import { connect } from 'dva';
import styles from './SearchForm.less';
import { config } from '../../config/equipment';
import { getNameFromConfig } from '../../utils/utils';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const SearchForm = (props) => {

    const handleReset = () => {
        props.form.resetFields();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            props.setSearchValues(values);
        });
    }
    const { getFieldDecorator } = props.form;

    const formItemLayout = {
        labelCol: {
            span: 8
        },
        wrapperCol: {
            span: 16
        },
    };
    return (
        <div className={styles.container}>
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Row gutter={12}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="告警类别"
                            >
                                {getFieldDecorator('warntype',{
                                    initialValue: '',
                                })(
                                    <Select>
                                        <Option value=''>所有</Option>
                                       {
                                           config.equipment.warntype.map(item => {
                                               return (
                                                    <Option key={item.key} value={item.key}>{item.name}</Option>
                                               )
                                           })
                                       }
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="设备IP"
                            >
                                {getFieldDecorator('ip')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="设备名称"
                            >
                                {getFieldDecorator('name')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="登录名"
                            >
                                {getFieldDecorator('item2')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="昵称"
                            >
                                {getFieldDecorator('nickname')(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="类型"
                            >
                                {getFieldDecorator('type')(
                                    <Select>
                                    {
                                        config.equipment.type.map(item => {
                                            return (
                                                 <Option key={item.key} value={item.key}>{item.name}</Option>
                                            )
                                        })
                                    }
                                 </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                {...formItemLayout}
                                label="设备厂商"
                            >
                                {getFieldDecorator('item12',{
                                    initialValue: 'jack'
                                })(
                                    <Select>
                                        <Option value="jack">厂商1</Option>
                                        <Option value="lucy">厂商2</Option>
                                        <Option value="disabled">厂商3</Option>
                                        <Option value="Yiminghe">厂商4</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} style={{ textAlign: 'right', marginTop: 3 }}>
                            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
                            <span className={styles.resetBtn}>
                                <Button style={{ marginLeft: 8, backgroundColor: '#08CEB9', borderColor: '#08CEB9', color: '#FFF' }} onClick={handleReset}>
                                    <Icon type="delete" />重置
                                </Button>
                            </span>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    )
}

const mapPropsToFields = (props) => {
    return {
        warntype: Form.createFormField({
            value: config.equipment.warntype[0].key,
        }),
        item12: Form.createFormField({
            value: 'jack',
        })
    };
}


export default Form.create()(SearchForm);