/*
 * @Author: liuyr 
 * @Date: 2019-12-27 16:29:05 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-27 19:46:25
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
    return axios.get('/CustomerService/findByEducation', param);
}
/**
 * 通过性别查找客服信息
 * @param {Object} param {id:''} 
 */
export function findByGender(param) {
    return axios.get('/CustomerService/findByGender', param);
}