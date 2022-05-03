import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)
import store from '@/store'

import en from './lang/en'
import zhCN from './lang/zh-CN'

import elEn from 'element-ui/lib/locale/lang/en'
import elZh from 'element-ui/lib/locale/lang/zh-CN'

const messages = {
    en: {
        ...elEn,
        ...en
    },
    zh: {
        ...elZh,
        ...zhCN
    }
}
const i18n = new VueI18n({
    locale: store.state.lang, // 设置地区
    messages, // 设置地区信息
})
export default i18n