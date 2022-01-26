<template>
    <div class="FundingRate">
        <el-row class="control">
            <el-select v-model="from.symbol" clearable filterable>
                <el-option v-for="{symbol, pair} in premiumIndexList" :value="symbol" :key="pair" :label="pair" />
            </el-select>
            <el-button type="primary" @click="fetchGetFundingRate">{{$t('Search')}}</el-button>
        </el-row>
        <el-row class="table-head" type="flex">
            <el-col>時間</el-col>
            <el-col>資產種類</el-col>
            <el-col>資金費率</el-col>
        </el-row>
        <div class="table-body" ref="tableBody" :style="{height: tableBodyHeight}">
            <el-row  type="flex" v-for="(item, i) in list" :key="i">
                <el-col>{{getDate(item.fundingTime)}}</el-col>
                <el-col>{{item.symbol.replace(/USD.*/, '')}}</el-col>
                <el-col :class="+item.fundingRate > 0 ? 'green' : 'red'">{{(item.fundingRate * 100).toFixed(4) + '%'}}</el-col>
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .FundingRateTitle {
        font-weight: bold;
        padding-top: 10px;
    }
</style>
<script>
import FundingRate from '@M/FundingRate'
import Table from '@C/Table'
import { createNamespacedHelpers, mapGetters as RootGetters } from 'vuex'
const name = 'FundingRate'
const path = `${name}/`
const { mapActions, mapGetters } = createNamespacedHelpers(path)
export default {
    name,
    mixins: [Table],
    data() {
        return {
            from: {
                symbol: 'SOLUSD_PERP'
            }
        }
    },
    beforeMount() {
        this.$root.$emit('setStore', { FundingRate })
        this.from = { ...this.from, ...this.$route.query }
        this.fetchGetFundingRate()
    },
    beforeDestroy() {
        this[_M.RESET]()
        this.$root.$emit('unSetStore', name)
    },
    computed: {
        ...RootGetters([
            'premiumIndexList'
        ]),
        ...mapGetters([
            'list'
        ])
    },
    methods: {
        ...mapActions([
            _M.FETCH,
            _M.RESET
        ]),
        fetchGetFundingRate() {
            this[_M.FETCH]({
                key: 'FundingRateD_R',
                temp: 'list',
                ...this.from
            })
            this.$router.push({ query: this.from })
        }
    }
}
</script>
