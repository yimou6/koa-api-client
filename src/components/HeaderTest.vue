<template>
  <div class="header">
    <div class="container header-container">

      <div>
        <span>首页</span>
        <span v-for="item in  $store.state.headerTitles" :key="item">{{item}}</span>
      </div>

      <div>
        <template v-if="userInfo.user_name">
          <el-dropdown @command="handleUserCommand">
            <span class="header-text">您好！ {{ userInfo.user_name }}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="/address">地址管理</el-dropdown-item>
              <el-dropdown-item>购物车</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <span class="header-tips" @click="handleLogout">退出</span>
        </template>

        <template v-else>
          <span class="header-text" @click="$router.push({ path: '/login' })">您好！请登陆</span>
          <span class="header-tips" @click="$router.push({ path: '/register' })">免费注册</span>
        </template>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderLayout',
  data() {
    return {
      showStatus: false,
    }
  },
  computed: {
    userInfo: function () {
      return this.$store.state.userInfo || {}
    }
  },
  methods: {
    // 退出登陆
    handleLogout() {
      // 清除本地的用户信息
      this.$store.dispatch('logOut').then(() => {
        this.$nextTick(() => {
          this.$forceUpdate()
        })
      })
    },
    handleUserCommand(path) {
      this.$router.push({ path })
    }
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 40px;
  background-color: #e3e4e5;

  &-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    span {
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }

    span + span {
      margin-left: 12px;
    }

    .header-text {
      color: #999999;
    }

    .header-tips {
      color: #9a6e3a;
    }
  }
}
</style>
