(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{"81cJ":function(t,e,a){"use strict";a.r(e);var s=a("z0IP").a,l=a("KHd+"),i=Object(l.a)(s,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard"},[a("div",{staticClass:"hidden-sm-and-down"},[a("el-row",{staticClass:"table-head",attrs:{type:"flex"}},[a("el-col",[t._v("資產種類")]),t._v(" "),a("el-col",[t._v("即時費率")]),t._v(" "),a("el-col",[t._v("預估套利")]),t._v(" "),a("el-col",[t._v("保證金")]),t._v(" "),a("el-col",[t._v("可用金")]),t._v(" "),a("el-col",[t._v("未實現盈虧")]),t._v(" "),a("el-col",[t._v("錢包")]),t._v(" "),a("el-col",[t._v("總資產")])],1),t._v(" "),a("div",{staticClass:"table-head"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("總計")]),t._v(" "),a("el-col"),t._v(" "),a("el-col"),t._v(" "),a("el-col"),t._v(" "),a("el-col"),t._v(" "),a("el-col",[t._v(t._s(t.sumUnrealizedProfit))]),t._v(" "),a("el-col",[t._v(t._s(t.sumWalletBalance))]),t._v(" "),a("el-col",[t._v(t._s(t.sumMarginBalance))])],1)],1),t._v(" "),a("div",{ref:"tableBody",staticClass:"table-body",style:{height:t.tableBodyHeight}},t._l(t.filterAccountDListAssets,(function(e){return a("el-row",{key:e.asset,attrs:{type:"flex",align:"middle"}},[a("el-col",[t._v(t._s(e.asset))]),t._v(" "),a("el-col",{class:+e.ddd>0?"green":"red"},[t._v(t._s(e.ddd))]),t._v(" "),a("el-col",{class:+e.ccc>0?"green":"red"},[a("div",[t._v(t._s(e.ccc))])]),t._v(" "),a("el-col",[a("div",[t._v(t._s(e.positionInitialMargin))])]),t._v(" "),a("el-col",[a("div",[t._v(t._s(e.maxWithdrawAmount))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.maxWithdrawAmount,e)))])]),t._v(" "),a("el-col",{class:+e.unrealizedProfit>0?"green":"red"},[a("div",[t._v(t._s(e.unrealizedProfit))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.unrealizedProfit,e)))])]),t._v(" "),a("el-col",[a("div",[t._v(t._s(e.walletBalance))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.walletBalance,e)))])]),t._v(" "),a("el-col",[a("div",[t._v(t._s(e.marginBalance))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.marginBalance,e)))])])],1)})),1)],1),t._v(" "),a("div",{ref:"tableBody",staticClass:"hidden-md-and-up",style:{height:t.tableBodyHeight}},[a("el-card",{staticClass:"box-card"},[a("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[a("span",[t._v("總資產")])]),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("未實現盈虧")]),t._v(" "),a("el-col",[t._v(t._s(t.sumUnrealizedProfit))])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("錢包")]),t._v(" "),a("el-col",[t._v(t._s(t.sumWalletBalance))])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("總資產")]),t._v(" "),a("el-col",[t._v(t._s(t.sumMarginBalance))])],1)],1)])]),t._v(" "),t._l(t.filterAccountDListAssets,(function(e){return a("el-card",{key:e.asset,staticClass:"box-card"},[a("el-row",{staticClass:"card-header",attrs:{slot:"header",type:"flex"},slot:"header"},[a("el-col",[t._v(t._s(e.asset))]),t._v(" "),a("el-col",{staticClass:"card-head_right right"},[a("router-link",{attrs:{to:{name:"Income",query:{symbol:e.asset+"USD_PERP"}}}},[a("el-button",{attrs:{type:"text"}},[t._v("歷史流水")])],1),t._v(" "),a("router-link",{attrs:{to:{name:"FundingRate",query:{symbol:e.asset+"USD_PERP"}}}},[a("el-button",{attrs:{type:"text"}},[t._v("歷史費率")])],1)],1)],1),t._v(" "),a("div",{staticClass:"card-body"},[a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("即時費率")]),t._v(" "),a("el-col",{class:+e.ddd>0?"green":"red"},[t._v(t._s(e.ddd))])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("預估套利")]),t._v(" "),a("el-col",{class:+e.ccc>0?"green":"red"},[t._v(t._s(e.ccc))])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("保證金")]),t._v(" "),a("el-col",[t._v(t._s(e.positionInitialMargin))])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("可用金")]),t._v(" "),a("el-col",[a("div",[t._v(t._s(e.maxWithdrawAmount))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.maxWithdrawAmount,e)))])])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("未實現盈虧")]),t._v(" "),a("el-col",[a("div",{class:+e.unrealizedProfit>0?"green":"red"},[t._v(t._s(e.unrealizedProfit))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.unrealizedProfit,e)))])])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("錢包")]),t._v(" "),a("el-col",[a("div",{class:+e.walletBalance>0?"green":"red"},[t._v(t._s(e.walletBalance))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.walletBalance,e)))])])],1)],1),t._v(" "),a("div",{staticClass:"item"},[a("el-row",{attrs:{type:"flex"}},[a("el-col",[t._v("總資產")]),t._v(" "),a("el-col",[a("div",{class:+e.marginBalance>0?"green":"red"},[t._v(t._s(e.marginBalance))]),t._v(" "),a("div",{staticClass:"small"},[t._v(t._s(t.getUSD(e.marginBalance,e)))])])],1)],1)])],1)}))],2)])}),[],!1,null,null,null);e.default=i.exports},B0gq:function(t,e,a){"use strict";var s=a("qMPU").a,l=a("KHd+"),i=Object(l.a)(s,void 0,void 0,!1,null,null,null);e.a=i.exports},qMPU:function(t,e,a){"use strict";(function(t){var s=a("QmAe");e.a={name:"Table",data:function(){return{tableBodyHeight:""}},mounted:function(){var t=this;window.addEventListener("resize",this.resizeContainer,!1),this.$nextTick((function(){var e=window.innerHeight-t.$refs.tableBody.getBoundingClientRect().top;t.tableBodyHeight=e+"px"}))},beforeDestroy:function(){window.removeEventListener("resize",this.resizeContainer,!1)},methods:{resizeContainer:function(){var t=window.innerHeight-this.$refs.tableBody.getBoundingClientRect().top;this.tableBodyHeight=t+"px"},formatNumber:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return Object(s.a)(t)},formatNumberDefaultZero:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=Object(s.a)(t);return 0==+e?0:e},formatNumberNoZero:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=Object(s.a)(t);return 0==+e?"":e},getDate:function(e){return t(e).format("YYYY-MM-DD  hh:mm:ss")}}}}).call(this,a("wd/R"))},vbGu:function(t,e,a){"use strict";(function(t){var s,l=a("VyMG");function i(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function r(t,e){var a={};for(var s in t)e.indexOf(s)>=0||Object.prototype.hasOwnProperty.call(t,s)&&(a[s]=t[s]);return a}var n=(i(s={},t.FETCH,(function(t,e){var a,s=this;return(a=regeneratorRuntime.mark((function a(){var i,n,o;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return i=e.key,n=r(e,["key"]),a.next=3,l[i](t,n);case 3:return o=a.sent,a.abrupt("return",o);case 5:case"end":return a.stop()}}),a,s)})),function(){var t=a.apply(this,arguments);return new Promise((function(e,a){return function s(l,i){try{var r=t[l](i),n=r.value}catch(t){return void a(t)}if(!r.done)return Promise.resolve(n).then((function(t){s("next",t)}),(function(t){s("throw",t)}));e(n)}("next")}))})()})),i(s,t.RESET,(function(t){t.commit})),i(s,t.SET_TEMP_DATA,(function(e,a){(0,e.commit)(t.SET_TEMP_DATA,a)})),s),o=i({},t.SET_TEMP_DATA,(function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t[e.temp]=e.data}));e.a={namespaced:!0,state:{},actions:n,mutations:o,getters:{}}}).call(this,a("JCdI"))},z0IP:function(t,e,a){"use strict";(function(t){var s=a("vbGu"),l=a("B0gq"),i=a("L2JU"),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s])}return t},n="Dashboard",o=Object(i.a)("Dashboard/"),c=o.mapActions;o.mapGetters;e.a={name:n,mixins:[l.a],beforeMount:function(){this.$root.$emit("setStore",{Dashboard:s.a})},beforeDestroy:function(){this[t.RESET](),this.$root.$emit("unSetStore",n)},computed:r({},Object(i.d)(["filterAccountDListAssets"]),{sumUnrealizedProfit:function(){return this.filterAccountDListAssets.reduce((function(t,e){return t+e.unrealizedProfit*e.usdPrice}),0).strip().toFixed(4)+" USD"},sumWalletBalance:function(){return this.filterAccountDListAssets.reduce((function(t,e){return t+e.walletBalance*e.usdPrice}),0).strip().toFixed(4)+" USD"},sumMarginBalance:function(){return this.filterAccountDListAssets.reduce((function(t,e){return t+e.marginBalance*e.usdPrice}),0).strip().toFixed(4)+" USD"}}),methods:r({},c([t.FETCH,t.RESET]),{getUSD:function(t,e){return(t*e.usdPrice).strip().toFixed(4)+" USD"}})}}).call(this,a("JCdI"))}}]);