import querystring from 'querystring';
import request from '../utils/request';

export async function queryConsoleMore(params) {
    return request(`/api/consoleservice/queryConsoleMore?${querystring.stringify(params)}`);
}

export async function queryCardList() {
    return request('/api/consoleservice/getcardlist');
  }

export async function queryById(params) {
    return request(`/api/consoleservice/querydetail?${querystring.stringify(params)}`);
}