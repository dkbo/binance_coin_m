<template>
    <el-collapse @change="resizeTable" v-model="collapse" class="descriptionCard">
        <el-collapse-item :title="$t('Sd.Step_description')" name="1" ref="collapseItim">
            <ul :class="{is_column: sdListArr.length > 3}">
                <li v-for="(data, index) in sdListArr">
                    <div class="step">
                        <!-- <span>{{$t('Sd.Step')}}</span> -->
                        <span>{{index + 1}}</span>
                    </div>
                    <span>{{$t(`Sd.${data}`)}}</span>
                </li>
            </ul>
        </el-collapse-item>
    </el-collapse>
</template>
<style lang="scss">
   .descriptionCard {
        color: #333333;
        display: inline-block;
        vertical-align: top;    
        font-size: 12px;
        border-left: 2px solid #85ce36;
        padding: 0.5em 1.2em;
        &.mt {margin-top: 10px;}
        &.mr {margin-right: 10px;}
        &.ml {margin-left: 10px;}
        &.mb {margin-bottom: 10px;}        
        .el-collapse-item {
            > :first-of-type {
                cursor: pointer;
                .el-collapse-item__arrow {
                    transform: rotate(0deg);
                    transition: 0.4s all;
                }
            }
            .el-collapse-item__wrap {
                .el-collapse-item__content {
                    padding-top: 10px;
                    line-height: 15px;
                    ul {
                        &.is_column {
                            // column-count: 4;
                            // column-rule: 1px solid #cccccc;
                            // column-gap: 40px;
                        }
                        li {
                            display: inline-block;
                            border: 1px solid transparent;
                            padding: 5px 10px 5px 30px;
                            position: relative;
                            border-radius: 50px;
                            margin-right: 3px;
                            margin-bottom: 3px;
                            &:hover {
                                box-shadow: 0 0 5px rgba(206, 206, 206, 0.4);
                            }
                            .step {
                                line-height: 25px;
                                width: 25px;
                                text-align: center;
                                display: block;
                                left: 0;
                                top: 0;
                                position: absolute;
                                span {
                                    background: #85CE36;
                                    color: #ffffff;
                                    display: block;
                                    width: 100%;
                                    font-size: 14px;
                                    border-radius: 50px;
                                }
                            }
                        }
                    }
                }
            }
            &.is-active {
                > :first-of-type {
                    .el-collapse-item__arrow {
                        &.is-active {
                            transform: rotate(90deg);
                            transition: 0.4s all;
                        }
                    }
                }
            }
        }
    }
</style>

<script>
export default {
    name: 'CollapseCart',
    data() {
        return {
            collapse: '1', // 預設：開 '1', 關''
            sdListPreset: [
                'Login_online_banking',
                'Choose_the_account_to_transfer_from',
                'Add_the_account_to_transfer_to',
                'Waiting_for_adding_account_OTP',
                'Verify_the_adding_account_OTP',
                'Transferring',
                'Waiting_for_OTP',
                'Submit_OTP',
                'Verify_OTP',
                'Return_result'
            ],
            thisLang: '',
            thisWidth: '',
            // 多語步驟長度變更用
            timer: null,
            // 展開縮放 table 高度重新計算
            timer2: null
        }
    },
    watch: {
        thisLang(v) {
            this.timer = setTimeout(() => {
                v === 'zh-CN' ? (this.thisWidth = 750) : (this.thisWidth = this.isWidth + 31)
            })
        }
    },
    beforeMount() {
        this.$root.$on('lang', this.isLang)
        clearTimeout(this.timer)
    },
    beforeDestroy() {
        this.$root.$off('lang', this.isLang)
    },
    props: {
        sdList: Array
    },
    methods: {
        isLang(v) {
            this.thisLang = v
        },
        resizeTable() {
            setTimeout(() => this.$root.$emit('resizeTable'), 450)
        }
    },
    computed: {
        sdListArr() {
            return this.sdList ? this.sdList : this.sdListPreset
        },
        isWidth() {
            return this.$refs.collapseItim.$el.offsetWidth
        }
    }
}
</script>
