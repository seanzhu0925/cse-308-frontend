import { message } from 'antd';
import { queryNoticeList } from '../services/notice';

export default {
    namespace: 'notice',

    state: {
        noticeList: [],
    },

    effects: {
        *queryNoticeList(_, { call, put }) {
            const response = yield call(queryNoticeList);
            yield put({
                type: 'save',
                payload: response,
            });
        },
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                noticeList: payload
            };
        },
    }
};
