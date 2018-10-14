import React, { Component } from 'react';
import Cards from './../../components/DeveloperService/console/Cards';
import styles from './Console.less';
import { titelcard, titelcards, titelcardss } from '../../components/DeveloperService/console/data'
import { Card, Divider, Icon, List, Avatar, Pagination } from 'antd';
import { connect } from 'dva';



import { getRoutes, getMatchRoute, } from './../../utils/utils';
import { getRouterData } from './../../common/router';
import MenuRoute from './MenuRoute'
import { Link } from 'dva/router';


@connect(({ consolesss, loading }) => {
    return {
        consolesss,
        loading: loading.effects['consolesss/fetch'],
    }
})

export default class Consoles extends Component {
    constructor(props) {
        super(props);
        this.state = {



        }
    }



    componentDidMount() {
        //从后台获取数据   异步请求
        let aa = this.props.dispatch({
            type: 'consolesss/fetch',
        })
    }




    render() {
        return (
            <div>
                <div className={styles.cardtitel} style={{ width: '100%' }}>
                    <Cards cardlist={this.props.consolesss.titelcard.Pagination.dataSource} handleTab={this.props.handleTab} />
                </div>
                <div className={styles.cardtitel} style={{ width: '34%', float: 'left', backgroundColor: 'black', marginTop: '2%' }}>
                    <Cards cardlist={this.props.consolesss.titelcards.Pagination.dataSource} />
                </div>
                <div className={styles.cardtitel} style={{ width: '60%', float: 'right', backgroundColor: 'red', marginTop: '2%' }}>
                    <Cards cardlist={this.props.consolesss.titelcardss.Pagination.dataSource} addComponent={this.props.addCompant} />
                </div>
                <div>

                </div>
            </div>
        );

    }



}
