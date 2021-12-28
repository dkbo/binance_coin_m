<template>
<div>
    <el-button
        @click="handleRefresh"
        :loading="isLoading || loadingDelay > 0"
        :class="{'loading-delay': loadingDelay > 0}"
        type="primary">
        {{$t('Search')}}{{loadingDelay > 0 ? ` ${loadingDelay}` : ''}}
    </el-button>
    <el-switch
        class="auto-research"
        v-model="autoResearch"
        :active-text="$t('AutoRefresh') + (autoResearch ? `（${autoResearchCountDown}）`:'')"
        active-color="#4bcf99"
    />
</div>
</template>

<style lang="scss" scoped>
    // 搜尋CD時,消除轉圈圈icon
    .loading-delay {
        ::v-deep i.el-icon-loading {
            display: none;
        }
    }

    // autoRefresh開關樣式調整
    .auto-research {
        margin-left: 20px;
        ::v-deep .el-switch__label {
            color:#606266;
        }
    }
</style>

<script>
// "詳情"共用部分
import { returnState } from '@UTIL'
import { mapGetters, mapActions } from 'vuex'
import throttle from '@UTIL/decorator/throttle'
export default {
    name: 'Control',
    beforeDestroy() {
        clearInterval(this.countDownTimer)
        clearInterval(this.autoResearchTimer)
    },
    data() {
        return {
            // 搜尋延遲-倒數秒數
            loadingDelay: 0,
            // 搜尋延遲-倒數計時器
            countDownTimer: null,
            // 是否每分鐘自動搜尋
            autoResearch: false,
            // 自動搜尋-倒數計時器
            autoResearchTimer: null,
            // 自動搜尋-倒數秒數
            autoResearchCountDown: 0
        }
    },
    watch: {
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
                        await this.handleRefresh()
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
            _M.SET_LOADING
        ]),
        // 搜尋CD時間-強制關閉倒數
        resetSearchDelay() {
            clearInterval(this.countDownTimer)
            this.loadingDelay = 0
        }
    },
    computed: {
        ...mapGetters([
            'isLoading'
        ])
    }
}
</script>
