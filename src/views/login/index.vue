<template>
  <div class="login-warp">
    <div class="login-sider-warp">
      <div class="login-sider"></div>
    </div>
    <div class="login-content">
      <div class="login-header">
        <div class="login-title">
          <div class="logo-warp">
            <img src="../../assets/logo.png" alt="logo">
          </div>
          简单商城
        </div>
        <div class="login-nav">
          <a href="#">用户协议</a>
          <a href="#">隐私政策</a>
          <a href="#">帮助中心</a>
        </div>
      </div>

      <div class="login-container">
        <div class="login-card">
          <div class="login-tabs" @click="changeTabs">
            <span :class="{ 'tab-active': cardName === 'login' }" data-card="login">登陆</span>
            <span :class="{ 'tab-active': cardName === 'register' }" data-card="register">注册</span>
            <div class="tab-active-bar" :style="{ left }"></div>
          </div>

          <transition>
            <el-form v-if="cardName === 'login'" :model="loginForm" :rules="rules" size="medium" ref="loginForm">
              <el-form-item prop="user_name">
                <el-input prefix-icon="el-icon-user-solid" type="text" v-model="loginForm.user_name" :maxlength="16" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password" class="login-accept">
                <el-input prefix-icon="el-icon-warning" type="password" v-model="loginForm.password" :maxlength="20" placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item class="login-accept">
                <el-checkbox v-model="check">已阅读并同意简单商城 <strong>用户协议</strong>和 <strong>隐私政策</strong>  </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="success" style="width: 100%" :loading="loading" @click="submitLogin">登陆</el-button>
              </el-form-item>
            </el-form>

            <el-form v-else :model="registerForm" :rules="rules" size="medium" ref="registerForm" class="register-form">
              <el-form-item prop="user_name" label="用户名">
                <el-input prefix-icon="el-icon-user"
                          type="text"
                          v-model="registerForm.user_name"
                          :maxlength="16"
                          placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="nick_name" label="昵称">
                <el-input prefix-icon="el-icon-star-off"
                          type="text"
                          v-model="registerForm.nick_name"
                          :maxlength="16"
                          placeholder="昵称"></el-input>
              </el-form-item>
              <el-form-item prop="email" label="邮箱">
                <el-input prefix-icon="el-icon-message"
                          type="text"
                          v-model="registerForm.email"
                          :maxlength="16"
                          placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item prop="sex" label="性别">
                <el-select v-model="registerForm.sex" style="width: 100%" placeholder="性别">
                  <el-option label="女" :value="0"></el-option>
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="保密" :value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input prefix-icon="el-icon-lock"
                          type="password"
                          v-model="registerForm.password"
                          :maxlength="20"
                          placeholder="密码"></el-input>
              </el-form-item>
              <el-form-item prop="checkPassword" class="login-accept" label="确认密码">
                <el-input prefix-icon="el-icon-circle-check"
                          type="password"
                          v-model="registerForm.checkPassword"
                          :maxlength="20"
                          placeholder="确认密码"></el-input>
              </el-form-item>
              <el-form-item class="login-accept">
                <el-checkbox v-model="registerCheck">已阅读并同意简单商城 <strong>用户协议</strong>和 <strong>隐私政策</strong>  </el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button type="success" style="width: 100%" :loading="loading" @click="submitRegister">注册</el-button>
              </el-form-item>
            </el-form>
          </transition>
        </div>

        <div class="login-copyright">
          简单商城版权所有 &copy; 2022 - 学习展示ICP备10000000
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/plugins/axios'
export default {
  name: 'Login',
  data() {
    const verifyUserName = (rule, value, callback) => {
      if (/^[a-zA-Z0-9_]{4,16}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入4～16位仅包含数字、字母和下划线的用户名'))
      }
    }
    const verifyPassword = (rule, value, callback) => {
      if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入6～20位仅包含数字和字母的密码'))
      }
    }
    const verifyCheckPassword = (rule, value, callback) => {
      if (value === this.registerForm.password) {
        callback()
      } else {
        callback(new Error('两次输入的密码不一致'))
      }
    }
    const verifyNickName = (rule, value, callback) => {
      if (/^[0-9a-zA-Z\u4E00-\u9FA5_]{3,16}/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入3～16位仅包含数字、字母、下划线和汉字的昵称'))
      }
    }
    const verifyEmail = (rule, value, callback) => {
      if (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱'))
      }
    }
    return {
      cardName: 'login',
      left: 0,
      check: false,
      loginForm: {
        user_name: '',
        password: ''
      },
      loading: false,
      rules: {
        user_name: [
          { required: true, trigger: 'blur', message: '请输入用户名' },
          { validator: verifyUserName, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { validator: verifyPassword, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, trigger: 'blur', message: '请输入确认密码' },
          { validator: verifyCheckPassword, trigger: 'blur' }
        ],
        nick_name: [
          { required: true, trigger: 'blur', message: '请输入昵称' },
          { validator: verifyNickName, trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', message: '请输入邮箱' },
          { validator: verifyEmail, trigger: 'blur' }
        ]
      },
      registerForm: {
        user_name: '',
        password: '',
        checkPassword: '',
        nick_name: '',
        sex: 2,
        email: ''
      },
      registerCheck: false
    }
  },
  beforeMount() {
    localStorage.clear()
    const status = this.$route.query.status
    if (status === 'register') {
      this.cardName = 'register'
    }
    this.setTabBarLeft()
  },
  methods: {
    // 登陆
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (!this.check) {
            return this.$message.warning('请阅读并同意简单商城的用户协议和隐私政策')
          }
          this.loading = true
          axios.post('/login', this.loginForm).then(res => {
            const { code, msg, data, token } = res
            if (code === 0) {
              this.$message.success(msg)
              // 保存用户数据到vuex
              this.$store.commit('SET_USERINFO', data)
              // 保存token到vuex
              this.$store.commit('SET_TOKEN', token)
              // 保存收货地址到vuex
              // this.$store.commit('SET_ADDRESS', address)
              this.resetLoginForm()
              this.$router.push({ name: 'Home' })
            } else {
              this.$message.warning(msg)
            }
            this.loading = false
          })
        }
      })
    },
    // 注册
    submitRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (!this.registerCheck) {
            return this.$message.warning('请阅读并同意简单商城的用户协议和隐私政策')
          }
          this.loading = true
          // eslint-disable-next-line no-unused-vars
          const { checkPassword, ...params } = this.registerForm
          axios.post('/register', params).then(res => {
            const { code, msg } = res
            if (code === 0) {
              this.$message.success(msg)
              this.resetRegisterForm()
              this.cardName = 'login'
            } else {
              this.$message.warning(msg)
            }
            this.loading = false
          })
        }
      })
    },
    changeTabs(e) {
      if (e.target.dataset.card) {
        this.cardName = e.target.dataset.card
        this.setTabBarLeft()
      }
    },
    setTabBarLeft() {
      this.left = this.cardName === 'login' ? '0px' : '64px'
      this.resetLoginForm()
      this.resetRegisterForm()
    },
    resetLoginForm() {
      this.loginForm.password = ''
      this.loginForm.user_name = ''
      this.$refs.loginForm?.clearValidate()
    },
    resetRegisterForm() {
      this.registerForm.user_name = ''
      this.registerForm.nick_name = ''
      this.registerForm.email = ''
      this.registerForm.sex = ''
      this.registerForm.password = ''
      this.registerForm.checkPassword = ''
      this.$refs.registerForm?.clearValidate()
    }
  }
}
</script>

<style scoped lang="scss">
.login-warp {
  display: flex;
  min-height: 100%;

  @media screen and (min-width: 1200px){
    .login-sider-warp {
      width: 375px;
    }
  }
  @media screen and (min-width: 1000px){
    .login-sider-warp {
      width: 200px;
    }
  }
  .login-sider-warp {
    flex-shrink: 0;
    flex-grow: 0;
  }
  .login-sider {
    background-image: url("./login_banner.jpg");
    background-size: cover;
    background-position: 50%;
    height: 100%;
  }

  .login-content {
    flex-shrink: 1;
    flex-grow: 1;
    .login-header {
      padding: 20px;
      overflow: hidden;
      .login-title {
        float: left;
        height: 40px;
        font-size: 26px;
        font-weight: 500;
        color: #333333;
        line-height: 40px;
        .logo-warp {
          margin-right: 10px;
          display: inline-block;
          vertical-align: top;
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
      .login-nav {
        float: right;
        a {
          margin-right: 10px;
          margin-left: 10px;
          display: inline-block;
          height: 40px;
          font-size: 14px;
          font-weight: 400;
          color: #838383;
          line-height: 40px;
          touch-action: manipulation;
          text-decoration: none;
          cursor: pointer;
          outline: none;
        }
      }
    }

    .login-container {
      text-align: center;
      position: relative;
      .login-card {
        border-radius: 5px;
        padding: 40px 45px;
        margin: 0 auto;
        box-shadow: 0 20px 50px 0 hsl(0deg 0% 64% / 10%);
        display: inline-block;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        min-width: 450px;

        .login-tabs {
          position: relative;
          display: flex;
          flex: none;
          align-items: center;
          span {
            margin: 0 20px 0 0;
            padding: 0 0 4px;
            display: inline-block;
            cursor: pointer;
            font-size: 22px;
            font-weight: 400;
            transition: all .3s;
            color: #bbbbbb;
          }
          .tab-active {
            color: #333333;
            font-weight: 500;
          }
          .tab-active-bar {
            border-radius: 2px;
            height: 4px;
            width: 44px;
            transition: width .3s,left .3s,right .3s;
            position: absolute;
            background: #67C23A;
            pointer-events: none;
            bottom: 0;
          }
        }

        .el-form {
          padding: 20px 2px 0;
        }

        .login-accept {
          margin-bottom: 10px;
          text-align: left;
        }
      }
    }
  }

  .login-copyright {
    overflow: hidden;
    left: 0;
    right: 0;
    text-align: center;
    white-space: nowrap;
    position: absolute;
    bottom: 20px;
    color: #999999;
    font-size: 12px;
  }
}
</style>
<style>
.login-accept .el-checkbox__label {
  color: #aaaaaa;
  font-weight: normal;
}
.login-accept .el-checkbox__label strong {
  color: #505050;
}
.login-accept .el-checkbox__input.is-checked+.el-checkbox__label {
  color: #aaaaaa;
}
.register-form.el-form .el-form-item .el-form-item__label {
  font-size: 12px;
  line-height: 20px;
}
</style>
