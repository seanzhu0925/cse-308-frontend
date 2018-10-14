import { stringify } from 'qs';
import request from '../utils/request';

/**
 * 查询服务列表
 * @param {*} params 
 */
export async function queryServiceList(params) {
    return request('/api/amServiceInfo/queryList?' + stringify(params))
}
/**
 * 根据服务ID查询服务应用信息
 * @param {*} params 
 */
export async function queryAppListByServiceId(params) {
    return request('/api/amServiceInfo/queryAppListByServiceId?' + stringify(params))
}
/**
 * 申请正式服务
 * @param {*} params 
 */
export async function updateServiceStatus(params) {
    return request('/api/amServiceInfo/updateServiceStatus', {
        method: 'POST',
        body: params
    });
}
/**
 * 根据ID查询服务详情
 */
export async function queryServiceById(params) {
    return request('/api/amServiceInfo/queryById?' + stringify(params))
}


/**
 * 启停服务
 * @param {*} params 
 */
export async function updateRunStatus(params) {
    return request('/api/amServiceInfo/updateRunStatus', {
        method: 'POST',
        body: params
    });
}

/**
 * 注册服务
 */
export async function saveService(params) {
    return request('/api/amServiceInfo/save', {
        method: 'POST',
        body: params
    });
}