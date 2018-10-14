import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getVsiablecode, loginByTelCode } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    visible: false,
    msg: '',
    ms: 0,
    visablecode: '',
    getcodevisable: 0,
  },

  effects: {
    *getinfobyid({
      action }, { call, put }) {
      let { } = action;
    },

    *login({ values }, { call, put }) {
      const response = yield call(fakeAccountLogin, values);
      console.log("response", response);
      yield put({
        type: 'saveUserInfo',
        payload: response,
      });
      // Login successfully
      if (response.status == 'success') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    }
    /*  if (response) { 
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }*/


    ,
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('/user/login'));
      }
    },
    *clearmsg(_, { call, put }) {
      yield put({
        type: 'clearmsgstauts',
      })
    },
    *getVsiablecode(action, { call, put, select }) {
      console.log("getcode")
      let { getcodevisable } = action;
      const { phone } = action;
      let response = '';
      if (getcodevisable == 0) {
        response = yield call(getVsiablecode, phone);
      }
      yield put({
        type: 'setCode',
        payload: response,
      })
    },
    *loginByTelCode({ values }, { call, put }) {
      const response = yield call(loginByTelCode, values)
      // yield put({
      //   type: 'loginByTelCodes',
      //   payload: response,
      // })
      console.log("response phone",response)
      if (response.status == "success") {
        yield put(routerRedux.push('/'));
      }
    },

    *ForginPassoword(action, { call, put }) {

    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
    setLoginVisible(state, { visible }) {
      return {
        ...state,
        visible,
        msg: '',
      }
    },
    saveUserInfo(state, { payload }) {

      return {
        ...state,
        status: payload.status,
        type: payload.type,
        msg: '测试',
      };
    },
    clearmsgstauts(state) {
      let { status, type } = state;
      return {
        ...state,
        status: status,
        type: type,
        msg: '',
      }
    },
    setCode(state, { payload }) {
      let { visablecode, getcodevisable } = state;
      console.log("code", payload);
      if (payload) {
        visablecode = payload
        getcodevisable = '1';
      }
      return { ...state, getcodevisable, visablecode }
    },
    loginByTelCodes(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        msg: payload.msg,
      }
    }
  },
};
