/*
 * @Author: liuyr 
 * 客服管理页面
 * @Date: 2019-12-23 20:59:21 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 21:09:21
 */
<template>
  <div id="waiterManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="客服列表" name="waiter"></el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "waiterManage",
  data() {
    return {
      activeName: "waiter"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/waiterManage/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
