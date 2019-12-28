/*
 * @Author: wuhuilan
 * 招聘消息模块API
 * @Date: 2019年12月24日 16:20:54
 * @Last Modified by: wuhuilan
 * @Last Modified time: 2019-12-25 18:42:41
 */
import axios from '@/utils/axios'

/**
 * 通过id删除招聘信息
 * @param {Object} param {id：''}
 */
export function deleteEmploymentById(param) {
    return axios.post('/Employment/deleteById', param);
}
/**
 * 查询所有招聘信息
 */
export function findAllEmployment() {
    return axios.get('/Employment/findAll');
}

/**
 * 通过城市查找招聘信息
 * @param {Object} param {city:''}
 */
export function findEmploymentByCity(param) {
    return axios.get('/Employment/findByCity', { params: param });
}

/**
 * 通过id查找招聘信息
 * @param {Object} param {id：''}
 */
export function findEmploymentById(param) {
    return axios.get('/Employment/findById', { params: param });
}

/**
 * 通过职位查找招聘信息
 * @param {Object} param {industry：''}
 */
export function findEmploymentByJob(param) {
    return axios.get('/Employment/findByJob', { params: param });
}

/**
 * 根据招聘标题查找招聘信息(模糊查询)
 * @param {Object} param {title:''}
 */
export function findEmploymentByTitle(param) {
    return axios.get('/Employment/findByTitle', { params: param });
}

/**
 * 根据福利查找招聘信息(模糊查询)
 * @param {Object} param {Welfare:''}
 */
export function findEmploymentByWelfare(param) {
    return axios.get('/Employment/findByWelfare', { params: param });
}

/**
 * 新增或修改招聘信息
 * @param {Object} param 
 */
export function saveOrUpdateEmployment(param) {
    return axios.post('/Employment/saveOrUpdate', param);
}