/*
 * @Author: liuyr
 * 招聘管理页面
 * @Date: 2019-12-22 16:49:20 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 20:52:03
 */
<template>
  <div id="moduleManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="城市管理" name="city"></el-tab-pane>
      <el-tab-pane label="福利管理" name="boon"></el-tab-pane>
      <el-tab-pane label="职位管理" name="position"></el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "moduleManage",
  data() {
    return {
      activeName: "city"
    };
  },
  created() {},
  computed: {},
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/moduleManage/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
