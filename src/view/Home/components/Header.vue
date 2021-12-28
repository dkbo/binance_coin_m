<template>
    <el-header height="auto" class="header">
        <div class="title"><span>{{$t('幣安幣本位套保套利')}}</span></div>
        <MenuRight />
    </el-header>
</template>

<script>
import MenuRight from './MenuRight'
import { mapGetters, mapActions } from 'vuex'
import '@CSS/pages/header.scss'

export default {
    name: 'Header',
    data() {
        return {
            timer: null
        }
    },
    beforeMount() {
        this.handleTimer()
        this.timer = setInterval(this.handleTimer, 10000)
    },
    beforeDestroy() {
        clearInterval(this.handleTimer)
        this.timer = null
    },
    components: {
        MenuRight
    },
    methods: {
        ...mapActions([
            _M.FETCH
        ]),
        handleTimer() {
            this[_M.FETCH]({
                key: 'PremiumIndexD_R',
                temp: 'premiumIndexList'
            })
            this[_M.FETCH]({
                key: 'accountD_R',
                temp: 'accountDList'
            })
        }
    },
    computed: {
        ...mapGetters([
            // 'isLoading'
        ])
    }
}
</script>
