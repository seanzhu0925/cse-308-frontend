import request from './../utils/request';
import {queryAppList,queryAppVersionList,queryhistorydetails} from './../services/appservice/appservice';


export default {

    namespace:'appcompants',

    state:{      
            Pagination:{
            dataSource:[],
            total:'',
            current:'',
            pageSize:'',
            }   
        ,newapp:{
                
        },detailapp:{},
    },        

   
    effects:{
        *querylist(action,{call,put}){   
           let {querystring,current,pageSize} = action;
           if (current=="" || current ==undefined){
            current = 1;
           }
           if (pageSize =="" || current ==undefined){
            pageSize = 6;
           }
             //  const  request  = yield  call(queryAppList,{querystring,current,pageSize});
             const  request ={
                appcomponentlist:[{
                    id:'1',
                    appconponentname:'消息推送',
                    isdefault:'默认',
                    creattime:'2018-01-01 17:15:02',
                    creator:'系统管理员'
                },
                {
                    id:'2',
                    appconponentname:'token方式',
                    isdefault:'默认',
                    creattime:'2018-01-01 17:15:02',
                    creator:'系统管理员'
                },
                {
                    id:'3',
                    appconponentname:'移动应用更新开发说明',
                    isdefault:'默认',
                    creattime:'2018-01-01 17:15:02',
                    creator:'系统管理员'
                },
                {
                    id:'4',
                    appconponentname:'咯啦啦啦',
                    isdefault:'默认',
                    creattime:'2018-01-01 17:15:02',
                    creator:'系统管理员'
                },{
                    id:'5',
                    appconponentname:'咯啦啦啦',
                    isdefault:'默认',
                    creattime:'2018-01-01 17:15:02',
                    creator:'系统管理员'
                },{
                    id:'6',
                    appconponentname:'咯啦啦啦',
                    isdefault:'默认',
                    creattime:'2018-01-01 17:15:02',
                    creator:'系统管理员'
                }],
                total:6,
             }
           yield put ({type:'queryappcomponentlist',payload:request,})

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
         }
    }


    ,
    reducers:{
        queryappcomponentlist(state,{payload}){
            let {Pagination} = state;
            let data = payload.appcomponentlist;
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
        queryhistorydetailsreduerce(state,{payload}){
            let {applist} = state;
            let detailapp = payload;

            applist.detailapp = detailapp;
            return{...state,applist}
        }
    }
    
        
    
    
    

}


  