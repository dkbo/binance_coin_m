<style lang="scss" scoped>
    // 搜尋CD時,消除轉圈圈icon
    .loading-delay {
        ::v-deep i.el-icon-loading {
            display: none;
        }
    }

    // autoRefresh開關樣式調整
    .auto-research {
        height: 40px;
        ::v-deep .el-switch__label {
            color:#606266;
        }
    }
    .btnPage {
        > div {
            display: block;
            width: auto;
            margin-top: 0px;
            // 按鈕
            &:first-of-type {
                float: left;
                > .el-row {
                    margin: 10px 0 5px;
                }
            }
            // 頁碼
            &:nth-of-type(2) {
                float: right;
                > .el-row {
                    margin: 15px 0 5px;
                    .el-pagination {
                        margin-top: 0;
                    }
                }
            }
        }
    }
    //control 收合區塊
    .controlCollapse {
        overflow: hidden;
        transition: 0.3s all;
        opacity: 1;
        visibility: visible;
        &.is_active {
            opacity: 0;
            visibility: hidden;
        }
    }
    //control 收合按鈕
    .controlCollapseBtn {
        color: #ffffff;
        background-color: #999999;
        border-radius: 50px;
        border: 5px solid white;
        border-radius: 50px;
        padding: 4px;
        font-size: 18px;
        font-weight: bold;
        transition: 0s;
        transform: rotate(-90deg);
        cursor: pointer;
        margin-right: 5px;
        &.is_active {
            transform: rotate(90deg);
            transition: 0s;
            &:hover {
                // transform: rotate(90deg);
            }
        }
        &:hover {
            // transform: rotate(270deg);
            background-color: #a6a9ad;
            transition: 0.4s;
        }
    }
</style>

<script>
import { returnState, setStorage, getStorage } from '@UTIL'
import { mapGetters, mapActions } from 'vuex'
import throttle from '@UTIL/decorator/throttle'
import debounce from '@UTIL/decorator/debounce'

export default {
    name: 'Control',
    beforeMount() {
        this.$root.$on('search', this.updateSearch)
        this.$root.$on('resetSearchDelay', this.resetSearchDelay)
        this.form && (this.backFormData = returnState(this.form))
        this.form && (this.defaultFormData = returnState(this.form))
        this.$root.$on('resizeControl', this.resizeControl)
        window.addEventListener('resize', this.resizeControl, false)
        if (this.defaultCurrency) {
            const globalCr = getStorage('currency', false)
            const strCr = typeof (this.form.currency) === 'string'
            // 如果有查詢過(貨幣), 設定貨幣預設值；否則為該管理員有的貨幣第一個
            if (this.form && !!this.form.currency) {
                this.form.currency = strCr ? (globalCr || this.currency[0]) : this.currency
            }
        }
    },
    mounted() {
        this.resizeControl()
    },
    beforeDestroy() {
        this.$root.$off('search', this.updateSearch)
        this.$root.$off('resetSearchDelay', this.resetSearchDelay)
        this.$root.$off('resizeControl', this.resizeControl)
        window.removeEventListener('resize', this.resizeControl, false)
        clearInterval(this.countDownTimer)
        clearInterval(this.autoResearchTimer)
    },
    data() {
        return {
            defaultDate: [],
            defaultDate2: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > +new Date()
                }
            },
            backFormData: {},
            defaultFormData: {},
            pageSizes: [50, 100, 200],
            // 頁碼顯示長度-大于等于 5 且小于等于 21 的奇数=_=
            pagerCount: 5,
            // 搜尋延遲-倒數秒數
            loadingDelay: 0,
            // 搜尋延遲-倒數計時器
            countDownTimer: null,
            // 是否每分鐘自動搜尋
            autoResearch: false,
            // 自動搜尋-倒數計時器
            autoResearchTimer: null,
            // 自動搜尋-倒數秒數
            autoResearchCountDown: 0,
            isFirstSearch: true,
            // 搜尋列-第一次(原始的高)
            is_firstControlHeight: '',
            // 搜尋列-收合展開高
            is_controlHeight: 0,
            // 搜尋列-收合展狀態
            is_control: false,
            isClean: false,
            // 使用者輸入:僅能查詢起終點間62天的資料, 所以間隔是61天
            MAX_INTERVAL: 61,
            // 貨幣預設值
            defaultCurrency: true
        }
    },
    watch: {
        // $route() {
        //     this.resetSearchDelay()
        // },
        isLoading(v) {
            // 鎖定search按鈕幾秒
            const COLD_DOWN_SEC = 5

            if (v) {
                // 如果CD中,自動刷新觸發loading, 則重置倒數
                if (this.loadingDelay > 0) {
                    this.resetSearchDelay()
                }

                // 設定搜尋後CD時間
                this.loadingDelay = COLD_DOWN_SEC
            } else {
                // API 取得回應後開始倒數
                const timer = setInterval(() => {
                    this.loadingDelay -= 1
                    if (this.loadingDelay <= 0) {
                        this.resetSearchDelay()
                    }
                }, 1000)

                this.countDownTimer = timer
            }
        },
        // 每分鐘重打search
        autoResearch(v) {
            // 每幾秒重打
            const RESEARCH_PER_SEC = 60

            if (v) {
                this.autoResearchCountDown = RESEARCH_PER_SEC
                const timer = setInterval(async () => {
                    this.autoResearchCountDown -= 1
                    if (this.autoResearchCountDown <= 0) {
                        await this.handleSearch()
                        this.autoResearchCountDown = RESEARCH_PER_SEC
                    }
                }, 1000)
                this.autoResearchTimer = timer
            } else {
                clearInterval(this.autoResearchTimer)
                this.autoResearchCountDown = 0
            }
        }
    },
    methods: {
        ...mapActions([
            _M.SET_LOADING,
            _M.SET_TEMP_DATA
        ]),
        updateSearch(bool) {
            if (this.beforeSearch() && (!this.isLoading || bool)) {
                this[_M.SET_LOADING](true)
                this.backFormData.page = this.form.page //保留目前切換到的頁數
                this.form = returnState(this.backFormData)
                this[_M.FETCH](this.form)
                    .then(() => this.$root.$emit('afterSearch'))
            }
        },
        /**
         * 打搜尋API前做的事
         */
        beforeSubmit() {
            // 取得欲搜尋的貨幣, 並記錄到 nowCr
            const { currency } = this.form || {}
            currency && this[_M.SET_TEMP_DATA]({
                temp: 'nowCr',
                data: currency
            })
            // currency 型別不是string不用紀錄
            const strCr = typeof (this.form.currency) === 'string'
            // for跨分頁使用
            strCr && setStorage('currency', currency, false)
        },
        /**
         * 送出搜尋前做的事
         * @returns {boolean} 若false則不送出搜尋
         */
        beforeSearch() {
            return true
        },
        @throttle(1000)
        handleSearch() {
            if (this.beforeSearch() && !this.isLoading) {
                this.beforeSubmit()
                this[_M.SET_LOADING](true)
                this.form.page = 1
                this.backFormData = returnState(this.form)
                this[_M.FETCH](this.form)
                    .then(() => this.$root.$emit('afterSearch'))
            }
            if (this.isFirstSearch) {
                this.$root.$emit('resizeTable')
            }
            this.isFirstSearch = false
        },
        handleSizeChange(val) {
            if (!this.isLoading) {
                this[_M.SET_LOADING](true)
                this.form = returnState(this.backFormData)
                this.form.rp = val
                this.form.page = 1
                this.backFormData.rp = val
                this.backFormData.page = 1
                this[_M.FETCH](this.form)
                    .then(() => this.$root.$emit('afterSearch'))
            }
        },
        @debounce(500)
        handleCurrentChange(val) {
            if (!this.isLoading) {
                this[_M.SET_LOADING](true)
                this.form = returnState(this.backFormData)
                this.form.page = val
                this[_M.FETCH](this.form)
                    .then(() => this.$root.$emit('afterSearch'))
            }
        },
        // 搜尋CD時間-強制關閉倒數
        resetSearchDelay() {
            clearInterval(this.countDownTimer)
            this.loadingDelay = 0
        },
        /**
         * 搜尋日期是否超過區間(60天)
         * 注意: VBS/CashFlow 有特例
         * @returns {Boolean} 是否合法
         */
        isOverInterval() {
            const {updated_start_date, updated_end_date, start_date, end_date} = this.form
            const existUpdateDate = updated_start_date && updated_end_date
            const existDate = start_date && end_date
            // 若使用者填入時間區間超過限制, 則跳警告
            const intervalWarning = () => {
                this.$message({
                    type: 'warning',
                    duration: 2000,
                    message: this.$t('M.TimeIntervalExceed')
                })
            }
            if (existUpdateDate) {
                const interval = moment(updated_end_date).diff(updated_start_date, 'days')
                if (interval > this.MAX_INTERVAL) {
                    intervalWarning()
                    return false
                }
            }
            if (existDate) {
                const interval = moment(end_date).diff(start_date, 'days')
                if (interval > this.MAX_INTERVAL) {
                    intervalWarning()
                    return false
                }
            }

            // 通過檢查則回傳true
            return true
        },
        multiplePlaceholder(key, text) {
            return (this.form[key] || []).length ? '' : text
        },
        resizeControl() {
            if (this.$refs && this.$refs.controlCollapseWarp) {
                this.is_firstControlHeight = `${this.$refs.controlCollapseWarp.offsetHeight + 5}`
                this.is_control ? this.is_controlHeight = 0 : this.is_controlHeight = this.is_firstControlHeight
                setTimeout(() => this.$root.$emit('resizeTable'), 450)
            }
        },
        handleControlCollapse() {
            this.is_control = !this.is_control
            this.resizeControl()
        },
        beforeClear() {
            return true
        },
        // 清除按鈕(重置)
        handleClear() {
            this.isClean = true
            this.beforeClear()
            this.form = returnState(this.defaultFormData)
            setTimeout(() => {
                this.isClean = false
            })
        }
    },
    computed: {
        ...mapGetters([
            'isLoading',
            'isAuthAdd',
            'isAuthEdit',
            'permissions',
            'currency'
        ]),
        id() {
            return this.$route.params.id
        },
        date: {
            get() {
                return this.defaultDate
            },
            set(date) {
                date = date || []
                this.defaultDate = date
                this.form.start_date = date[0]
                this.form.end_date = date[1]
            }
        },
        date2: {
            get() {
                return this.defaultDate2
            },
            set(date) {
                date = date || []
                this.defaultDate2 = date
                this.form.updated_start_date = date[0]
                this.form.updated_end_date = date[1]
            }
        }
    }
}
</script>
