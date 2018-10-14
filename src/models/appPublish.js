import request from './../utils/request';
import {queryAppList,queryAppVersionList,queryhistorydetails} from './../services/appservice/appservice';


export default {

    namespace:'appPublish',

    state:{      
        Pagination:{
        dataSource:[],
        total:'',
        current:'',
        pageSize:'',
        }   
    ,newapp:{
            
    },detailapp:{},
}   
    ,
    effects:{
        *querylist(action,{call,put}){   
           let {querystring,current,pageSize,etime,stime,state} = action;
           console.log("action",action)
           if (current=="" || current ==undefined){
            current = 1;
           }
           if (pageSize =="" || current ==undefined){
            pageSize = 6;
           }
              // const  request  = yield  call(queryAppList,{querystring,current,pageSize});
              const  request ={ 
                  servicelist:[{
                  id:'1',
                  servicename:'大蚂蚁',
                  serviceapi:'测试服务一',
                  requesttime:'2018-01-01 10:00:00',
                  requeststate:'审核驳回,未提交修改'
              },
              {
                id:'2',
                servicename:'大蚂蚁2',
                serviceapi:'测试服务一',
                requesttime:'2018-01-01 10:00:00',
                requeststate:'未发布审核'
            },
            ],
        total:2,}
           yield put ({type:'queryservicelist',payload:request,})

        },
       
        *queryhistorydetail(action,{call,put}){   
            let {current,pageSize,id} = action;
            const  request  = yield call(queryAppVersionList,{id,current,pageSize});
             
            yield put ({type:'queryhistorydetailreduerce',payload:request,})
 
         },
         *appservicesdetail(action,{call,put}){
            let {id} = action;
            console.log("ac",action)
            //const  request  = yield call(queryhistorydetails,{id});
           // console.log("a",request)
           const  request={
               name:'22'
           }
            yield put ({type:'appservicesdetailreduerce',payload:request,})
         }
    }


    ,
    reducers:{
        queryservicelist(state,{payload}){
            let {Pagination} = state;
            let data = payload.servicelist;
            let total = payload.total;
            Pagination.dataSource = [...data];
            Pagination.total = total==""||total==null ? 0 : total;
            return {
                ...state,Pagination
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
        appservicesdetailreduerce(state,{payload}){
            let {detailapp} = state;
            detailapp = payload;

            return{...state,detailapp}
        }
    }
    
        
    
    
    

}


  