/*
 * @Author: luy 
 * @Date: 2019-12-25 09:02:52 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-25 09:26:52
 */

import axios from '@/utils/axios';
// 因为这个接口需要传参数，所有定义一个param做形参传递
/**
 * 通过id删除商家信息
 * @param{Object} param {id:''}
 */
export function deleteById(param){
    return axios.post('/Business/deleteById',param);
}
/**
 *  查找所有商家信息 
 */
export function findAllBusiness() {
    return axios.get('/Business/findAll');
}
/**
 * 通过城市查找商家信息
 * @param {*} param {city:''}
 */
export function findBusinessByCity(param) {
    return axios.get('/Business/findByCity',{params:param});
}
/**
 * 通过id查找商家信息
 * @param {*} param {id:''}
 */
export function findBusinessById(param) {
    return axios.get('/Business/findById',{params:param});
}
/**
 * 通过行业类型查找商家信息
 * @param {*} param {industry:''}
 */
export function findBusinessByIndustry(param) {
    return axios.get('/Business/findByIndustry',{params:param});
}
/**
 * 通过位置查找商家信息
 * @param {*} param {location:''}
 */
export function findBusinessByLocation(param) {
    return axios.get('/Business/findByLocation',{params:param});
}
/**
 * 通过省份查找商家信息
 * @param {*} param {province:''}
 */
export function findBusinessByProvince(param) {
    return axios.get('/Business/findByProvince',{params:param});
}
/**
 * 通过规模查找商家信息
 * @param {*} param {scale:''}
 */
export function findBusinessByScale(param) {
    return axios.get('/Business/findByScale',{params:param});
}
/**
 * 通过新增后修改商家信息
 * @param{Object} param 
 */
export function saveOrUpdateBusiness(param){
    return axios.post('/Business/saveOrUpdate',param);
}