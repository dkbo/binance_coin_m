import Vue from 'vue'
import Vuex from 'vuex'
import App from './modules/App/'
import Common from './modules/Common/'
import Fetch from './modules/Fetch/'
import Lang from './modules/Lang/'
// import Login from './modules/Login'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        App,
        Common,
        Fetch,
        Lang
    },
    strict: process.env.NODE_ENV !== 'production' //是否开启严格模式
})

export default store
