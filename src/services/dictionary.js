import request from '../utils/request';

const DICT_ENGLISH_NAME = "D_M_APPTYPE";

export async function queryAppCategory() {
  //return request(`/api/sysDictionaryCatalog/queryDictByEnglishName?englishName=${DICT_ENGLISH_NAME}`);

  return request('/api');

 // return request('/api/get/users');
 //return request(`/api/sysDictionaryCatalog/queryDictByEnglishName?englishName=${DICT_ENGLISH_NAME}`);
}