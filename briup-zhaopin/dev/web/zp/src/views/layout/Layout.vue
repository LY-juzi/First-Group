<template>
  <div :class="classObj" class="app-wrapper">
    <div>
      <div class="app-header">
        <img src="@/assets/logo.png" alt />杰普招聘平台
      </div>
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <!-- 左侧导航 -->
      <sidebar class="sidebar-container" />
      <!-- 右侧内容 -->
      <div class="main-container">
        <navbar />
        <div class="app-main-container">
          <app-main />
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.app-main-container {
  padding: 5px;
  /* background:rgb(240, 242, 245); */
  box-shadow: 3px 3px 5px rgb(240, 242, 245) inset;
}
</style>
<script>
import { Navbar, Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("CloseSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  /* background: #000; */
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
