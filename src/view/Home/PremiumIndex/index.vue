<template>
    <div class="PremiumIndex">
        <el-row class="control">
            <el-select v-model="from.symbol" @change="handleChange" clearable filterable multiple collapse-tags>
                <el-option v-for="{symbol, pair} in premiumIndexList" :value="symbol" :key="symbol" :label="pair.replace('USD', '')" />
            </el-select>
        </el-row>
        <el-row class="table-head" type="flex">
            <el-col>時間</el-col>
            <el-col>資產種類</el-col>
            <el-col>資金費率</el-col>
            <el-col class="hidden-sm-and-down">標記價格</el-col>
            <el-col class="hidden-sm-and-down">指數價格</el-col>
            <!-- <el-col>tradeId</el-col>
            <el-col>tranId</el-col> -->
        </el-row>
        <div class="table-body" ref="tableBody" :style="{height: tableBodyHeight}">
            <el-row  type="flex" align="middle" v-for="(item, i) in perpList" :key="i">
                <el-col>{{getDate(item.time)}}</el-col>
                <el-col>
                    <div>{{item.pair.replace(/USD.*/, '')}}</div>
                    <div class="small" :class="+(tickers[`${item.pair}T`] || {}).P > 0 ? 'green' : 'red'">{{+(tickers[`${item.pair}T`] || {}).c}}</div>
                    <div class="small" :class="+(tickers[`${item.pair}T`] || {}).P > 0 ? 'green' : 'red'">{{(tickers[`${item.pair}T`] || {}).P}}%</div>
                </el-col>
                <el-col :class="+item.lastFundingRate > 0 ? 'green' : 'red'">{{ (item.lastFundingRate * 100).toFixed(4) + '%'}}</el-col>
                <el-col class="hidden-sm-and-down">{{formatNumber(item.markPrice)}}</el-col>
                <el-col class="hidden-sm-and-down">{{formatNumber(item.indexPrice)}}</el-col>
                <!-- <el-col>{{item.tradeId}}</el-col>
                <el-col>{{item.tranId}}</el-col> -->
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .PremiumIndexTitle {
        font-weight: bold;
        padding-top: 10px;
    }
</style>
<script>

import {setStorage, getStorage} from '@UTIL'
import { Storage } from '@API'
import PremiumIndex from '@M/PremiumIndex'
import Table from '@C/Table'
import { createNamespacedHelpers, mapGetters as RootGetters } from 'vuex'
const name = 'PremiumIndex'
const path = `${name}/`
const { mapActions, mapGetters } = createNamespacedHelpers(path)
export default {
    name,
    mixins: [Table],
    data() {
        return {
            from: {
                symbol: getStorage(Storage.PremiumIndexOptions)
            }
        }
    },
    beforeMount() {
        this.$root.$emit('setStore', { PremiumIndex })
        this.from = { ...this.from, ...this.$route.query }
    },
    beforeDestroy() {
        this[_M.RESET]()
        this.$root.$emit('unSetStore', name)
    },
    computed: {
        ...RootGetters([
            'premiumIndexList',
            'tickers'
        ]),
        perpList() {
            return this.premiumIndexList
                .filter(({symbol}) => !this.from.symbol.length || this.from.symbol.includes(symbol))
                .sort((a, b) => +b.lastFundingRate - +a.lastFundingRate)
        }
    },
    methods: {
        ...mapActions([
            _M.FETCH,
            _M.RESET
        ]),
        handleChange(value) {
            setStorage(Storage.PremiumIndexOptions, value)
        }

    }
}
</script>
