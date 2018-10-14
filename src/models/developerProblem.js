import { message } from 'antd';
import { queryList } from '../services/DeveloperService/DeveloperProblem';
import { config } from '../config/globalConfig';

export default {
  namespace: 'developerProblem',
  state: {
    list: [],
    pagination: {
      ...config.globalPagination
    },
    searchValues: {}
  },

  effects: {
    *fetch(_, { call, put, select }) {
      const { pagination, searchValues } = yield select(state => state.developerProblem);
      const { current, pageSize } = pagination;
      const response = yield call(queryList,{
        current,pageSize,...searchValues
      });
      if(!response){
        return;
      }
      yield put({
          type: 'save',
          payload: response,
      });
    },
    *search({ searchValues }, { call, put }){
      yield put({
        type: 'setSearchValues',
        searchValues: searchValues,
      });
      yield put({ type: 'resetCurrent' })
      yield put({ type: 'fetch' });
    },
    *pageChange({ payload }, { call, put, select }){
      const { current,pageSize } = payload;
      yield put({
        type: 'setPage',
        payload
      })
      yield put({ type: 'fetch' });
    },
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
    resetState(state){
      return {
        ...state,
        list: [],
        searchValues: {},
        modalVisible: false,
        pagination: {
          ...config.globalPagination
        }
      }
    }
  },
};
