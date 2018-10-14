
import {queryAppListByTypeId,queryHomePageAppList,queryAppVersionList,queryhistorydetails,queryAppCountOfOnlineAndTotal} from './../services/appservice/appservice';
import { config } from '../config/globalConfig';
import { appCategory } from '../common/init';
import { getDefaultId } from '../utils/utils'


export default {

    namespace:'applist',
    state:{
        typeId:'',
        onLineAppCount:'',
        appTotal:'',      
        list: [],
        rankingAppList:[],
        commonAppList:[],
        recommendAppList:[],
        hotAppList:[],
        pagination: {
            ...config.globalPagination
        },
        searchValues: {},
        detail: {}
    },
    effects:{
        *queryAppListByTypeId({id}, { call, put, select }){
            yield put({
                type: 'setTypeId',
                typeId: id
         
            });
           const { pagination,typeId } = yield select(state => state.applist);
           const {current,pageSize} = pagination;
           const response = yield call(queryAppListByTypeId,{current,pageSize,typeId});
           if(!response){
               return;
           }
           yield put({
               type: 'save',
               payload: response
        
           });
        },
        *queryHomePageAppList(_,{ call, put}){
            const response = yield call(queryHomePageAppList);
            if(!response){
                return;
            }            
            yield put({
                type: 'saveAppList',
                payload: response
         
            });
        },
        *queryAppCountOfOnlineAndTotal(_,{call,put}){
            const response = yield call(queryAppCountOfOnlineAndTotal);
            if(!response){
                return;
            }            
            yield put({
                type: 'saveAppCount',
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
            const {typeId, current, pageSize } = payload;
            yield put({
              type: 'setPage',
              payload
            })
            yield put({ type: 'queryAppListByTypeId',typeId });
          },
         
    },
    reducers:{
        setTypeId(state,{typeId}){
            let pagination = state.pagination;
            pagination.pageSize = 12;
            if(!typeId){
                if(!state.typeId){
                    const newId = getDefaultId(appCategory);
                    typeId = newId;
                }else{
                    typeId = state.typeId;
                }  
            }
            return{
                ...state,
                typeId,
                pagination
            };
        },
        save(state,{payload}){
            let pagination = state.pagination;
            pagination.total = payload.total;
            return{
                ...state,
                list: payload.rows,
                pagination
            };
        },
        saveAppList(state,{payload}){
            return{
                ...state,
                rankingAppList: payload.rankingAppList,
                commonAppList: payload.commonAppList, 
                recommendAppList: payload.recommendAppList, 
                hotAppList:payload.hotAppList
            };
        },
        saveAppCount(state,{payload}){
            return{
                ...state,
                onLineAppCount: payload.onLineAppCount,
                appTotal: payload.appTotal,
            }
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
            const {typeId, current, pageSize } = payload;
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
              rankingAppList:[],
              commonAppList:[],
              recommendAppList:[],
              hotAppList:[],
              onLineAppCount:'',
              appTotal:'',
              searchValues: {},
              modalVisible: false,
              pagination: {
                ...config.globalPagination
              }
            }
          },
          resetTypeId(state){
            return {
              ...state,
              typeId:'',
            }
          },
          
    }
}


  