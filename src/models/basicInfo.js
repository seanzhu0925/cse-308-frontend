import { message } from 'antd';
import { queryBasicinfo, doAddInfo, updateInfo,queryList,updatePass } from '../services/basicinfo';
import { config } from '../config/globalConfig';


export default {
  namespace: 'basicInfo',
  state: {
    list: [],
    currentUser: {},
  },
  // state: {
  //list: [],
  //   record: {},
  //   pagination: {
  //     ...config.globalPagination
  //   },
  //   fdStatus: undefined,
  //   searchValues: {},
  // },

  effects: {
    *initFetch(_, { call, put, select }) {
      const { list } = yield select(state => state.basicInfo);
      if (list && list.length > 0) {
        return;
      }
      yield put({
        type: 'fetch',
      });

    },
    *fetch(_, { call, put, select }) {
      const { pagination, searchValues, currentUser } = yield select(state => state.basicInfo);
      //const { current, pageSize } = pagination;
      const response = yield call(queryBasicinfo);
      console.log("fetch response", response);
      //currentUser=response.basicInfos;
      //console.log('currentuse: ',currentUser);
      if (!response) {
        return;
      }
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *updateInfo({ payload }, { call, put }) {
      console.log('更新数据payload： ', payload);
      const response = yield call(updateInfo, payload);
      console.log('更新response： ', response);
      if (response.status === 'success') {
        message.success('更新成功');
      }
      yield put({ type: 'fetch' });
      // yield put({
      //   type: 'saveUpdate',
      //   payload: response,
      // });
    },

    *updatePassword({ payload }, { call, put }) {
      
      console.log('更新密码payload： ', payload);
      const response = yield call(updatePass, payload);
      console.log('更新密码response： ', response);
      if (response.status === 'success') {
        message.success("修改成功");
      }
      yield put({ type: 'fetch' });
      

    },

    
    *changeApprovalType({ value }, { call, put }) {
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
      console.log('currentuser数据： ', payload);
      return {
        ...state,
        currentUser: payload,
        //pagination
      };
    },

    saveUpdate(state, { payload }) {
      console.log('currentuser数据： ', payload);
      return {
        ...state,
        currentUser: payload,
        //pagination
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
    setPage(state, { payload }) {
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
