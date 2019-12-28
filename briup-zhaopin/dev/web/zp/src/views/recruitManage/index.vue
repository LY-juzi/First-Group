/*
 * @Author: liuyr
 * 招聘管理页面
 * @Date: 2019-12-22 16:49:20 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 17:06:07
 */
<template>
  <div id="recruitManage">
    <!-- <div class="totalTitle">招聘管理</div> -->
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="招聘中" name="doing"></el-tab-pane>
      <el-tab-pane label="招聘完结" name="finish"></el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "recruitManage",
  data() {
    return {
      activeName: "doing"
    };
  },
  created() {},
  computed: {},
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/recruitManage/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
