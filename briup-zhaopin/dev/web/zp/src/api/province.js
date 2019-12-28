/*
 * @Author: liuyr 
 * 省份模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-25 09:37:36
 */
import axios from '@/utils/axios'
/* 查找数据,与后台接口相关 */
// 在方法处写实参，在声明这里写形参
// export function findAllProvince(param) {
//   return axios.get('/Province/findAll',{params:param});
//   return axios.post('/Province/findAll',param);
// }


/**
 * 通过id删除省份
 * @param{Object} param {id:''}
 */
export function deleteById(param){
  return axios.post('/Province/deleteById',param);
}
/**
 *  查找所有省份
 */
export function findAllProvince() {
  return axios.get('/Province/findAll');
}
/**
 * 通过id查找省份信息
 * @param {*} param {id:''}
 */
export function findProvinceById(param) {
  return axios.get('/Province/findById',{params:param});
}
/**
 * 通过新增后修改省份信息
 * @param{Object} param 
 */
export function saveOrUpdateProvince(param){
  return axios.post('/Province/saveOrUpdate',param);
}