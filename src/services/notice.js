import { stringify } from 'qs';
import request from '../utils/request';

export async function queryNoticeList() {
  return request('/api/queryNoticeList');
}

