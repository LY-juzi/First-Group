import axios from '@/utils/axios'

/**
 * 通过id删除福利
 * @param{Object} param {id:''}
 */
export function deleteById(param){
  return axios.post('/Welfare/deleteById',param);
}
/**
 *  查找所有福利
 */
export function findAllWelfare() {
  return axios.get('/Welfare/findAll');
}
/**
 * 通过id查找福利信息
 * @param {*} param {id:''}
 */
export function findWelfareById(param) {
  return axios.get('/Welfare/findById',{params:param});
}
/**
 * 通过新增后修改福利信息
 * @param{Object} param 
 */
export function saveOrUpdateWelfare(param){
  return axios.post('/Welfare/saveOrUpdate',param);
}