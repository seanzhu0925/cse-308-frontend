import querystring from 'querystring';
import request from '../utils/request';

export async function queryAppList(params) {
 // return request('/api/appservice/fdback?' + querystring.stringify(params));
 return request('/api/get/users');
}

export async function searchFb(params) {
  return request('/api/appservice/fdbacks?'+ querystring.stringify(params));
}

export async function doAddFd(params) {
  return request('/api/appservice/newFd', {
    method: 'POST',
    body: params
  });
}


