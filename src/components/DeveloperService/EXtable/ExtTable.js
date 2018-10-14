import React, { Component } from 'react';
import { Modal, Card, Button, Table, Icon, Divider, Popconfirm, Dropdown, Menu, Checkbox, Form } from 'antd';
import { connect } from 'dva';
import styles from './ExtTable.less';

const FormItem = Form.Item;
const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;

@Form.create()
export default class ExtTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            visible: false,
        }
    }

    getSelectedColumns = () => {
        return this.state.columns;
    }

    onChange = (checkedValues) => {
        let checkedColumns = [];
        const { columns } = this.props;
        columns.map((column) => {
            checkedValues.map((index) => {
                if(index == column.key){
                    checkedColumns.push(column);
                }
            })
        })
        this.setState({
            columns:checkedColumns
        })
        console.log('checked = ', checkedValues);
    }

    menu = (
        <Menu>
            {/* {this.props.columns.map((item) => {
                return (
                    <Menu.Item key={item.dataIndex}>
                        <FormItem>
                            {this.props.form.getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                            })(
                                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                            )}
                        </FormItem>
                    </Menu.Item>
                )
            })} */}
            <div className={styles.checkList}>
                <ColumnsMenu onChange={this.onChange} selectedColumns={this.getSelectedColumns} columns={this.props.columns} />
            </div>
        </Menu>
    )

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div className={styles.container} style={{ width: '100%' }}>
                <div className={styles.tableOperations}>
                    <ButtonGroup>
                        <Button onClick={this.props.show}><Icon type="reload" /></Button>
                        <Dropdown
                            overlay={this.menu}
                            onVisibleChange={this.handleVisibleChange}
                            visible={this.state.visible}
                        >
                            <Button>
                                <Icon type="bars" /><Icon type="down" />
                            </Button>
                        </Dropdown>
                    </ButtonGroup>
                </div>
                <Table
                    rowKey="id"
                    columns={this.state.columns}
                    dataSource={this.props.dataSource}
                    bordered
                    size="small"
                    pagination={this.props.pagination}
                    onChange={this.props.pageChange}
                    loading={this.props.loading}
                    rowClassName={(record, index) => index % 2 == 0 ? styles.evenRow : styles.oddRow}
                />
            </div>
        )
    }
}

const ColumnsMenu = ({ columns, selectedColumns, onChange }) => {
    let options = [];
    let defaultValue = [];
    columns.map((item) => {
        if(item.key){
            options.push({
                label: item.title,
                value: item.key,
                disabled: item.key == "operation" ? true : false
            })
        }
    })
    columns.map((item) => {
        if(item.key){
            defaultValue.push(item.key);
        }
    })
    // const options = [
    //     { label: 'Apple', value: 'Apple' },
    //     { label: 'Pear', value: 'Pear' },
    //     { label: 'Orange', value: 'Orange' },
    // ];
    return (
        <CheckboxGroup options={options} defaultValue={defaultValue} onChange={onChange} />
    )
}




