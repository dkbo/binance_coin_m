<template>
    <div class="dashboard">
        <el-row class="table-head" type="flex">
            <el-col>資產種類</el-col>
            <!-- <el-col>availableBalance</el-col> -->
            <!-- <el-col>crossUnPnl</el-col> -->
            <!-- <el-col>crossWalletBalance</el-col> -->
            <el-col>即時費率</el-col>
            <el-col>預估套利</el-col>
            <!-- <el-col>maintMargin</el-col> -->
            <el-col>保證金</el-col>
            <el-col>可用金</el-col>
            <!-- <el-col>openOrderInitialMargin</el-col> -->
            <!-- <el-col>positionInitialMargin</el-col> -->
            <el-col>未實現盈虧</el-col>
            <el-col>錢包</el-col>
            <el-col>總資產</el-col>
        </el-row>
        <div class="table-head">
            <el-row type="flex">
                <el-col>總計</el-col>
                <el-col></el-col>
                <el-col></el-col>
                <el-col></el-col>
                <el-col></el-col>
                <el-col>{{sumUnrealizedProfit}}</el-col>
                <el-col>{{sumWalletBalance}}</el-col>
                <el-col>{{sumMarginBalance}}</el-col>
            </el-row>
        </div>
        <div class="table-body" ref="tableBody">
            <el-row type="flex" align="middle" v-for="item in filterAccountDListAssets" :key="item.asset">
                <el-col>{{item.asset}}</el-col>
                <!-- <el-col>{{item.availableBalance}}</el-col> -->
                <!-- <el-col>{{item.crossUnPnl}}</el-col> -->
                <!-- <el-col>{{item.crossWalletBalance}}</el-col> -->
                <el-col :class="+item.ddd > 0 ? 'green' : 'red'">{{item.ddd}}</el-col>
                <el-col :class="+item.ccc > 0 ? 'green' : 'red'">
                    <div>{{item.ccc}}</div>
                </el-col>
                <!-- <el-col>{{item.maintMargin}}</el-col> -->
                <el-col>
                    <div>{{item.positionInitialMargin}}</div>
                </el-col>
                <el-col>
                    <div>{{item.maxWithdrawAmount}}</div>
                    <div class="small">{{getUSD(item.maxWithdrawAmount, item)}}</div>
                </el-col>
                <!-- <el-col>{{item.openOrderInitialMargin}}</el-col> -->
                <!-- <el-col>{{item.positionInitialMargin}}</el-col> -->
                <el-col :class="+item.unrealizedProfit > 0 ? 'green' : 'red'">
                    <div>{{item.unrealizedProfit}}</div>
                    <div class="small">{{getUSD(item.unrealizedProfit, item)}}</div>
                </el-col>
                <el-col>
                    <div>{{item.walletBalance}}</div>
                    <div class="small">{{getUSD(item.walletBalance, item)}}</div>
                </el-col>
                <el-col>
                    <div>{{item.marginBalance}}</div>
                    <div class="small">{{getUSD(item.marginBalance, item)}}</div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import Dashboard from '@M/Dashboard'
import { createNamespacedHelpers, mapGetters as rootGetters } from 'vuex'
const name = 'Dashboard'
const path = `${name}/`
const { mapActions, mapGetters } = createNamespacedHelpers(path)
export default {
    name,
    beforeMount() {
        this.$root.$emit('setStore', { Dashboard })
        // this.fetchGetAccount()
    },
    beforeDestroy() {
        this[_M.RESET]()
        this.$root.$emit('unSetStore', name)
    },
    computed: {
        ...rootGetters([
            'filterAccountDListAssets'
        ]),
        sumUnrealizedProfit() {
            return this.filterAccountDListAssets.reduce((a, b) => a + (b.unrealizedProfit * b.usdPrice), 0).strip().toFixed(4) + ' USD'
        },
        sumWalletBalance() {
            return this.filterAccountDListAssets.reduce((a, b) => a + (b.walletBalance * b.usdPrice), 0).strip().toFixed(4) + ' USD'
        },
        sumMarginBalance() {
            return this.filterAccountDListAssets.reduce((a, b) => a + (b.marginBalance * b.usdPrice), 0).strip().toFixed(4) + ' USD'
        }
    },
    methods: {
        ...mapActions([
            _M.FETCH,
            _M.RESET
        ]),
        getUSD(num, {usdPrice}) {
            return (num * usdPrice).strip().toFixed(4) + ' USD'
        }
    }
}
</script>
