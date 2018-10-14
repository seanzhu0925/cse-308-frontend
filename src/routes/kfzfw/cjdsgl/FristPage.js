import { Component } from 'react';
import styles from './FristPage.less'
import moment from 'moment';
import { Card, Icon, Tabs, Breadcrumb, Button, DatePicker, LocaleProvider, Input, Row, Col, Table, Popconfirm, Dropdown, Menu, Checkbox, notification, Pagination } from 'antd';
import { connect } from 'dva';
import AppRegisterList from './AppRegisterList';

const CheckboxGroup = Checkbox.Group;
const ButtonGroup = Button.Group;
moment.locale('zh-cn');












const columns = [{
    title: '应用名称',
    dataIndex: 'servicename',
    key: 'servicename',
}, {
    title: '申请包名',
    dataIndex: 'requestpkgname',
    key: 'requestpkgname',
}, {
    title: '应用类型',
    dataIndex: 'requesttype',
    key: 'requesttype',
}, {
    title: '申请时间',
    dataIndex: 'requesttime',
    key: 'requesttime',
}, {
    title: '状态',
    dataIndex: 'requeststate',
    key: 'requeststate',
}]

@connect(({ appservices, loading }) => {
    return {
        appservices,
        loading: loading.effects['appservices/querylist'],
    }
})
class FristPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            querystring: '',
            stime: '',
            etime: '',
            fstime: '',
            fetime: '',
            dataSource: [],
            culcolumns: columns,
            columns: columns,
            pagination: {
                defaultCurrent: 1,
                defaultPageSize: 5,
                current: '',//this.getPageSet("current"),
                pageSize: '', //this.getPageSet("pagesize"),
                pageSizeOptions: ['5', '10', '15'],
                showSizeChanger: true,
                total: '',//this.getPageSet("total"), 
                showQuickJumper: true,
                onShowSizeChange: this.onShowSizeChange.bind(this),
                onChange: this.onPageChange.bind(this),
                showTotal: this.onshowTotal.bind(this),
            }

        }

    }

    componentDidMount() {  //初始获取数据
        this.props.dispatch({
            type: 'appservices/querylist',
            current: this.state.pagination.defaultCurrent,
            pageSize: this.state.pagination.defaultPageSize,
        })
    }

    queryClick() {  //查询按钮 回调
        let { defaultCurrent, defaultPageSize } = this.state.pagination;
        let { querystring, etime, stime } = this.state;
        this.props.dispatch({
            type: 'appservices/querylist',
            querystring: querystring,
            stime: stime,
            etime: etime,
            current: defaultCurrent,
            pageSize: defaultPageSize
        })
    }



    reloadClick() {   //重载按钮 点击回掉
        this.props.dispatch({
            type: 'appservices/querylist',
            current: this.state.pagination.defaultCurrent,
            pageSize: this.state.pagination.defaultPageSize,
        })
    }
    onInputChange(event) {  //获取输入框值
        this.setState({
            querystring: event.target.value,
        })


    }
    onChangeDispatherData(current, pageSize) {  //翻页数据请求
        let { stime, etime, querystring } = this.state;
        this.props.dispatch({
            type: 'appservices/querylist',
            querystring: querystring,
            stime: stime,
            etime: etime,
            current: current,
            pageSize: pageSize,
        })

    }
    dropchange(checkedValues) {   //表格字段自定义过滤列
        let checkedarr = [...checkedValues];
        let newcolunms = [...this.state.columns];
        if (checkedarr.length > 0) {
            let arr = newcolunms.filter(function (item) {
                let flag = false;
                checkedValues.forEach(element => {
                    if (item.title == element) {
                        flag = true;
                        return;
                    }

                });

                return flag;
            })
            this.setState({
                culcolumns: arr,
            })
        } else {
            notification.error({
                message: "操作失败",
                description: "注意至少保留一个列名",
                duration: 20,
            });
        }
    }

    onPageChange(current, pageSize) {  //页码改变
        this.setState({
            pagination: {
                current: current,
                pageSize: pageSize,
            }
        })
        //数据量少  防止每次换页都重新渲染页面  和后台获取  
        //判断所查询数据  与 pagesize 是否整除
        let { total, dataSource } = this.props.appservice.Pagination;
        if (dataSource.length % pageSize == 0 && total == dataSource.length) { }
        else { this.onChangeDispatherData(current, pageSize); }

    }
    onShowSizeChange(current, pageSize) { //每页显示条数
        this.setState({
            pagination: {
                pageSize: pageSize,
            }
        })
    }
    onshowTotal() {   //分页器文字显示
        let { total, current } = this.props.appservices.Pagination;
        let totals = total != '' || total != undefined ? total : 0;
        let currents = current != '' || current != undefined ? current : this.state.pagination.defaultCurrent;
        if (this.state.pagination.total == "" || this.state.pagination.total == undefined) {   //这部防止无线循环 但是仍然要渲染两次
            this.setState({
                pagination: {
                    total: totals,
                }
            })
        }
        return `总共${totals}条`;
    }

    onChangeStime(value, dataString) {

        this.setState({
            fstime: moment(dataString),
            stime: dataString,
        })

    }

    onChangeEtime(value, dataString) {
        this.setState({
            fetime: moment(dataString),
            etime: dataString
        })
    }

    render() {
        return (
            <div >
                <div className={styles.cardtitels} style={{ background: '#F3F3F3', width: '95 %', margin: 'auto' }}>
                    <Card bordered={false}  >
                        <AppRegisterList
                            pagination={this.state.pagination}
                            onInputChange={this.onInputChange.bind(this)}
                            queryClick={this.queryClick.bind(this)}
                            titelcardssPaginationSet={this.props.appservices.Pagination}
                            columns={this.state.columns}
                            culcolumns={this.state.culcolumns}
                            dropchange={this.dropchange.bind(this)}
                            reloadClick={this.reloadClick.bind(this)}
                            onShowSizeChange={this.onShowSizeChange.bind(this)}
                            styles={styles}
                            addCompant={this.props.addCompant}

                            onChangeStime={this.onChangeStime.bind(this)}
                            onChangeEtime={this.onChangeEtime.bind(this)}
                            stime={this.state.fstime}
                            etime={this.state.fetime}
                        />
                    </Card>
                </div>
            </div>

        );
    }
}






export default FristPage;
