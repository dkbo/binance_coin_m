import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getCookie } from '@UTIL'
import elLocale from 'element-ui/lib/locale'
import en from './locale/en.json'
import tw from './locale/zh-TW.json'
import een from 'element-ui/lib/locale/lang/en'
import ecn from 'element-ui/lib/locale/lang/zh-CN'
// console.log(ecn)
const zhTW = Object.assign({}, tw, ecn)
const EN = Object.assign({}, en, een)
Vue.use(VueI18n)
const langKey = {
    // https://gist.github.com/wpsmith/7604842
    // https://www.itread01.com/articles/1495793960.html
    // 中文 -> zh-CN
    tw: 'zh-TW',
    zh: 'zh-TW',
    'zh-tw': 'zh-TW',
    'zh-TW': 'zh-TW',
    // 英文 -> en
    us: 'en',
    en: 'en',
    // 'en-au': 'en', //'English (Australia)',
    // 'en-bz': 'us', //'English (Belize)',
    // 'en-ca': 'en', // 加拿大(ca)
    // 'en-ie': 'en', // 愛爾蘭(ie)
    // 'en-jm': 'en', //'English (Jamaica)',
    // 'en-nz': 'en', //'English (New Zealand)',
    // 'en-ph': 'en', // 菲律賓(ph)
    // 'en-za': 'en', //'English (South Africa)',
    // 'en-tt': 'en', //'English (Trinidad & Tobago)',
    // 'en-gb': 'en', // 英國(gb)
    'en-us': 'en' //'English (United States)',
    // 'en-zw': 'en', //'English (Zimbabwe)',
    // 'gi': 'en', //直布羅陀(gi)
    // 泰國
    // th: 'th',
    // 越南
    // vi: 'vn',
    // vn: 'vn',
    // 日文
    // ja: 'jp',
    // jp: 'jp'
    // 印尼
    // 'id': 'id'
    // 柬埔寨
    // 'km': 'kh',
    /*
    // 寮國(找不到)
    'la': 'la',
    // 緬甸
    'my': 'mm',
    // 馬來西亞
    'ms': 'my',
    // 印度
    'pa-in': 'in',
    // 奧地利
    'at': 'at',
    'de-at': 'at', // 奧地利德語
    // 瑞典
    'sv': 'se',
    // 丹麥
    'da': 'dk',
    // 芬蘭
    'fi': 'fi',
    // 西班牙
    'es': 'es',
    'es-es': 'es',
    // 挪威
    'no': 'no',
    // 德國
    'de': 'de',
    'de-de': 'de',
    // 馬爾他
    'mt': 'mt'
    */
}
const locale =
    langKey[getCookie('hl')] ||
    langKey[window.navigator.userLanguage] ||
    langKey[window.navigator.language] ||
    langKey['en']

const messages = {
    'zh-TW': zhTW,
    en: EN
}

const i18n = new VueI18n({
    locale,
    messages,
    silentTranslationWarn: true // warn 警報不出現
})
elLocale.i18n((key, value) => i18n.t(key, value))
// i18n.setTitle = (title = '') =>
// (document.title = title ? `${i18n.t(webTitle)} | ${i18n.t(title)}` : i18n.t(webTitle))

export default i18n
