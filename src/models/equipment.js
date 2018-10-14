import { message } from 'antd';
import { query, doEdit, doDelete, deleteBatch } from '../services/equipment';

export default {
  namespace: 'equipment',

  state: {
    list: [],
    pagination: {
      defaultCurrent: 1,
      defaultPageSize: 5,
      current: 1,
      pageSize: 5,
      pageSizeOptions: ['5', '10', '15'],
      showSizeChanger: true,
      total:"",
      showTotal: (total)=>{
        return `共 ${total} 项`;
      }
    },
    selectedRowKeys: [],
    selectedRows: [],
    searchValues: {},
    editVisible: false
  },

  effects: {
    *fetch(_, { call, put, select }) {
      const { pagination, searchValues } = yield select(state => state.equipment);
      const { current, pageSize } = pagination;
      const response = yield call(query,{
        current,pageSize,...searchValues
      });
      yield put({
          type: 'save',
          payload: response,
      });
      yield put({ 
        type: 'setSelectedData',
        payload: {
          selectedRowKeys: [],
          selectedRows: []
        } 
      });
    },
    *search({ searchValues }, { call, put, select }){
      yield put({
        type: 'setSearchValues',
        searchValues: searchValues,
      });
      yield put({ type: 'resetCurrent' })
      yield put({ type: 'fetch' });
    },
    *doEdit({ payload }, { call, put, select }) {
      const response = yield call(doEdit,payload);
      if(response.status == "success"){
        yield put({ type: 'resetCurrent' })
        yield put({ type: 'fetch' });
        yield put({
          type: 'setSelectedData',
          payload: {
            selectedRowKeys: [],
            selectedRows: [],
          }
        })
        yield put({
          type: 'setEditVisible',
          editVisible: false
        })
      }else{
        message.error(response.msg);
      }
    },
    *delete({ payload }, { call, put }){
      const response = yield call(doDelete,payload);
      if(response.status == 'success'){
        yield put({ type: 'resetCurrent' });
        yield put({ type: 'fetch' });
      }else{
        message.error(response.msg);
      }
    },
    *deleteBatch({ payload }, { call, put }){
      const response = yield call(deleteBatch,payload);
      if(response.status == 'success'){
        yield put({ type: 'resetCurrent' });
        yield put({ type: 'fetch' });
      }else{
        message.error(response.msg);
      }
    },
    *pageChange({ payload }, { call, put, select }){
      const { current,pageSize } = payload;
      yield put({
        type: 'setPage',
        payload
      })
      yield put({ type: 'fetch' });
    }
  },

  reducers: {
    save(state, { payload }) {
      let pagination = state.pagination;
      pagination.total = payload.total;
      return {
        ...state,
        list: payload.rows,
        pagination
      };
    },
    setEditVisible(state, { editVisible }) {
      return {
        ...state,
        editVisible
      };
    },
    showEditWithRecord(state, { record }) {
      return {
        ...state,
        selectedRows: [record],
        editVisible: true
      }
    },
    setSearchValues(state, { searchValues }) {
      return {
        ...state,
        searchValues
      }
    },
    setPage(state, { payload }){
      const { current, pageSize } = payload;
      let pagination = state.pagination;
      pagination.current = current;
      pagination.pageSize = pageSize;
      return {
        ...state,
        pagination
      }
    },
    resetCurrent(state,_){
      let pagination = state.pagination;
      pagination.current = 1;
      return {
        ...state,
        pagination
      }
    },
    setSelectedData(state, { payload }){
      const { selectedRowKeys, selectedRows } = payload;
      return {
        ...state,
        selectedRowKeys,
        selectedRows
      }
    },
    resetState(state){
      let pagination = state.pagination;
      pagination.current = 1;
      pagination.pageSize = 5;
      return {
        ...state,
        list: [],
        selectedRowKeys: [],
        selectedRows: [],
        searchValues: {},
        editVisible: false,
        pagination
      }
    }
  },
};
