import { List, Card, Icon } from 'antd'
import { connect } from 'dva';
import { Component } from 'react';
import { config } from '../../../config/globalConfig';
import styles from './DeveloperProblem.less'

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

const { serverUrl, serverName, upload } = config;
@connect(({ developerProblem, loading }) => {
    const { list, pagination, searchValues } = developerProblem;
    return {
        list,
        pagination,
        searchValues,
        loading: loading.effects['developerProblem/fetch'],
    };
})
class DeveloperProblem extends Component {
    state = {
        currentType: 'list',
        record: {},
        recordService: {}
    };

    show = () => {
        switch (this.state.currentType) {
            case 'list':
                this.props.dispatch({
                    type: 'developerProblem/fetch'
                });
                break;
            default:
                break;
        }
    }
    pageChange = (current, pageSize) => {
        this.props.dispatch({
            type: 'developerProblem/pageChange',
            payload: {
                current,
                pageSize
            }
        })
    }
    componentDidMount() {
        this.show();
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'developerProblem/resetState'
        });
    }

    render() {
        const { current, pageSize } = this.props.pagination;
        return (
            <div style={{ width: '100%' }}>
                <div className={styles.cardtitel} style={{ background: '#F3F3F3', width: '80%', margin: 'auto' }}>

                    <Card title='常见问题' bordered={false}  >
                        <List
                            itemLayout="vertical"
                            size="large"
                            loading={this.props.loading}
                            pagination={{
                                ...this.props.pagination,
                                onChange: this.pageChange,
                                onShowSizeChange: this.pageChange
                            }}

                            onChange={this.pageChange}
                            dataSource={this.props.list}
                            renderItem={(item, index) => (
                                <List.Item
                                    key={item.question}
                                /*   extra={
                                        <img width={272} alt="logo" src={`${serverUrl}/${serverName}${upload.previewAction}?id=${item.answerPicture}` } />}
                                */
                                >
                                    <List.Item.Meta
                                        title={<span style={{ fontWeight: 'blod', fontSize: '1.1em' }}>{(current - 1) * pageSize + index + 1}.{item.question}</span>}
                                        description={<span>答：{item.answer}</span>}
                                    />

                                </List.Item>
                            )}
                        />
                    </Card>

                </div>
            </div>
        )
    }
}

export default DeveloperProblem;