<template>
    <div class="Income">
        <el-row class="control">
            <el-select v-model="from.symbol" clearable filterable>
                <el-option v-for="{symbol, pair} in premiumIndexList" :value="symbol" :key="pair" :label="pair.replace('USD', '')" />
            </el-select>
            <el-select v-model="from.incomeType" clearable filterable>
                <el-option v-for="type in types" :value="type" :key="type" :label="$t(type)" />
            </el-select>
            <el-button type="primary" @click="fetchGetIncome">{{$t('Search')}}</el-button>
        </el-row>
        <el-row class="table-head" type="flex">
            <el-col>時間</el-col>
            <el-col>資產種類</el-col>
            <el-col>{{$t('Income')}}</el-col>
            <el-col class="hidden-sm-and-down">類型</el-col>
            <!-- <el-col class="hidden-sm-and-down">明細</el-col> -->
            <!-- <el-col class="hidden-sm-and-down">合約</el-col> -->
            <!-- <el-col>tradeId</el-col>
            <el-col>tranId</el-col> -->
        </el-row>
         <div v-if="isShowTotal" class="table-head">
            <el-row type="flex">
                <el-col>總計</el-col>
                <el-col></el-col>
                <el-col>{{sumIncome}}</el-col>
                <el-col class="hidden-sm-and-down"></el-col>
            </el-row>
        </div>
        <div class="table-body" ref="tableBody" :style="{height: tableBodyHeight}">
            <el-row type="flex" v-for="(item, i) in list" :key="i">
                <el-col>{{getDate(item.time)}}</el-col>
                <el-col>{{item.asset}}</el-col>
                <el-col :class="+item.income > 0 ? 'green' : 'red'">{{item.income}}</el-col>
                <el-col class="hidden-sm-and-down">{{$t(item.incomeType)}}</el-col>
                <!-- <el-col class="hidden-sm-and-down">{{$t(item.info)}}</el-col> -->
                <!-- <el-col class="hidden-sm-and-down">{{item.symbol}}</el-col> -->
                <!-- <el-col>{{item.tradeId}}</el-col>
                <el-col>{{item.tranId}}</el-col> -->
            </el-row>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .IncomeTitle {
        font-weight: bold;
        padding-top: 10px;
    }
</style>
<script>
import Income from '@M/Income'
import Table from '@C/Table'
import { createNamespacedHelpers, mapGetters as RootGetters } from 'vuex'
const name = 'Income'
const path = `${name}/`
const { mapActions, mapGetters } = createNamespacedHelpers(path)
export default {
    name,
    mixins: [Table],
    data() {
        return {
            isShowTotal: false,
            from: {
                symbol: undefined,
                incomeType: undefined,
                limit: 1000
            },
            types: [
                'FUNDING_FEE',
                'COMMISSION',
                'TRANSFER'

            ]
        }
    },
    beforeMount() {
        this.$root.$emit('setStore', { Income })
        this.from = { ...this.from, ...this.$route.query }
        this.fetchGetIncome()
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
        ]),
        sumIncome() {
            return this.list.reduce((a, b) => a + +b.income, 0).strip()
        }
    },
    methods: {
        ...mapActions([
            _M.FETCH,
            _M.RESET
        ]),
        fetchGetIncome() {
            this[_M.FETCH]({
                key: 'incomeD_R',
                temp: 'list',
                ...this.from
            })
            this.isShowTotal = !!this.from.symbol
            this.$router.push({ query: this.from })
        }
    }
}
</script>
