import request from '../utils/request';

export async function deleteFile(params) {
  console.log(params)
  return request('/api/sysAttachment/delete', {
    method: 'POST',
    body: params
  });
}