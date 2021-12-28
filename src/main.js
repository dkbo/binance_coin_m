// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import '@UTIL/prototype'

import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store/store'
import i18n from './lang/lang'
import ElementUI from 'element-ui'
import directive from './directive'

import '@CSS/index.scss' // 模組CSS

sync(store, router)
Vue.use(directive)
// UI 組件
Vue.use(ElementUI)
Vue.config.productionTip = false

store.registerModule('dispatch', {
    getters: { dispatch: store.dispatch }
})

let queue = [store.dispatch(_M.APP_INIT)]

Promise.all(queue).then(() => {
    const $vue = new Vue({
        el: '#app',
        router,
        store,
        i18n,
        render: createElement => createElement(App)
    })
    store.registerModule('$vue', {
        getters: {
            getVue: () => () => $vue
        }
    })
})