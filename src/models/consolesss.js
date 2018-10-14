import request from './../utils/request';
import {queryCardList,queryConsoleMore} from './../services/consolesserver';
import {titelcard as aa,titelcards,titelcardss} from  '../components/DeveloperService/console/data'
import { Pagination } from 'antd';


export default {

    namespace:'consolesss',

    state:{
        titelcard :{
            Pagination:{
                dataSource:[],
                total:'',
                current:'',
                pageSize:'',
            }
        },
        titelcards:{
            Pagination:{
            dataSource:[],
            total:'',
            current:'',
            pageSize:'',
        }
    },
        titelcardss:{
            Pagination:{
            dataSource:[],
            total:'',
            current:'',
            pageSize:'',
        }
    },

        
}
    ,
    effects:{
        *fetch(_,{call,put}){
            const request = yield call(queryCardList);
            yield put({type:'query',payload:request,})
        },
        *queryplafommore(action,{call,put}){   
           let {stime,etime,querystring,current,pageSize} = action;
           alert(current)
           const  request  = yield  call(queryConsoleMore,{stime,etime,querystring});
           yield put ({type:'plafomquery',payload:request,})

        }
    }


    ,
    reducers:{
        query(state,{payload}){
            let {titelcard,titelcards,titelcardss} = state;
            let data = payload;
            titelcard.Pagination.dataSource=aa;
            titelcards.Pagination.dataSource.push(data.titelcards);
            titelcardss.Pagination.dataSource.push(data.titelcardss);
            
           /* if (data.titelcard){
                titelcard=aa;
            }*/
/*            if (data.titelcards){
                titelcards=titelcards;
            }
            if (data.titelcardss){
                titelcardss=titelcardss;
            }*/
            return {
               ...state,titelcard,titelcards,titelcardss
                };
        },
        plafomquery(state,{payload}){
            let {titelcardss} = state;
            let data = payload;
            titelcardss.Pagination.dataSource = [...payload];
            titelcardss.Pagination.total = '50'

            return {
                ...state,titelcardss
            }
        }
    }
    
        
    
    
    

}


  