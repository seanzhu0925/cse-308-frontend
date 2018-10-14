import { Component } from 'react';
import { Rate, List, Pagination } from 'antd';
import styles from './CommentList.less'


class CommentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commontList: this.props.commontList,
        }
    }

    render() {
        return (
            <div className={styles.ratelistpaganiation}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.commontList}
                    loading={this.props.loading}
                    pagination={
                        {
                            ...this.props.pagination,
                            pageSizeOptions: ['5', '10', '15'],
                            onChange: this.props.pageChange,
                            onShowSizeChange: this.props.pageChange
                        }
                    }
                    renderItem={item => (
                        <List.Item actions={[<span>{item.sysAcquisitionTime}</span>]}>
                            <List.Item.Meta
                                title={<Rate allowHalf defaultValue={item.appScore} disabled />}
                                description={<div>{item.commentContent}</div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default CommentList;