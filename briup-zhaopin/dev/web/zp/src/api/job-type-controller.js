import axios from '@/utils/axios'
/**
* 通过id删除职业类型
* @param{Object} param {id:''}
*/
export function deleteJobTypeById(param){
 return axios.post('/JobType/deleteById',param);
}
/**
*  查找所有职业类型
*/
export function findAllJobType() {
 return axios.get('/JobType/findAll');
}
/**
* 通过id查找职业类型信息
* @param {*} param {id:''}
*/
export function findJobTypeById(param) {
 return axios.get('/JobType/findById',{params:param});
}

/**
* 通过新增后修改职业类型信息
* @param{Object} param 
*/
export function saveOrUpdateJobType(param){
 return axios.post('/JobType/saveOrUpdate',param);
}