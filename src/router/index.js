import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import i18n from '../lang/lang'
Vue.use(Router)

/**
 * isRoute 麵包屑 不提供連結
 * authId: 該頁面要檢驗的menu權限ID
 * notNav: 不需要顯示在左側菜單
 * meta: {
 *      auth: 需判斷權限
 *      notPage 不顯示頁面
 *      titleName: documnet Title []
 *      bName: 麵包屑的名字
 * }
 */

const routeData = {
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '*',
            name: 'NotFound',
            meta: {
                title: 'NotFound'
            },
            component: (r) =>
                require.ensure([], () => r(require('@V/NotFound')), 'NotFound')
        },
        {
            path: '/',
            redirect: '/Dashboard',
            name: 'Home',
            meta: {
                title: 'Home',
                auth: true
            },
            component: (r) =>
                require.ensure([], () => r(require(`@V/Home`)), 'Home'),
            children: [
                // 總覽
                {
                    path: 'Dashboard',
                    name: 'Dashboard',
                    meta: {
                        title: 'Dashboard'
                    },
                    component: (r) =>
                        require.ensure(
                            [],
                            () => r(require('@V/Home/Dashboard')),
                            'Dashboard'
                        )
                },
                // 資金流水
                {
                    path: 'Income',
                    name: 'Income',
                    meta: {
                        title: 'Income'
                    },
                    component: (r) =>
                        require.ensure(
                            [],
                            () => r(require('@V/Home/Income')),
                            'Income'
                        )
                },
                // 最新現貨指數價格和
                {
                    path: 'PremiumIndex',
                    name: 'PremiumIndex',
                    meta: {
                        title: 'PremiumIndex'
                    },
                    component: (r) =>
                        require.ensure(
                            [],
                            () => r(require('@V/Home/PremiumIndex')),
                            'PremiumIndex'
                        )
                },
                // 歷史費率
                {
                    path: 'FundingRate',
                    name: 'FundingRate',
                    meta: {
                        title: 'FundingRate'
                    },
                    component: (r) =>
                        require.ensure(
                            [],
                            () => r(require('@V/Home/FundingRate')),
                            'FundingRate'
                        )
                }
            ]
        },
        {
            path: '/Login',
            name: 'Login',
            meta: {
                title: 'Login'
            },
            component: (r) =>
                require.ensure([], () => r(require('@V/Login')), 'Login')
        }
    ]
}

let firstPage = ''
const getNotView = ({ meta: { notPage } }) => notPage
const setRedirect = () => {
    const setFirstPage = (page) => !firstPage && (firstPage = page)
    routeData.routes[1].children
        // 排序用
        .map((obj, i) => {
            obj.order = obj.order || i
            return obj
        })
        // 進行排序
        .sort((a, b) => {
            return a.order - b.order
        })
        .forEach(({ meta, children, path }) => {
            if (children) {
                children.forEach(({ meta, path: path2 }) => {
                    if (!getNotView({ meta })) {
                        setFirstPage(`/${path}/${path2}`)
                    }
                })
            } else {
                if (!getNotView({ meta })) {
                    setFirstPage(path)
                }
            }
        })
}
const router = new Router(routeData)
router.beforeEach((to, from, next) => {
    !firstPage && setRedirect()
    const notView = getNotView(to)
    if (to.matched.some((record) => record.meta.auth) && !store.getters.binanceConfig.API_KEY) {
        router.replace('/Login')
    } else if (notView) {
        next(firstPage)
    }
    next() // 确保一定要调用 next()
})
router.afterEach((to) => {
    const { bName, title, titleName } = to.meta
    const str = titleName
        ? titleName.map((key) => i18n.t(key)).join(' | ')
        : i18n.t(bName || title)
    document.title = `DKBO | ${str}`
})

export default router
