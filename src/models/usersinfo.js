import { message } from 'antd';
import { queryAppList as query,searchFb, doAddFd } from '../services/fdback';
import { config } from '../config/globalConfig';


export default {
  namespace: 'usersinfo',
  state: {
    list: [],
    record: {},
    pagination: {
      ...config.globalPagination
    },
    fdStatus: undefined,
    searchValues: {},
  },

  effects: {
    *initFetch(_, { call, put, select }) {
      const { list } = yield select(state => state.feedback);
      if (list && list.length > 0) {
        return;
      }
      yield put({
        type: 'fetch',
      });

    },
    *fetch(_, { call, put, select }) {
      const { pagination, searchValues, fdStatus } = yield select(state => state.feedback);
      const { current, pageSize } = pagination;
      const response = yield call(query,{
        current,pageSize,...searchValues, fdStatus
      });
      console.log("fetch response",response);
      if(!response){
        return;
      }
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
      
       const response = yield call(searchFb,searchValues);
      //yield call(  , searchValues);
      console.log('SEARCHHHHH response: ',response);
      yield put({ type: 'resetCurrent' })
      yield put({
        type: 'save',
        payload: response,
      });  
    },

    *add({ params }, { call, put, select }){
      
       const response = yield call(doAddFd,params);
      //yield call(  , searchValues);
      console.log('add response: ',response);
      yield put({ type: 'resetCurrent' })
      yield put({
        type: 'save',
        payload: response,
      });  
    },

    *pageChange({ payload }, { call, put, select }){
      const { current,pageSize,fdStatus } = payload;
      console.log("payload",payload);
      yield put({
        type: 'setPage',
        payload
      })
      yield put({ type: 'fetch' });
    },
    
    *changeApprovalType({ value }, { call, put }){
      yield put({
        type: 'saveApprovalType',
        value
      })
      yield put({ type: 'fetch' });
    },
    *saveEditRecord({ record }, { call, put }) {
      console.log('saveEditRecord', record);
      yield put({
        type: 'setRecord',
        record
      })
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
    setRecord(state, { record }) {
      console.log('setRecord: ', record);
      return {
        ...state,
        record
      }
    },
    setSearchValues(state, { searchValues }) {
      return {
        ...state,
        searchValues
      }
    },
    setPage(state, { payload }){
      const { current, pageSize, fdStatus } = payload;
      let pagination = state.pagination;
      pagination.current = current;
      pagination.pageSize = pageSize;
      return {
        ...state,
        fdStatus,
        pagination
      }
    },
    saveApprovalType(state, { value }) {
      return {
        ...state,
        approvalType: value
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
    updateCurrent(state, _) {
      let { list, pagination } = state;
      if (list.length == 1 && pagination.current > 1) {
        pagination.current = pagination.current - 1
      }
      return {
        ...state,
        pagination
      }
    },
    resetState(state){
      return {
        ...state,
        list: [],
        searchValues: {},
        editVisible: false,
        approvalType:'',
        pagination: {
          ...config.globalPagination
        }
      }
    }
  },
};
