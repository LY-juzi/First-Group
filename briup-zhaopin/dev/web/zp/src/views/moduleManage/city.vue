/*
 * @Author: liuyr 
 * 城市管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: luy
 * @Last Modified time: 2019-12-27 20:35:30
 */
<template>
  <div id="moduleCity">

    <el-row>
        <el-button type="success" size="small" id="add" round>添加省份</el-button>
    </el-row>

    <div class="wrapDiv" v-for="item in provinceData" :key="item.id">
        {{item.name}}
        <div class="cityDiv" v-for="val in cityData" :key="val.id">
            
        </div>
    </div>

  </div>
</template>

<script>
import {findAllProvince} from "@/api/province.js" ;
import {findCityByProvinceId} from "@/api/city.js" ;


export default {
  data() {
    return {
      provinceData:[],
      cityData:[],
    };
  },
  computed: {},
  methods: {
    async findAllPro(){
      let res = await findAllProvince();
      this.provinceData = res.data;
    },
    async findCity(){
      let val = await findCityByProvinceId();
      this.cityData = val.data;
    },
  },
  created() {
    this.findAllPro();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
#moduleCity{
  #add{
    position: relative;
    left: 600px;
    margin: 10px
  }
}
.wrapDiv{
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 60%;
}
.cityDiv{
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
  width: 60%;
}
</style>