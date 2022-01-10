<template>
    <div class="dashboard">
        <div class="hidden-sm-and-down">
            <el-row class="table-head" type="flex">
            <el-col>資產種類</el-col>
            <!-- <el-col>availableBalance</el-col> -->
            <!-- <el-col>crossUnPnl</el-col> -->
            <!-- <el-col>crossWalletBalance</el-col> -->
            <el-col>即時費率</el-col>
            <el-col>預估套利</el-col>
            <!-- <el-col>maintMargin</el-col> -->
            <el-col>保證金</el-col>
            <el-col>期現價差(USDT/USD)</el-col>
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
                <el-col></el-col>
                <el-col>{{sumUnrealizedProfit}}</el-col>
                <el-col>{{sumWalletBalance}}</el-col>
                <el-col>{{sumMarginBalance}}</el-col>
            </el-row>
        </div>
        <div class="table-body" ref="tableBody" :style="{height: tableBodyHeight}">
            <el-row type="flex" align="middle" v-for="item in filterAccountDListAssets" :key="item.asset">
                <el-col>
                    <div>{{item.asset}}</div>
                    <div class="small" :class="+tickers[`${item.asset}USDT`].P > 0 ? 'green' : 'red'">{{+tickers[`${item.asset}USDT`].c}}</div>
                    <div class="small" :class="+tickers[`${item.asset}USDT`].P > 0 ? 'green' : 'red'">{{tickers[`${item.asset}USDT`].P}}%</div>
                </el-col>
                <!-- <el-col>{{item.availableBalance}}</el-col> -->
                <!-- <el-col>{{item.crossUnPnl}}</el-col> -->
                <!-- <el-col>{{item.crossWalletBalance}}</el-col> -->
                <el-col :class="+item.lastFundingRate > 0 ? 'green' : 'red'">{{item.lastFundingRate}}</el-col>
                <el-col :class="+item.lastFundingCount > 0 ? 'green' : 'red'">
                    <div>{{item.lastFundingCount}}</div>
                </el-col>
                <!-- <el-col>{{item.maintMargin}}</el-col> -->
                <el-col>
                    <div>{{item.positionInitialMargin}}</div>
                </el-col>
                <el-col :class="getPremium(item) > 0 ? 'green' : 'red'">
                    <div>{{getPremium(item).toFixed(4) + '%'}}</div>
                </el-col>
                <el-col>
                    <div>{{item.maxWithdrawAmount}}</div>
                    <div class="small">{{getUSDT(item.maxWithdrawAmount, item)}}</div>
                </el-col>
                <!-- <el-col>{{item.openOrderInitialMargin}}</el-col> -->
                <!-- <el-col>{{item.positionInitialMargin}}</el-col> -->
                <el-col>
                    <div :class="+item.unrealizedProfit > 0 ? 'green' : 'red'">{{item.unrealizedProfit}}</div>
                    <div class="small">{{getUSDT(item.unrealizedProfit, item)}}</div>
                </el-col>
                <el-col>
                    <div>{{item.walletBalance}}</div>
                    <div class="small">{{getUSDT(item.walletBalance, item)}}</div>
                </el-col>
                <el-col>
                    <div>{{item.marginBalance}}</div>
                    <div class="small">{{getUSDT(item.marginBalance, item)}}</div>
                </el-col>
            </el-row>
        </div>
        </div>
        <div class="hidden-md-and-up" ref="tableBody" :style="{height: tableBodyHeight}">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>總計</span>
                </div>
                <div class="card-body">
                    <div class="item">
                        <el-row type="flex">
                            <el-col>未實現盈虧</el-col>
                            <el-col>{{sumUnrealizedProfit}}</el-col>
                        </el-row>
                    </div>
                    <div class="item" >
                        <el-row type="flex">
                            <el-col>錢包</el-col>
                            <el-col>{{sumWalletBalance}}</el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row type="flex">
                            <el-col>總資產</el-col>
                            <el-col>{{sumMarginBalance}}</el-col>
                        </el-row>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card" v-for="item in filterAccountDListAssets" :key="item.asset">
                <el-row class="card-header" type="flex" slot="header" >
                    <el-col>
                        <span>{{item.asset}}</span>
                        <span class="small" :class="+tickers[`${item.asset}USDT`].P > 0 ? 'green' : 'red'">{{+tickers[`${item.asset}USDT`].c}}</span>
                        <span class="small" :class="+tickers[`${item.asset}USDT`].P > 0 ? 'green' : 'red'">{{tickers[`${item.asset}USDT`].P}}%</span>
                    </el-col>
                    <el-col class="card-head_right right">
                        <router-link :to="{name: 'Income', query: {symbol: `${item.asset}USD_PERP`}}"><el-button type="text">歷史流水</el-button></router-link>
                        <router-link :to="{name: 'FundingRate', query: {symbol: `${item.asset}USD_PERP`}}"><el-button type="text">歷史費率</el-button></router-link>
                    </el-col>
                </el-row>
                <div class="card-body">
                    <div class="item">
                        <el-row type="flex">
                            <el-col>即時費率</el-col>
                            <el-col :class="+item.lastFundingRate > 0 ? 'green' : 'red'">{{item.lastFundingRate}}</el-col>
                        </el-row>
                    </div>
                    <div class="item" >
                        <el-row type="flex">
                            <el-col>預估套利</el-col>
                            <el-col :class="+item.lastFundingCount > 0 ? 'green' : 'red'">{{item.lastFundingCount}}</el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row type="flex">
                            <el-col>保證金</el-col>
                            <el-col>{{item.positionInitialMargin}}</el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row type="flex" align="middle">
                            <el-col>期現價差(USDT/USD)</el-col>
                            <el-col>
                                <div :class="getPremium(item) > 0 ? 'green' : 'red'">{{getPremium(item).toFixed(4) + '%'}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row type="flex" align="middle">
                            <el-col>可用金</el-col>
                            <el-col>
                                <div>{{item.maxWithdrawAmount}}</div>
                                <div class="small">{{getUSDT(item.maxWithdrawAmount, item)}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row type="flex" align="middle">
                            <el-col>未實現盈虧</el-col>
                            <el-col>
                                <div :class="+item.unrealizedProfit > 0 ? 'green' : 'red'">{{item.unrealizedProfit}}</div>
                                <div class="small">{{getUSDT(item.unrealizedProfit, item)}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row type="flex" align="middle">
                            <el-col>錢包</el-col>
                            <el-col>
                                <div :class="+item.walletBalance > 0 ? 'green' : 'red'">{{item.walletBalance}}</div>
                                <div class="small">{{getUSDT(item.walletBalance, item)}}</div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="item">
                        <el-row type="flex" align="middle">
                            <el-col>總資產</el-col>
                            <el-col>
                                <div :class="+item.marginBalance > 0 ? 'green' : 'red'">{{item.marginBalance}}</div>
                                <div class="small">{{getUSDT(item.marginBalance, item)}}</div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import Dashboard from '@M/Dashboard'
import Table from '@C/Table'
import { createNamespacedHelpers, mapGetters as rootGetters } from 'vuex'
const name = 'Dashboard'
const path = `${name}/`
const { mapActions, mapGetters } = createNamespacedHelpers(path)
export default {
    name,
    mixins: [Table],
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
            'filterAccountDListAssets',
            'tickers',
            'tickers2'
        ]),
        sumUnrealizedProfit() {
            return this.filterAccountDListAssets.reduce((a, b) => a + (b.unrealizedProfit * (this.tickers[`${b.asset}USDT`] || {}).c || 0), 0).strip().toFixed(4) + ' USDT'
        },
        sumWalletBalance() {
            return this.filterAccountDListAssets.reduce((a, b) => a + (b.walletBalance * (this.tickers[`${b.asset}USDT`] || {}).c || 0), 0).strip().toFixed(4) + ' USDT'
        },
        sumMarginBalance() {
            return this.filterAccountDListAssets.reduce((a, b) => a + (b.marginBalance * (this.tickers[`${b.asset}USDT`] || {}).c || 0), 0).strip().toFixed(4) + ' USDT'
        }
    },
    methods: {
        ...mapActions([
            _M.FETCH,
            _M.RESET
        ]),
        getUSD(num, {usdPrice}) {
            return (num * usdPrice).strip().toFixed(4) + ' USD'
        },
        getUSDT(num, {asset}) {
            if (this.tickers[`${asset}USDT`]) {
                const usdtPrice = this.tickers[`${asset}USDT`].c
                return (num * usdtPrice).strip().toFixed(4) + ' USDT'
            }
            return ''
        },
        getPremium({asset}) {
            if (this.tickers[`${asset}USDT`] && this.tickers2[`${asset}USD_PERP`]) {
                const usdtPrice = this.tickers[`${asset}USDT`].c
                const usdPrice = this.tickers2[`${asset}USD_PERP`].c
                const diff = usdtPrice - usdPrice
                const premium = (diff / usdPrice * 100)
                return premium
            }
            return 0
        }
    }
}
</script>
