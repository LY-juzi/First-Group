/*
 * @Author: frxi 
 * 商家api
 * @Date: 2019-12-25 09:02:55 
 * @Last Modified by: frxi
 * @Last Modified time: 2019-12-25 10:43:43
 */

import axios from '@/utils/axios';
/**
 * 通过id删除商家信息
 * @param {Obiect} param {id:''}
 */
export function deleteBusinessById(param){
    return axios.post('/Business/deleteById',param);
}
/**
 * 查找所有商家信息
 */
export function findAllBusiness(){
    return axios.get('/Business/findAll');
}

/**
 * 根据城市查询商家信息
 * @param {Object} param {city:''}
 */
export function findBusinessByCity(param){
    return axios.get('/Business/findByCity',{params:param});
}


/**
 * 根据id查询商家信息
 * @param {Object} param {id:''}
 */
export function findBusinessById(param){
    return axios.get('/Business/findById',{params:param});
}


/**
 * 根据行业查询商家信息
 * @param {Object} param {Industry:''}
 */
export function findBusinessByIndustry(param){
    return axios.get('/Business/findByIndustry',{params:param});
}
/**
 * 根据位置查询商家信息
 * @param {Object} param {Location:''}
 */
export function findBusinessByLocation(param){
    return axios.get('/Business/findByLocation',{params:param});
}
/**
 * 根据省份查询商家信息
 * @param {Object} param {Province:''}
 */
export function findBusinessByProvince(param){
    return axios.get('/Business/findByProvince',{params:param});
}
/**
 * 根据规模查询商家信息
 * @param {Object} param {Scale:''}
 */
export function findBusinessByScale(param){
    return axios.get('/Business/findByScale',{params:param});
}
/**
 * 新增修改数据
 * @param {Object} param {Scale:''}
 */
export function saveOrUpdateBusiness(param){
    return axios.get('/Business/saveOrUpdate',{params:param});
}