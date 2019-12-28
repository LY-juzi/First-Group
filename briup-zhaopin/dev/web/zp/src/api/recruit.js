/*
 * @Author: lijunkun 
 * @Date: 2019-12-25 16:01:18 
 * @Last Modified by: lijunkun
 * @Last Modified time: 2019-12-25 16:11:32
 */

import axios from '@/utils/axios';


/**
 * 通过id删除招聘信息
 * @param {Object} param {id:''} 
 */
export function deleteEmploymentById(param) {
    return axios.post('/Employment/deleteById', param);
  }

  
  /**
 * 查找所有招聘信息
 */
export function findAllEmployment() {
    return axios.get('/Employment/findAll');
  }

  
/**
 * 通过城市查找商家信息
 * @param {Object} param {city:''}
 */
export function findEmploymentByCity(param) {
    return axios.get('/Employment/findByCity', {
      params: param
    });
  }

  
  /**
 * 通过id查找招聘信息
 * @param {Object} param {id:''}
 */
export function findEmploymentById(param) {
    return axios.get('/Employment/findById', {
      params: param
    });
  }
  
  
    /**
 * 通过职位查找招聘信息
 * @param {Object} param {job:''}
 */
export function findEmploymentByJob(param) {
    return axios.get('/Employment/findByJob', {
      params: param
    });
  }

  
      /**
 * 通过标题查找招聘信息
 * @param {Object} param {title:''}
 */
export function findEmploymentByTitle(param) {
    return axios.get('/Employment/findByTitle', {
      params: param
    });
  }

  
     /**
 * 通过福利查找招聘信息
 * @param {Object} param {welfare:''}
 */
export function findEmploymentByWelfare(param) {
    return axios.get('/Employment/findByWelfare', {
      params: param
    });
  }

  
  /**
 * 保存或更新商家信息
 * @param {Object} param
 */
export function saveOrUpdateEmployment(param) {
    return axios.post('/Employment/saveOrUpdate', param);
  }
  
