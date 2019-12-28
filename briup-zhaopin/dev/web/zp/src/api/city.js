/*
 * @Author: liuyr 
 * 城市模块API
 * @Date: 2019-12-22 18:54:17 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-25 09:35:33
 */
import axios from '@/utils/axios'
/* 查找数据,与后台接口相关 */
// 在方法处写实参，在声明这里写形参
// export function findAllCity(param) {
//   return axios.get('/City/findAll',{params:param});
//   return axios.post('/City/findAll',param);
// }


/**
 * 通过id删除城市
 * @param{Object} param {id:''}
 */
export function deleteById(param){
  return axios.post('/City/deleteById',param);
}
/**
 *  查找所有城市
 */
export function findAllCity() {
  return axios.get('/City/findAll');
}
/**
 * 通过id查找城市信息
 * @param {*} param {id:''}
 */
export function findCityById(param) {
  return axios.get('/City/findById',{params:param});
}
/**
 * 通过省份id查找城市
 * @param {*} param {id:''}
 */
export function findCityByProvinceId(param) {
  return axios.get('/City/findByProvinceId',{params:param});
}
/**
 * 通过新增后修改城市信息
 * @param{Object} param 
 */
export function saveOrUpdateCity(param){
  return axios.post('/City/saveOrUpdate',param);
}