import request from '../utils/request';

export async function query(code) {
  console.log("asdasasdasdd");
  return request(`/api/${code}`);
}
