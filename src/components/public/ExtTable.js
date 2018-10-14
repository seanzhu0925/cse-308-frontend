import React, { Component } from 'react';
import { Card, Button, Table, Icon, Dropdown, Menu, Checkbox, Row, Col, Pagination, Spin } from 'antd';
import { connect } from 'dva';
import styles from './ExtTable.less';

const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;

export default class ExtTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            visible: false,
            listType: 'table'
        }
    }

    getSelectedColumns = () => {
        return this.state.columns;
    }

    onChangeChecked = (checkedValues) => {
        let checkedColumns = [];
        const { columns } = this.props;
        columns.map((column) => {
            checkedValues.map((index) => {
                if (index == column.key) {
                    checkedColumns.push(column);
                }
            })
        })
        this.setState({
            columns: checkedColumns
        })
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
            <Menu.Item className={styles.checkList}>
                <ColumnsMenu onChange={this.onChangeChecked} selectedColumns={this.getSelectedColumns} columns={this.props.columns} />
            </Menu.Item>
        </Menu>
    )

    handleVisibleChange = (flag) => {
        this.setState({ visible: flag });
    }

    changeListType = (type) => {
        let listType;
        if (type == 'table') {
            listType = 'card';
        } else {
            listType = 'table';
        }
        this.setState({
            listType
        })
        if (this.props.pageChange) {
            this.props.pageChange({ current: this.props.pagination.current, pageSize: this.props.pagination.pageSize });
        }
    }

    onChange = (current, pageSize) => {
        this.props.pageChange({ current, pageSize });
    }

    renderList = () => {
        const { listType } = this.state;
        if (listType == 'table') {
            return (
                <Table
                    scroll={this.props.scroll}
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
            )
        } else {
            return (
                <Spin spinning={this.props.loading}>
                    <Row gutter={16}>
                        {
                            this.props.dataSource ? this.props.dataSource.map((dataItem, index) => {
                                return (
                                    <Col xs={24} sm={24} md={12} key={index}>
                                        <Card style={{ marginBottom: 20 }}>
                                            <ul style={{ listStyleType: 'none' }}>
                                                {
                                                    this.state.columns.filter(item => { return item.key != 'operation' }).map((columnItem, index2) => {
                                                        return (
                                                            <li key={index2}>
                                                                {/* <span style={{ fontWeight: 'bold' }}>{columnItem.title}: </span>
                                                                {
                                                                    columnItem.render ? columnItem.render(dataItem[columnItem.dataIndex],dataItem) : dataItem[columnItem.dataIndex]
                                                                } */}
                                                                <Row>
                                                                    <Col span={6}>
                                                                        <span style={{ fontWeight: 'bold' }}>{columnItem.title}: </span>
                                                                    </Col>
                                                                    <Col span={18}>
                                                                        {
                                                                            columnItem.render ? columnItem.render(dataItem[columnItem.dataIndex], dataItem) : dataItem[columnItem.dataIndex]
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </Card>
                                    </Col>
                                )
                            }) : ''
                        }
                    </Row>
                    {
                        this.props.pagination ? (
                            <Pagination onShowSizeChange={this.onChange} onChange={this.onChange} size="small" {...this.props.pagination} style={{ textAlign: 'right' }} />
                        ) : ''
                    }
                </Spin>
            )
        }
    }

    render() {
        return (
            <div className={styles.container} style={{ width: '100%' }}>
                <div className={styles.tableOperations}>
                    {this.props.toolbar ? this.props.toolbar : <div></div>}
                    <ButtonGroup>
                        <Button onClick={this.props.show}><Icon type="reload" /></Button>
                        <Button onClick={this.changeListType.bind(this, this.state.listType)}><Icon type="profile" /></Button>
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
                {
                    this.renderList()
                }
            </div>
        )
    }
}

const ColumnsMenu = ({ columns, selectedColumns, onChange }) => {
    const selected = selectedColumns();
    let options = [];
    let defaultValue = [];
    columns.map((item) => {
        if (item.key) {
            options.push({
                label: item.title,
                value: item.key,
                disabled: selected.length == 1 && selected[0].key == item.key ? true : false
            })
        }
    })
    columns.map((item) => {
        if (item.key) {
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




