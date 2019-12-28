/*
 * @Author: liuyr 
 * 测试页面
 * @Date: 2019-12-22 16:54:36 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 21:57:21
 */
<template>
  <div id="cityManage">
    <div class="totalTitle">测试页面</div>
    <div class="cityManage-table">
      <el-table
        border
        size="mini"
        ref="multipleTable"
        :data="cityData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column align="center" prop="id" label="编号"></el-table-column>
        <el-table-column align="center" prop="name" label="名称"></el-table-column>
        <el-table-column align="center" prop="provinceId" label="省份ID"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { findAllCity } from "@/api/city.is";
// 导入函数方法
import { findAllCity } from "@/api/city.js";
export default {
  name: "cityManage",
  data() {
    return {
      cityData: []
    };
  },
  created() {
    this.findCityData();
  },
  methods: {
    /* 查找消息数据 */
    async findCityData(page) {
      try {
        // let res = await this.$store.dispatch("FindAllCity");
        let res = await findAllCity();
        this.cityData = res.data;
      } catch (err) {
        this.$notify.error({
          title: "错误",
          message: "查找失败"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#cityManage {
  .cityManage-table {
    margin-top: 10px;
    border-top: 1px solid #ebeef5;
    .iconDiv {
      margin-right: 10px;
    }
    .iconDiv:last-child {
      margin-right: 0;
    }
  }
}
</style>
