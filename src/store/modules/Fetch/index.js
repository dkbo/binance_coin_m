import axios from 'axios'
import qs from 'qs'
import crypto from 'crypto'
import { Message, MessageBox } from 'element-ui'
import i18n from '../../../lang/lang'
// 簽名
let isNotAuth = false
const statusHandle = {
    // token 失效 OR 被登出
    401: res => {
        isNotAuth = true
        MessageBox.alert(res.message, i18n.t('Message'), {
            type: 'warning',
            showClose: false,
            distinguishCancelAndClose: true
        }).then(() => (location.href = '/'))
        return false
    },
    403: res => {
        // const message = [i18n.t('M.Failed'), '<br/>', res.message].join('')
        MessageBox.alert(res.message, i18n.t('Message'), {
            type: 'warning',
            showClose: false,
            distinguishCancelAndClose: true
        }).then(() => (location.href = '/'))
        return false
    },
    404: res => {
        const message = [i18n.t('M.Failed'), '<br/>', res.message].join('')
        Message({
            type: 'error',
            duration: 5000,
            dangerouslyUseHTMLString: true,
            message
        })
        return false
    },
    405: res => {
        const message = [i18n.t('M.Failed'), '<br/>', 'Method Not Allowed'].join('')
        Message({
            type: 'error',
            duration: 5000,
            dangerouslyUseHTMLString: true,
            message
        })
        return false
    },
    422: (res, commit) => {
        const errors = Object.entries(res.errors)
        let data = {}
        let message = errors.map(([key, text]) => (data[key] = Array.isArray(text) ? text[0] : text))

        commit(_M.SET_TEMP_DATA, { temp: 'errors', data }, { root: true })
        message = [i18n.t('M.Failed'), ...message].join('<br />')
        Message({
            type: 'error',
            duration: 5000,
            dangerouslyUseHTMLString: true,
            message
        })
        return false
    },
    429: res => {
        const message = [i18n.t('M.Failed'), '<br/>', res.message].join('')
        Message({
            type: 'error',
            duration: 5000,
            dangerouslyUseHTMLString: true,
            message
        })
        return false
    },
    500: res => {
        const message = [i18n.t('M.Failed'), '<br/>', res.message].join('')
        Message({
            type: 'error',
            duration: 5000,
            dangerouslyUseHTMLString: true,
            message
        })
        return false
    }
}
const handleCatch = (err, { commit }) => {
    try {
        const res = err.response
        commit(_M.SET_LOADING, false, { root: true })
        return statusHandle[res.status](res.data, commit)
    } catch (err) {
        console.warn(err)
        Message({
            type: 'error',
            duration: 5000,
            dangerouslyUseHTMLString: true,
            message: 'Network Error'
        })
        return false
    }
}

const successFn = () => {
    Message({
        type: 'success',
        duration: 5000,
        message: i18n.t('M.Success')
    })
}

const handleFetch = (res, { commit }, { success = successFn }) => {
    if (res.status === 200) {
        return res.data
    }
    commit(_M.SET_LOADING, false, { root: true })
    return false
}
const actions = {
    async [_M.AXIOS](actions, payload) {
        if (isNotAuth) {
            return false
        }
        const buildSign = data => crypto.createHmac('sha256', actions.rootGetters.binanceConfig.API_SECRET).update(data).digest('hex')

        const isLogin = true
        let res
        let [{method, url, msg}, data = {}, config] = payload
        const { options = {} } = data
        delete data.options
        if (method === 'get') {
            data.params.timestamp = +new Date()
            const paramsQueryString = qs.stringify(data.params)
            data.params.signature = buildSign(paramsQueryString)
        } else {
            data.timestamp = +new Date()
            const paramsQueryString = qs.stringify(data)
            data.signature = buildSign(paramsQueryString)
            const QueryString = qs.stringify(data)
            url += `?${QueryString}`
            data = undefined
        }
        if (isLogin) {
            res = await axios[method](url, data, config).catch(err => handleCatch(err, actions))
            console.log(`[${msg}]`, method.toUpperCase(), url, res)
        } else {
            statusHandle[401]({
                message: i18n.t('M.Login_Timeout')
            })
            res = false
        }
        return handleFetch(res, actions, options)
    },
    async [_M.AXIOS_SET_HEADERS](actions, payload) {
        axios.defaults.headers['X-MBX-APIKEY'] = payload.API_KEY
    }
}

export default {
    actions
}
