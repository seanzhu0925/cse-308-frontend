import { routerRedux } from 'dva/router';
import {queryUserInfoByContion,updateuserinfo}  from './../services/userinfoservice/userinfoservice'
import { notification } from 'antd';

export default {
  namespace: 'userinfo',

  state: {
    status: undefined,
    visible: false,
    msg : '',
    userinfolist:[{}]
  },

  effects: {
    *getinfobycontion(action, { call, put }){
        let {id,devtype,userid,username,idcard,mobilenum,tel,email,signadress,conpanyinfo} = action;
        const response = yield call(queryUserInfoByContion, {id,devtype,userid,username,idcard,mobilenum,tel,email,signadress,conpanyinfo});
        
        yield put ({type:'getUserInofoState',payload:response})
        
       }
       ,
       *updateuserinfo(action,{call,put})
       {
        let {id,devtype,userid,username,idcard,mobilenum,tel,email,signadress,conpanyinfo} = action;
        console.log(action)
        const response = yield call(updateuserinfo, {id,devtype,userid,username,idcard,mobilenum,tel,email,signadress,conpanyinfo});
        const {msg} = response;
        yield put ({type:'updateuserinfos',payload:response})
        
        
       }
    // *login({ payload }, { call, put }) {
    //   const response = yield call(fakeAccountLogin, payload);
    //   yield put({
    //     type: 'changeLoginStatus',
    //     payload: response,
    //   });
    //   // Login successfully
    //   if (response.status === 'ok') {
    //     reloadAuthorized();
    //     yield put(routerRedux.push('/'));
    //   }
    // },
    // *logout(_, { put, select }) {
    //   try {
    //     // get location pathname
    //     const urlParams = new URL(window.location.href);
    //     const pathname = yield select(state => state.routing.location.pathname);
    //     // add the parameters in the url
    //     urlParams.searchParams.set('redirect', pathname);
    //     window.history.replaceState(null, 'login', urlParams.href);
    //   } finally {
    //     yield put({
    //       type: 'changeLoginStatus',
    //       payload: {
    //         status: false,
    //         currentAuthority: 'guest',
    //       },
    //     });
    //     reloadAuthorized();
    //     yield put(routerRedux.push('/user/login'));
    //   }
    // },
  },

  reducers: {
    // changeLoginStatus(state, { payload }) {
    //   setAuthority(payload.currentAuthority);
    //   return {
    //     ...state,
    //     status: payload.status,
    //     type: payload.type,
    //   };
    // },
    getUserInofoState(state,{payload}){
      let userinfolist = [];
      console.log("dsad",payload)
      userinfolist.push(...payload)
      return {
        ...state,userinfolist
      }
    }
    ,
    updateuserinfos(state,{payload}){
     // let msg = payload.msg;
      return{ ...state}
    }
    ,
    setLoginVisible(state, { visible }) {
      return {
        ...state,
        visible
      }
    },
    msg(state,{payload}){
      if (payload.msg=='500'){
        notification.error({
          message: "修改失败",
          description: "注意检查必填项列名",
          duration:20,
        });

      }
     return {
       ...state
    }
  },
}
};
