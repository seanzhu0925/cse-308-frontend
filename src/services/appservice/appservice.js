import querystring from 'querystring';
import request from '../../utils/request';

/*export async function queryConsoleMore(params) {
    return request(`/api/consoleservice/queryConsoleMore?${querystring.stringify(params)}`);
}*/

export async function queryAppListByTypeId(params) {
    return request(`/api/appservice/queryAppListByTypeId?${querystring.stringify(params)}`);
}

export async function queryHomePageAppList(params) {
    return request(`/api/appservice/queryHomePageAppList?${querystring.stringify(params)}`);
}  
 
export async function queryAppDetailInfo(params) {
    return request(`/api/appservice/queryAppDetailInfo?${querystring.stringify(params)}`)
}

export async function queryAppCountOfOnlineAndTotal(params) {
    return request(`/api/appservice/queryAppCountOfOnlineAndTotal?${querystring.stringify(params)}`)
}

export async function queryAppVersionList(params) {
    return request(`api/appservice/queryAppVersionList?${querystring.stringify(params)}`)
}

export async function queryhistorydetails(params) {
    return request(`api/appservice/queryhistorydetails?${querystring.stringify(params)}`)
}

export async function testServerStates(params) {
    return request(`api/appservice/testServerStates?${querystring.stringify(params)}`)
}






