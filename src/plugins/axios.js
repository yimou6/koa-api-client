import axios from 'axios'
import store from '@/store'
import { Notification } from 'element-ui'
import Router from '@/router'

axios.defaults.baseURL = '/api'

// 白名单
const WHITE_LIST = [
    { method: 'post', url: '/login' },
    { method: 'post', url: '/register' },
    { method: 'get', url: '/good' },
]

axios.interceptors.request.use(config => {
    if (!WHITE_LIST.some(it => it.method === config.method && it.url === config.url)) {
        config.headers['authorization'] = 'Bearer ' + store.state.token
    }
    // console.log(config)
    return config
})

axios.interceptors.response.use(response => {
    return response.data
}, async error => {
    if (error.response.status === 401) {
        Notification.error(error.response.data.msg)
        await Router.replace({ path: '/login' })
    }
    return error
})

export default axios