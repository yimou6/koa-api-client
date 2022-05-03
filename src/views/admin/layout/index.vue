<template>
  <div class="layout">
    <div class="manage-header">
      <div class="manage-header-menu">
        <img src="../../../assets/logo.png" alt="log">
        <el-menu :default-active="activeIndex" router mode="horizontal">
          <el-menu-item index="/admin/home">首页</el-menu-item>
          <el-menu-item index="/admin/user">用户管理</el-menu-item>
          <el-menu-item index="/admin/good">商品管理</el-menu-item>
          <el-menu-item index="/admin/order">订单管理</el-menu-item>
        </el-menu>
      </div>

      <el-dropdown @command="handleCommand">
        <div class="header-bar-menu-item"><i class="el-icon-user"></i></div>
        <el-dropdown-menu>
          <el-dropdown-item command="/">返回商城</el-dropdown-item>
          <el-dropdown-item command="/logout">退出登陆</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <router-view class="layout-container"/>
  </div>
</template>

<script>
export default {
  name: 'ManageLayout',
  data() {
    return {
      activeIndex: this.$route.path
    }
  },
  methods: {
    handleCommand(path) {
      if (path !== '/logout') {
        this.$router.push({ path })
      } else {
        this.$store.dispatch('logOut')
        this.$router.replace({ path: '/mall/home' })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 61px;
  border-bottom: 1px solid #dfdfdf;
  box-sizing: border-box;
  padding: 0 20px;
  &-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 36px;
      height: 36px;
    }
  }
}
.layout {
  width: 100%;
  height: 100%;
}
.layout-container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: calc(100% - 100px);
}
</style>