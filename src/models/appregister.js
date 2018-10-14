import { queryActivities } from '../services/api';

//应用创建模型
export default {
  namespace: 'appregister',

  state: {
    list: [],
  },

  effects: {
    *save(_, { call, put }) {
      const response = yield call(queryActivities);
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
