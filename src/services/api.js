import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/loginAjax/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  console.log("o", params)
  return request('/api/amDeveloperInfo/save', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}


export async function login() {
  return request('/api/appmanage/orgUser/query', {
    method: 'POST',
    body: {},
  });
}

export async function getVsiablecode(phone) {
  console.log("phone", phone);
  return request(`/api/verificationCode?mobilePhone=${phone}`);
}

export async function loginByTelCode(params) {
  return request('/api/loginAjax/phone', {
    method: 'POST',
    body: params,
  });
}

export async function getcode(phone) {
  return request(`/api/verificationCode?mobilePhone=${phone}`);
}

export async function verificationIdCard(params) {
  return request(`/api/amDeveloperInfo/verificationIdCard?${stringify(params)}`);
}

export async function resetPaaword(params) {
  return request(`/api/amDeveloperInfo/update`, {
    method: 'POST',
    body: params,
  });
}

export async function validateAccount(account) {
  return request(`/api/amDeveloperInfo/isExistsAccount?account=${account}`);
  // return new Promise(function (resolve, reject) {
  //   const res = true
  //   setTimeout(()=>{
  //     if(account=='eric'){
  //       resolve(res);
  //     }else{
  //       resolve(false);
  //     }
  //   },1000)
  // })
}

export async function validatePhone(phone) {
  return request(`/api/amDeveloperInfo/isExistsMobilePhone?mobilePhone=${phone}`);
  // return new Promise(function (resolve, reject) {
  //   const res = {
  //     status: 'error'
  //   }
  //   setTimeout(()=>{
  //     resolve(res);
  //   },1000)
  // })
}