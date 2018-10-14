import querystring from 'querystring';
import request from '../../utils/request';

export async function queryList(params) {
  return request('/api/amDeveloperProblem/queryList?' + querystring.stringify(params));
}

