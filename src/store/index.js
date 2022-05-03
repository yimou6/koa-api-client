import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     isLogin: false,
    // 用户数据
    userInfo: {},
    // 令牌
    token: '',
    headerTitles: [],

    // 语言
    lang: 'zh',
    // 购物车
    shopCar: [],
    // 收货地址
    address: []
  },
  getters: {
    address: state => {
      if (state.address.length > 0) {
        return state.address
      } else {
        return JSON.parse(localStorage.getItem('address') || '[]')
      }
    },
    shopCar: state => state.shopCar
  },
  mutations: {
    SET_USERINFO(state, value) {
      localStorage.setItem('userInfo', JSON.stringify(value))
      state.userInfo = value
    },
    SET_TOKEN(state, value) {
      localStorage.setItem('token', value)
      state.token = value
    },
    SET_TITLES(state, value) {
      state.headerTitles = value
    },
    SET_ADDRESS(state, value) {
      localStorage.setItem('address', JSON.stringify(value))
      state.address = value
    },
    SET_SHOP_CAR(state, { type, value, number, selected }) {
      if (type === 'change') {
        const index = state.shopCar.findIndex(it => it.good_id === value)
        if (index !== -1) {
          state.shopCar[index].number = number
          if (selected !== undefined) {
            state.shopCar[index].selected = selected
          }
        } else {
          state.shopCar.push({
            good_id: value,
            number,
            selected: true
          })
        }
      } else if (type === 'init') {
        state.shopCar = value
      }
    },
    CHECKUSER(state,value) {
      if(JSON.stringify(value).indexOf(JSON.stringify(state.user)) === -1 ) {
        // state中不存在value
        alert("输入的用户名或者密码有误，请重新输入")
      }else {
        // state中存在value
        alert("登录成功,欢迎")
      }
    }
  },
// 准备actions 用于响应组件中的动作
  actions: {
    // 判断用户输入的姓名和密码不能为空
    loginAction(context,value) {
       if(value.name !== "" && value.password !== "") {
         context.commit('CHECKUSER',value)
       }else {
         alert("用户名和密码不能为空")
       }
       
    },
    logOut(context) {
      context.commit('SET_USERINFO', {})
      context.commit('SET_TOKEN', '')
    }
  },

  modules: {
    
  }
})
