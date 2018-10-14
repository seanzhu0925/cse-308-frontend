import querystring from 'querystring';
import request from '../../utils/request';


export async function queryUserInfoByContion(params) {

    return request(`/api/userinfoservice/queryUserInfoByContion?${querystring.stringify(params)}`)
    
}

export async function updateuserinfo(params) {
    
    return request(`/api/userinfoservice/updateuserinfo`,{
        
            method: 'POST',
            body:{
              ...params  
            }
    })
}

