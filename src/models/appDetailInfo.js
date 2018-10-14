
import {queryAppDetailInfo,queryAppVersionList,queryhistorydetails} from './../services/appservice/appservice';
import { config } from '../config/globalConfig';


export default {

    namespace:'appDetailInfo',
    state:{
        id:'',
        commontTotal:'', 
        downcount:'', 
        appScore: '',  
        appInfo:{},
        screenshotList: [],
        commontList: [],
        pagination: {
            ...config.globalPagination
        }
    },
    effects:{
        *queryAppDetailInfo({id}, { call, put, select }){
            yield put({
                type: 'saveId',
                id       
            });
           const { pagination } = yield select(state => state.appDetailInfo);
           const {current,pageSize} = pagination;
           const response = yield call(queryAppDetailInfo,{current,pageSize,id});
           if(!response){
               return;
           }
           yield put({
               type: 'saveAppInfo',
               payload: response        
           });
        },
        *queryhistorydetail(action,{call,put}){   
            let {current,pageSize,id} = action;
            const  request  = yield call(queryAppVersionList,{id,current,pageSize});
             
            yield put ({type:'queryhistorydetailreduerce',payload:request,})
 
         },
         *queryshistorydetail(action,{call,put}){
            let {id} = action;
            const  request  = yield call(queryhistorydetails,{id});
            yield put ({type:'queryhistorydetailsreduerce',payload:request,})
         },
         *pageChange({ payload }, { call, put, select }){
            const {id } = yield select(state => state.appDetailInfo);
            yield put({
              type: 'setPage',
              payload
            })
            yield put({ type: 'queryAppDetailInfo',id });
          },
         
    },
    reducers:{
        saveId(state,{id}){
            return{
                ...state,
                id
            };
        },
        saveAppInfo(state,{payload}){
            const appInfo = payload.appInfo;
            let {screenshotList} = state;
            let pagination = state.pagination;
            pagination.total = payload.total;
            let screenshot1 ='';
            let screenshot2 ='';
            let screenshot3 ='';
            if(appInfo){
                screenshot1 = appInfo.screenshot1;
                screenshot2 = appInfo.screenshot2;
                screenshot3 = appInfo.screenshot3;
            }
            screenshotList=[];
            if(screenshot1){
                screenshotList.push(screenshot1);
            }
            if(screenshot2){
                screenshotList.push(screenshot2);
            }
            if(screenshot3){
                screenshotList.push(screenshot3);
            }
            return{
                ...state,
                screenshotList,
                commontList: payload.rows,
                commontTotal:payload.total,
                downcount:payload.downcount,
                appScore:payload.appScore,
                appInfo:payload.appInfo
            };
        },
        queryhistorydetailreduerce(state,{payload}){
            let {applist} = state;
            let newdata = payload.newapp;
            let total = payload.total;
            let appversionlist = payload.appversionlist;
            applist.Pagination.dataSource = [...appversionlist];
            applist.Pagination.total = total==""||total==null ? 0 : total;
            applist.newapp = newdata;
            return {
                ...state,applist
            }
        },
        queryhistorydetailsreduerce(state,{payload}){
            let {applist} = state;
            let detailapp = payload;

            applist.detailapp = detailapp;
            return{...state,applist}
        },
        setPage(state, { payload }){
            const {current, pageSize } = payload;
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
              screenshotList: [],
              appInfo: {},
              commontList: [],
              commontTotal:'',
              downcount:'',
              appScore:'',
              pagination: {
                ...config.globalPagination
              }
            }
          }
    }
}


  