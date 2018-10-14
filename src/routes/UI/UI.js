import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {
  Row,
  Icon,
  Card,
  Table,
  Button,
  Modal,
  message
} from 'antd';
import SearchForm from '../../components/UI/SearchForm';
import EquipmentTable from '../../components/UI/EquipmentTable';
import EditModal from '../../components/UI/EditModal';
import styles from './UI.less';

const confirm = Modal.confirm;
// @connect(({ chart, loading }) => ({
//   chart,
//   loading: loading.effects['chart/fetch'],
// }))
@connect(({ equipment, loading }) => {
  const { list,pagination, current, pageSize, editVisible, searchValues,selectedRowKeys, selectedRows } = equipment;
  return {
    list,
    pagination,
    editVisible,
    searchValues,
    selectedRowKeys,
    selectedRows,
    loading: loading.effects['equipment/fetch'],
    submitting: loading.effects['equipment/doEdit'],
  };
})
export default class UI extends Component {
  state = {
    searchValues: {},
    current: 1,
    pageSize: 5,
    editVisible: false,
    selectedRowKeys: [],
    selectedRows: []
  };

  componentDidMount() {
    this.show();
  }
  componentWillUnmount(){
    this.props.dispatch({
      type: 'equipment/resetState'
    });
  }

  show = (current = this.props.current, pageSize = this.props.pageSize) => {
    this.props.dispatch({
      type: 'equipment/fetch',
      payload: {
        current,
        pageSize,
        ...this.props.searchValues
      }
    });
  }

  setSearchValues = (values) => {
    this.props.dispatch({
      type: 'equipment/search',
      searchValues: values
    })
  }

  showEdit = () => {
    if (this.props.selectedRowKeys.length != 1) {
      // Modal.warning({
      //   content: '请先选择一条数据！',
      // });
      message.warning('请先选择一条数据');
      return false;
    }
    this.props.dispatch({
      type: 'equipment/setEditVisible',
      editVisible: true
    })
    // this.setState({
    //   editVisible: true
    // })
  }

  showEditWithRecord = (record) => {
    this.props.dispatch({
      type: 'equipment/showEditWithRecord',
      record
    })
  }

  closeEdit = () => {
    this.props.dispatch({
      type: 'equipment/setEditVisible',
      editVisible: false
    })
    // this.setState({
    //   editVisible: false
    // })
  }

  pageChange = ({ current, pageSize }) => {
    this.props.dispatch({
      type: 'equipment/pageChange',
      payload: {
        current,
        pageSize
      }
    })
    // this.setState({
    //   current,
    //   pageSize
    // }, () => {
    //   this.show();
    // })
  }

  rowSelection = (selectedRowKeys, selectedRows) => {
    // this.setState({
    //   selectedRowKeys,
    //   selectedRows
    // })
    this.props.dispatch({
      type: 'equipment/setSelectedData',
      payload: {
        selectedRowKeys, 
        selectedRows
      }
    });
  }

  doEdit = (values) => {
    this.props.dispatch({
      type: 'equipment/doEdit',
      payload: values
    });
  }

  delete = (record) => {
    this.props.dispatch({
      type: 'equipment/delete',
      payload: record.id
    });
  }

  deleteBatch = () => {
    const { selectedRowKeys } = this.props;
    if(selectedRowKeys.length == 0){
      message.warning('请至少选择一条数据');
      return false;
    }
    confirm({
      title: `确认删除${selectedRowKeys.length}条数据？`,
      onOk: () => {
        this.props.dispatch({
          type: 'equipment/deleteBatch',
          payload: selectedRowKeys
        });
      }
    });

  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <EditModal
          editVisible={this.props.editVisible}
          closeEdit={this.closeEdit}
          record={this.props.selectedRows[0]}
          doEdit={this.doEdit}
          loading={this.props.submitting}
        />
        <div style={{ marginBottom: 10 }}>
          <SearchForm setSearchValues={this.setSearchValues} />
        </div>
        <div className={styles.container}>
          <Card>
            <div className={styles.tableOperations}>
              <Button type="primary" onClick={this.showEdit}>修改</Button>
              <Button onClick={this.deleteBatch}>删除</Button>
            </div>
            <EquipmentTable
              dataSource={this.props.list}
              pagination={this.props.pagination}
              pageChange={this.pageChange}
              loading={this.props.loading}
              rowSelection={this.rowSelection}
              selectedRowKeys={this.props.selectedRowKeys}
              showEditWithRecord={this.showEditWithRecord}
              delete={this.delete}
            />
          </Card>
        </div>
      </div>
    );
  }
}
