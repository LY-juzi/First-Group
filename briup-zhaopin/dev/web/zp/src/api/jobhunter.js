/*求职者API
 * @Author: Iris 
 * @Date: 2019-12-25 14:50:02 
 * @Last Modified by: lijunkun
 * @Last Modified time: 2019-12-29 22:08:23
 */

import axios from '@/utils/axios'

/**
 * 通过ID删除求职者信息 
 * @param {Object} param {id:''}
 */
export function deleteJobhunterById(param){
    return axios.post('/Jobhunter/deleteById',param);
}

/*
*查找所有求职者信息
*/
export function findAllJobhunter(){
    
    return axios.get("/Jobhunter/findAll")
}


/**
 * 通过学历查找求职者
 * @param {Object} param{education:''}
 */
export function findJobhunterByEducation(param){
    return axios.get('/Jobhunter/findByEducation',{params:param})
}

/**
 * 通过性别查找求职者
 * @param {Object} param{gender:''}
 */
export function findJobhunterByGender(param){
    return axios.get('/Jobhunter/findByGender',{params:param})
}
/**
 * 通过id查找求职者信息 
 * @param {Object} param{id:''}
 */
export function findJobhunterByfindById(param){
    return axios.get('/Jobhunter/findById',{params:param})
}
/**
 * 通过电话查找求职者
 * @param {Object} param{telephone:''}
 */
export function findJobhunterByTelephone(param){
    return axios.get('/Jobhunter/findByTelephone',{params:param})
}

/**
 * 通过姓名查找求职者
 * @param {Object} param{username:''}
 */
export function findJobhunterByUsername(param){
    return axios.get('/Jobhunter/findByUsername',{params:param})
}

/**
 * 
 * 保存保存或更新保存或更新求职者
 *  @param {Object} param
 */
export function saveOrUpdateJobhunter(param){
    return axios.post('/Jobhunter/saveOrUpdate',param)
}
/**
 * 
 * 快速注册
 *  @param {Object} param
 */
export function  quickRegistration(param){
    return axios.post(' /Jobhunter/quickRegistration',param)
}

