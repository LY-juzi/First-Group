/*
 * @Author: liuyr 
 * 权限管理页面
 * @Date: 2019-12-23 20:59:21 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-12-23 21:03:39
 */
<template>
  <div id="limitManage">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="权限列表" name="limit"></el-tab-pane>
    </el-tabs>
    <!-- 选项卡体部 -->
    <div class="tbl-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "limitManage",
  data() {
    return {
      activeName: "limit"
    };
  },
  methods: {
    /* 跳转 */
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.$router.push("/limitManage/index/" + tab.name);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
