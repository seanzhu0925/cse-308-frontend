import request from './../utils/request';
import {queryCardList,queryConsoleMore,queryById    } from './../services/consolesserver';
import { Pagination } from 'antd';


export default {

    namespace:'plafom',

    state:{      
        plafomlist:{
            Pagination:{
            dataSource:[],
            total:'',
            current:'',
            pageSize:'',
            querystring:'',
            
        },
        plafom:{
            id:'',
            theme:'',
            content:'',
            actiontime:'',
            iconlist:[],
            imglist:[],
        }
    },        
}
    ,
    effects:{
        *queryplafommore(action,{call,put}){
           let {stime,etime,querystring,current,pageSize} = action;
           const  request  = yield  call(queryConsoleMore,{stime,etime,querystring,current,pageSize});
           yield put ({type:'plafomquery',payload:request,})

        },
        *querydetail(action,{call,put}){
            let {id} = action;
            console.log(action,"dasd")
            const  request  = yield  call(queryById,{id});
            yield put ({type:'querydetailById',payload:request,})
        }
        
    }


    ,
    reducers:{
        plafomquery(state,{payload}){

            let {plafomlist} = state;
            let data = payload;
            plafomlist.Pagination.dataSource = [...payload];
            plafomlist.Pagination.total = 50
            return {
                ...state,plafomlist
            }
        },
        querydetailById(state,{payload}){
            let {plafomlist} = state;
            let data = [...payload];
            console.log("ddd",state)
            plafomlist.plafom =data[0];
            return {
                ...state,plafomlist
            }
        }
    }
    
        
    
    
    

}


  