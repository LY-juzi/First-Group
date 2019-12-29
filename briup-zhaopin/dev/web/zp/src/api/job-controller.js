import axios from '@/utils/axios'
/**
* 通过id删除职业类型
* @param{Object} param {id:''}
*/
export function deleteJobsById(param){
 return axios.post('/Jobs/deleteById',param);
}
/**
*  查找所有职业类型
*/
export function findAllJobs() {
 return axios.get('/Jobs/findAll');
}
/**
* 通过id查找职业类型信息
* @param {*} param {id:''}
*/
export function findJobsById(param) {
 return axios.get('/Jobs/findById',{params:param});
}
/**
* 通过状态查找职业类型
* @param {*} param {id:''}
*/
export function findJobsByStatus(param) {
 return axios.get('/Jobs/findByStatus',{params:param});
}
/**
* 通过新增后修改职业类型信息
* @param{Object} param 
*/
export function saveOrUpdateJobs(param){
 return axios.post('/Jobs/saveOrUpdate',param);
}