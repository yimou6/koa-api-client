import store from '@/store'

/**
 * 从缓存初始化用户信息
 */
export function initUser() {
    store.commit('SET_USERINFO', JSON.parse(localStorage.getItem('userInfo') || '{}'))
    store.commit('SET_TOKEN', localStorage.getItem('token') || '')
}