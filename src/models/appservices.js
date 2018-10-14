import request from './../utils/request';
import {queryAppList,queryAppVersionList,queryhistorydetails,testServerStates} from './../services/appservice/appservice';


export default {

    namespace:'appservices',

    state:{      
        Pagination:{
        dataSource:[],
        total:'',
        current:'',
        pageSize:'',
        },
        testServerState:''   
    ,newapp:{
            
    },detailapp:{},
}   
    ,
    effects:{
        *querylist(action,{call,put}){   
           let {querystring,current,pageSize} = action;
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
                  chinese_name:'服务创建测试一',
                  serviceapi:'测试服务一',
                  requesttime:'2018-01-01 10:00:00',
                  requeststate:'',
                  status:'0',
                  service_type:'',
              },
              {
                id:'2',
                chinese_name:'依图人像比对之魂',
                serviceapi:'测试服务一',
                requesttime:'2018-01-01 10:00:00',
                requeststate:'审核通过',
                status:'1',
                service_type:'1'
            },
            {
                id:'3',
                chinese_name:'服务创建测试一',
                serviceapi:'测试服务一',
                requesttime:'2018-01-01 10:00:00',
                requeststate:'审核通过',
                status:'1',
                service_type:'0'
            },
            {
                id:'4',
                chinese_name:'服务创建测试一',
                serviceapi:'测试服务一',
                requesttime:'2018-01-01 10:00:00',
                requeststate:'',
                status:'0',
                service_type:'',
            },
            {
                id:'5',
                chinese_name:'服务创建测试一',
                serviceapi:'测试服务一',
                requesttime:'',
                requeststate:'',
                servertype:'测试类',
                status:'0',
                service_type:'',
            }],
        total:5,}
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
         },
         *testServerState(action,{call,put}){
            let {id} = action;
           
              /*  const request = {
                    serverstate : '1'
                }*/
                
            const  request  = yield call(testServerStates,{id});

            yield put ({type:'queryserverstate',payload:request,id:id})
            
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
        },
        queryserverstate(state,{payload,id}){
            let {Pagination,testServerState} = state;
            let data = Pagination.dataSource;
            for (let i = 0 ; i < data.length;i++){
                if (data[i].id == id){
                    data[i].serverstate = payload.testServerState;
                }
            }
            
            testServerState=  payload.testServerState;
            Pagination.dataSource = data;
            return {...state,Pagination,testServerState}
        }
    }
    
        
    
    
    

}


  