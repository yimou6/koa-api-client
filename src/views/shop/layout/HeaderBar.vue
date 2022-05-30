<template>
  <div class="container">
    <div class="header-bar">
      <h3 @click="$router.push({ path: '/' })">简单商城</h3>

      <div class="header-bar-menu">
        <div class="header-bar-menu-item"><i class="el-icon-search"></i></div>
        <el-dropdown @command="handleCommand">
          <div class="header-bar-menu-item"><i class="el-icon-user"></i></div>
          <el-dropdown-menu>
            <template v-if="userInfo.user_name">
              <el-dropdown-item command="/address">收货地址</el-dropdown-item>
              <el-dropdown-item command="/order">我的订单</el-dropdown-item>
              <el-dropdown-item v-if="userInfo.level !== 2" command="/admin/home">商城管理</el-dropdown-item>
              <el-dropdown-item command="/logout">退出登陆</el-dropdown-item>
            </template>
            <el-dropdown-item v-else command="/login">登陆</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
        <div class="header-bar-menu-item" @click="$router.push({ path: '/bag' })">
          <el-badge v-if="charLength > 0" :value="charLength">
            <i class="el-icon-goods"></i>
          </el-badge>
          <i v-else class="el-icon-goods"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import axios from '@/plugins/axios'
import { resetRouter } from '@/router'
export default {
  name: 'HeaderBar',
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters({
      shopCar: 'shopCar'
    }),
    charLength: function () {
      let num = 0
      this.shopCar.forEach(it => {
        num += it.number
      })
      return num
    }
  },
  mounted() {
    this.getUserCar()
  },
  methods: {
    handleCommand(path) {
      if (path !== '/logout') {
        this.$router.push({ path })
      } else {
        this.$store.dispatch('logOut')
        resetRouter()
        this.$router.replace({ path: '/' })
      }
    },
    getUserCar() {
      if (this.$route.path === '/bag' || !this.$store.state.token) {
        return
      }
      axios.get('/cart').then(res => {
        const { code, data } = res
        if (code === 0) {
          this.$store.commit('SET_SHOP_CAR', {
            type: 'init',
            value: data
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header-bar {
  color: #333333;
  border-bottom: 1px solid #333333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 10px;

  h3 {
    margin: 0;
  }

  &-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-item {
      font-size: 20px;
      cursor: pointer;
      margin-left: 10px;
      padding: 2px 10px;
      i {
        transition: all 0.3s ease-in;
      }
      &:hover i {
        transform: translateY(-4px);
      }
    }
  }
}

.menu-link {
  list-style: none;
  margin: 0;
  padding: 0 10px;
  height: 80px;
  line-height: 80px;
  border-bottom: 1px solid #666666;
  li {
    float: left;
    font-size: 16px;
    color: #666;
    font-weight: bold;
    cursor: pointer;
    &.active {
      color: #333333;
      text-decoration:underline;
    }
  }
  li + li {
    margin-left: 20px;
  }
  &:after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>