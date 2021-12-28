import axios from 'axios'
import i18n from '@/lang/lang'
// import Vue from 'vue'

const state = {
    lang: i18n.locale
}

const actions = {
    async [_M.SET_LANG]({ commit, getters }, payload = state.lang) {
        // 紀錄此頁面用到那些語言包
        // i18n.setTitle(payload.pageTitle || '')
        commit(_M.SET_LANG, payload)
        const { bName, title, titleName } = getters.route.meta
        const str = titleName
            ? titleName.map(key => i18n.t(key)).join(' | ')
            : i18n.t(bName || title)
        document.title = `${str} | DKBO`

        // // 取得該語系語言包
        // const pageTitle = payload.pageTitle || ''
        // // 新增語系記得加入 @E/src/locale/lang/[$lang].js
        // await import(/* webpackChunkName: "elLang-[request]" */ `@E/src/locale/lang/${lang}.js`)
        //     .then(locElementUi => Object.assign({}, locElementUi.default))
        //     .then(langObj => {
        //         i18n.setLocaleMessage(lang, langObj)
        //         i18n.setTitle(pageTitle)
        //         // setStorage(Storage.i18nMessages + lang, langObj)
        //         commit(_M.SET_LANG, lang)
        //     })
        //     .catch(err => console.log(err, 'i18n err'))
    }
}

const mutations = {
    [_M.SET_LANG](state, payload) {
        state.lang = payload
        i18n.locale = payload
        document.cookie = `hl=${payload}; expires=Session; path=/`
        axios.defaults.headers['X-Locale'] = payload
    }
}

const getters = {
    lang: state => state.lang
}

export default {
    state,
    actions,
    mutations,
    getters
}
