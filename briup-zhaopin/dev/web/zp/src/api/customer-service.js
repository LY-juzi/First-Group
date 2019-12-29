/*
 * @Author: liuyr 
 * @Date: 2019-12-27 16:29:05 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-29 18:20:51
 */
import axios from '@/utils/axios'
/**
 * 通过id删除客服信息
 * @param {Object} param {id:''} 
 */
export function deleteById(param) {
  return axios.post('/CustomerService/deleteById', param);
}
/**
 * 查找所有客服信息
 * @param {Object} param {id:''} 
 */
export function findAllCustomer(param) {
    return axios.get('/CustomerService/findAll', param);
  }
/**
 * 通过状态查找客服信息
 * @param {Object} param {id:''} 
 */
    export function findByStatus(param) {
    return axios.get('/CustomerService/findByEducation', {params:param});
}
/**
 * 通过性别查找客服信息
 * @param {Object} param {id:''} 
 */
export function findByGender(param) {
    return axios.get('/CustomerService/findByGender', {params:param});
}

/**
 * 通过id查找客服信息
 * @param {Object} param {id:''} 
 */
export function findById(param) {
    return axios.get('/CustomerService/findById', {params:param});
}

/**
 * 通过用户名查找客服信息
 * @param {Object} param {id:''} 
 */
export function findByUsername(param) {
    return axios.get('/CustomerService/findByUsername', {params:param});
}
/**
 * 通过用户名查找客服信息
 * @param {Object} param {id:''} 
 */
export function saveOrUpdate(param) {
    return axios.post('/CustomerService/saveOrUpdate', param);
}