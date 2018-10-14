import querystring from 'querystring';
import request from '../utils/request';

export async function querySrcList(params) {
  return request('/api/src/getSrc?' + querystring.stringify(params));
}

export async function searchSrc(params) {
  return request('/api/src/srchSrc?'+ querystring.stringify(params));
}

// export async function doAddFd(params) {
//   return request('/api/appservice/newFd', {
//     method: 'POST',
//     body: params
//   });
// }


