import React, { Component } from 'react';
import { Modal, Button, Form, Input, Upload, Icon, Select } from 'antd';
import styles from './UrlParamAddModal.less';

const FormItem = Form.Item;
const Option = Select.Option;
let uuid = 1;

const UrlParamAddModal = (props) => {

    const handleSubmit = () => {
        props.form.validateFields((err, values) => {
            if (!err) {
                let data = "";
                values.keys.map(item => {
                    data += "[";
                    data += values[`name${item}`];
                    data += ":";
                    data += values[`type${item}`];
                    data += "],";
                })
                // console.log(data);
                if (data.length > 0) {
                    props.handleOk(data.substring(0, data.length - 1));
                }
            }
        });
        // props.handleOk();
    }

    const add = () => {
        const { form } = props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    const remove = (k) => {
        const { form } = props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    const validateName = (rule, value, callback) => {
        const form = props.form;
        if (value && value.indexOf(",") != -1) {
            callback('参数名包含非法字符!');
        } else {
            callback();
        }
    }

    const { getFieldDecorator, getFieldValue } = props.form;

    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 3 },
        },
    };

    const prefixSelector = (k) => (getFieldDecorator(`type${k}`, {
        initialValue: 'object',
    })(
        <Select>
            <Option value="object">object</Option>
            <Option value="string">string</Option>
            <Option value="boolean">boolean</Option>
            <Option value="int">int</Option>
            <Option value="long">long</Option>
        </Select>
    ));

    getFieldDecorator('keys', { initialValue: [0] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
        return (
            <FormItem
                {...formItemLayoutWithOutLabel}
                required={false}
                key={k}
            >
                {getFieldDecorator(`name${k}`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "请填写参数名称",
                    }, {
                        validator: validateName,
                    }],
                })(
                    <Input placeholder="请填写参数名称" addonBefore={prefixSelector(k)} style={{ width: '80%' }} />
                )}
                {keys.length > 1 ? (
                    <Icon
                        className={styles.deleteBtn}
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => remove(k)}
                    />
                ) : null}
            </FormItem>
        );
    });
    return (
        <div>
            <Modal
                title="添加请求参数"
                visible={props.visible}
                onOk={handleSubmit}
                onCancel={props.handleCancel}
            // confirmLoading={props.loading}
            >
                <Form>
                    {formItems}
                    <FormItem {...formItemLayoutWithOutLabel}>
                        <Button type="dashed" onClick={add} style={{ width: '80%' }}>
                            <Icon type="plus" /> 添加参数
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    )
}

const mapPropsToFields = (props) => {
    // const { record } = props;
    // if (record && Object.keys(record).length > 0) {
    //     const keys = Object.keys(record);
    //     let initData = {};
    //     keys.map((key) => {
    //         initData[key] = Form.createFormField({
    //             value: record[key],
    //         })
    //     })
    //     return initData;
    // }
    // const keys = ['q','w'];
    const val = props.value;
    if (val && val.length > 0) {
        const valArr = val.split(',');
        let initData = {};
        let keys = [];
        valArr.map((item) => {
            const itemArr = item.substring(1, item.length - 1).split(':');
            keys.push(uuid);
            initData[`name${uuid}`] = Form.createFormField({
                value: itemArr[0],
            });
            initData[`type${uuid}`] = Form.createFormField({
                value: itemArr[1],
            });
            uuid++;
        })
        initData['keys'] = Form.createFormField({
            value: keys,
        });
        return initData;
    }
}

export default Form.create({ mapPropsToFields })(UrlParamAddModal);