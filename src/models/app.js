import { queryAppList as query } from '../services/app';

export default {
  namespace: 'app',

  state: {
    list: [],
    pagination: {
        defaultCurrent: 1,
        defaultPageSize: 5,
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '15'],
        total:0
      },
    searchType: null,
  },

  effects: {
    *fetch(_, { call, put, select }) {
      const { pagination, searchType } = yield select(state => state.app);
      const { current, pageSize } = pagination;
      const response = yield call(query,{
        current,pageSize,searchType
      });
      yield put({
          type: 'save',
          payload: response,
      });
    },
    *pageChange({ payload }, { call, put, select }){
      const { current,pageSize } = payload;
      yield put({
        type: 'setPage',
        payload
      })
      yield put({ type: 'fetch' });
    },
    *getListByType({ appType }, { call, put }){
      
      yield put({
        type: 'setSearchType',
        searchType: appType
      });
      yield put({ type: 'resetCurrent' })
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
    setSearchType(state, { searchType }) {
      return {
        ...state,
        searchType
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
    resetState(state){
      let pagination = state.pagination;
      pagination.current = 1;
      pagination.pageSize = 5;
      return {
        ...state,
        list: [],
        searchType: null,
        pagination
      }
    }
  },
};
