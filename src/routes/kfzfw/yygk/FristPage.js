import { Component } from 'react';
import { Row, Col, Slider, Card, Icon, List, Avatar, Pagination } from 'antd';
import styles from './FristPage.less'
import CardAppList from '../../../components/DeveloperService/console/CardAppList';
import { connect } from 'dva';
import Ellipsis from 'components/Ellipsis';


@connect(({ applist, loading }) => {

    return {
        applist,
        loading: loading.effects['applist/querylist'],
    }
})
class FristPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pagination: {
                defaultCurrent: 1,
                defaultPageSize: 6,
                current: 1,//this.getPageSet("current"),
                pageSize: 6, //this.getPageSet("pagesize"),
                pageSizeOptions: ['5', '10', '15'],
                total: 10,//this.getPageSet("total"),        
            }
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'applist/querylist',
            current: this.state.pagination.defaultCurrent,
            pageSize: this.state.pagination.defaultPageSize,
        })
    }

    onChangeDispatherData(current, pageSize) {  //翻页数据请求
        this.props.dispatch({
            type: 'applist/querylist',
            current: current,
            pageSize: pageSize,
        })

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
        let { total, dataSource } = this.props.applist.applist.Pagination;
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
        let { total, current } = this.props.applist.applist.Pagination;
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
    render() {
        //let {applist} = this.props.applist.applist.Pagination;
        let datasource = []
        let total = 0;
        let addComponent = this.props.addCompant;
        if (this.props.applist.applist != undefined || this.props.applist.applist != null) {
            datasource = this.props.applist.applist.Pagination.dataSource
            total = this.props.applist.applist.Pagination.total
        }
        return (

            <div className={styles.cardList}>
                {/* <div className={styles.cardtitel} style={{ margin: 'auto', width: '95%', height: '46vh' }}>
                    <Row gutter={8}>
                        {
                            datasource.map(function (item) {
                                return (
                                    <Col span={8} key={item.id}>
                                        <CardAppList addComponent={addComponent} data={item} />
                                    </Col>)
                            })
                        }
                    </Row>
                </div>
                <div style={{ textAlign: 'center', paddingTop: '10vh' }}>

                    <Pagination
                        showQuickJumper
                        onChange={this.onPageChange.bind(this)}
                        onShowSizeChange={this.onShowSizeChange.bind(this)}
                        onshowTotal={this.onshowTotal.bind(this)}
                        defaultPageSize={9}
                        defaultCurrent={1}
                        current={this.state.pagination.current}
                        pageSize={this.state.pagination.pageSize}
                        total={this.props.applist.applist != undefined ? this.props.applist.applist.Pagination.total : 0}
                    /></div> */}
                <List
                    rowKey="id"
                    grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                    pagination={this.state.pagination}
                    dataSource={[...datasource]}
                    split={false}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <Card hoverable className={styles.card} actions={[
                                <a onClick={addComponent.bind(this, { url: '/console/yyxqs', titel: `${item.appname}---应用详情` })}>应用详情</a>,
                                <a onClick={addComponent.bind(this, { url: '/console/yyxqs', titel: `${item.appname}---应用详情` })}>版本信息</a>,
                            ]}>
                                <Card.Meta
                                    avatar={<img alt="" className={styles.cardAvatar} src={item.icon} />}
                                    title={<a>{item.appname}</a>}
                                    description={
                                        <Ellipsis className={styles.item} lines={3}>
                                            {item.appIntroduction}
                                        </Ellipsis>
                                    }
                                />
                            </Card>
                        </List.Item>
                    )
                    }
                />
            </div>
        )
    }
}


export default FristPage;