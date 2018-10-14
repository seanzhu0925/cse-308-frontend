import querystring from 'querystring';
import request from '../utils/request';

export async function queryList(params) {
  return request('/api/myinfo/basicInfos?' + querystring.stringify(params));
}

//'/api/appservice/fdbacks?'+ querystring.stringify(params)
//api/myinfo/basic
export async function queryBasicinfo() {
  return request('/api/myinfo/basicInfo');
 // return request('/api/myinfo/basicInfos?' + querystring.stringify(params));
}


export async function updateInfo(params) {
  let id = params.id;
  console.log('内容basicInfors ID: ', params.id);
  return request('/api/myinfo/updateInfo', {
    //return request('/api/myinfo/basicInfo',{
    method: 'POST',
    body: params

  });
}

export async function updatePass(params) {
  let id = params.id;
  console.log('密码原有ID: ', params.id);
  return request('/api/myinfo/updatePass', {
    //return request('/api/myinfo/basicInfo',{
    method: 'POST',
    body: params

  });
}


