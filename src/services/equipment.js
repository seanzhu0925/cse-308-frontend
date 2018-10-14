import querystring from 'querystring';
import request from '../utils/request';

export async function query(params) {
    return request('/api/equipments?'+querystring.stringify(params));
}

export async function doEdit(params) {
    return request('/api/equipment', {
        method: 'PUT',
        body: {
          ...params,
        },
    });
}

export async function doDelete(id) {
    return request(`/api/equipment/${id}`, {
        method: 'DELETE',
    });
}

export async function deleteBatch(ids) {
    return request('/api/equipment/deleteBatch', {
        method: 'POST',
        body: ids,
    });
}
