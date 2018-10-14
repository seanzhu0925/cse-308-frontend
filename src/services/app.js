import querystring from 'querystring';
import request from '../utils/request';

export async function queryAppList(params) {
  return request('/api/appservice/apps?' + querystring.stringify(params));
}

export async function queryServiceList(params) {
  return request('/api/appservice/services?' + querystring.stringify(params));
}
export async function queryVersionList(params) {
  return request('/api/appservice/versions?' + querystring.stringify(params));
}
export async function queryServiceListByEditionId(params) {
  console.log(params);
  return request('/api/appservice/services?' + querystring.stringify(params));
}
export async function doAddApp(params) {
  return request('/api/appservice/app', {
    method: 'POST',
    body: params
  });
}

// export async function queryAppList(params) {
//   return request('/api/appservice/apps?'+querystring.stringify(params));
// }
