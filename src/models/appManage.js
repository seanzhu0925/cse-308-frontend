import { message } from 'antd';
import { queryAppList as query } from '../services/app';
import { config } from '../config/globalConfig';

export default {
  namespace: 'appManage',
  state: {
    list: [],
    record: {},
    pagination: {
      ...config.globalPagination
    },
    appstatus: undefined,
    searchValues: {},
  },

  effects: {
    *initFetch(_, { call, put, select }) {
      const { list } = yield select(state => state.appManage);
      if (list && list.length > 0) {
        return;
      }
      yield put({
        type: 'fetch',
      });

    },
    *fetch(_, { call, put, select }) {
      const { pagination, searchValues, appStatus } = yield select(state => state.appManage);
      const { current, pageSize } = pagination;
      const response = yield call(query, {
        current, pageSize, ...searchValues, appStatus
      });
      if (!response) {
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
    *search({ searchValues }, { call, put, select }) {
      yield put({
        type: 'setSearchValues',
        searchValues: searchValues,
      });
      yield put({ type: 'resetCurrent' })
      yield put({ type: 'fetch' });
    },
    *pageChange({ payload }, { call, put, select }) {
      const { current, pageSize, appStatus } = payload;
      yield put({
        type: 'setPage',
        payload
      })
      yield put({ type: 'fetch' });
    },
    *saveEditRecord({ record }, { call, put }) {
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
    setPage(state, { payload }) {
      const { current, pageSize, appStatus } = payload;
      let pagination = state.pagination;
      pagination.current = current;
      pagination.pageSize = pageSize;
      return {
        ...state,
        appStatus,
        pagination
      }
    },
    saveApprovalType(state, { value }) {
      return {
        ...state,
        approvalType: value
      }
    },
    resetCurrent(state, _) {
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
    resetState(state) {
      return {
        ...state,
        list: [],
        searchValues: {},
        editVisible: false,
        approvalType: '',
        pagination: {
          ...config.globalPagination
        }
      }
    }
  },
};
