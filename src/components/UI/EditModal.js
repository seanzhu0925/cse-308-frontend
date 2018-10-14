import React, { Component } from 'react';
import { Modal, Card, Row, Col, Input, Button, Checkbox, Tooltip, DatePicker, Icon, Cascader, Form, Radio, Select } from 'antd';
import { config } from '../../config/equipment';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const EditModal = (props) => {

    const { getFieldDecorator } = props.form;

    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
            props.doEdit(values);
        });
    }

    const formItemLayout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        },
    };
    return (
        <div>
            <Modal
                title="资源信息"
                visible={props.editVisible}
                onOk={handleSubmit}
                onCancel={props.closeEdit}
                width={718}
                confirmLoading={props.loading}
            >
                <Form>
                    {getFieldDecorator('id')(
                        <Input type="hidden" />
                    )}
                    <Row gutter={12}>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="告警类别"
                            >
                                {getFieldDecorator('warntype', {
                                    initialValue: config.equipment.warntype[0].key,
                                    rules: [{
                                        required: true,
                                        message: '请选择告警类别',
                                    }],
                                })(
                                    <Select>
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
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="设备IP"
                            >
                                {getFieldDecorator('ip')(
                                    <Input disabled={true} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="设备名称"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                        message: '请输入设备名称',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem
                                {...formItemLayout}
                                label="别名"
                            >
                                {getFieldDecorator('nickname', {
                                    rules: [{
                                        required: true,
                                        message: '请输入别名',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

const mapPropsToFields = ({ record }) => {
    if (record) {
        return {
            id: Form.createFormField({
                value: record.id,
            }),
            warntype: Form.createFormField({
                value: record.warntype,
            }),
            ip: Form.createFormField({
                value: record.ip,
            }),
            name: Form.createFormField({
                value: record.name,
            }),
            nickname: Form.createFormField({
                value: record.nickname,
            })
        };
    }
}

export default Form.create({ mapPropsToFields })(EditModal);