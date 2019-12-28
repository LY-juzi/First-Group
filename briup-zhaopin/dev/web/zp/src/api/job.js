import axios from '@/utils/axios';
/**
 * 查找所有商家信息
 */
export function findAllJob() {
    return axios.get('/Jobs/findAll');
  }