import { fakeRegister } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { routerRedux } from 'dva/router';
import store from './../index'
import { notification ,Modal} from 'antd';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit(action, { call, put }) {
      const response = yield call(fakeRegister,{...action.values});
      const {dispatch} = store;

      yield put({
        type: 'registerHandle',
        payload: response,
      });
      if (response.status == 'success'){
        
      Modal.success({
           content:'注册成功',
           title:'系统提示',
           onOk: ()=> {
            dispatch(routerRedux.push('/developerService/home'))
           }
         })         
      }else{
        Modal.error({
          content:'注册失败',
          title:'系统提示',
        })
      }      
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
     setAuthority('user');
      reloadAuthorized();          
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
