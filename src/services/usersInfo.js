import querystring from 'querystring';
import request from '../utils/request';

export async function queryAppList(params) {
  return request('/api/appservice/fdback?' + querystring.stringify(params));
}

export async function searchUser(params) {
  return request('/api/usersInfo/users?'+ querystring.stringify(params));
}

export async function doAddUser(params) {
  return request('/api/usersInfo/newUser', {
    method: 'POST',
    body: params
  });
}


