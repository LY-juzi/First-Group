/*
 * @Author: liuyr 
 * 城市仓库
 * @Date: 2019-12-22 18:53:39 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-22 19:37:13
 */
import { findAllCity } from '@/api/city.js'
export default {
  state: {},
  mutations: {},
  actions: {
    /* 查找 */
    async FindAllCity({ commit }, obj) {
      let res = await findAllCity(obj);
      return res;
    },
  }
}
