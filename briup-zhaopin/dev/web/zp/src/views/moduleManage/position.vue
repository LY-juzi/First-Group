/*
 * @Author: liuyr 
 * 职位管理页面
 * @Date: 2019-12-23 17:11:53 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 21:08:24
 */
<template>
  <div id="modulePosition">

    <el-row>
        <el-button type="danger" size="small" id="add" round>添加职位</el-button>
    </el-row>

    <template>
        <el-table
          :data="tableData"
          style="width: 80%">
          <el-table-column prop="date"  label="职位"  width="800">
          </el-table-column>
        </el-table>
    </template>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
#modulePosition{
  #add{
    position: relative;
    left: 700px;
    margin: 10px
  }
}
</style>