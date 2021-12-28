<style lang="scss">
.el-icon-question {
    cursor: pointer;
    color: #4bcf99;
    font-size: 24px;
    position: relative;
    top: 4px;
}
</style>
<script>
import { returnState, formatNumber } from '@UTIL'
import { mapActions, mapGetters } from 'vuex'
/**
 * 這幾個dialog是特例(沒有套用這支dialog)
 * 充值-更新;代付詳情-重試;子代付-重試;下發詳情-重試;
 */
export default {
    name: 'DialogMix',
    props: {
        visbileName: String
    },
    data() {
        return {
            selectWidth: 'width: 95%',
            form: {},
            resetForm: {},
            loading: false
        }
    },
    beforeMount() {
        this.resetForm = this.form && returnState(this.form)
    },
    watch: {
        // 驗證規則改變時會觸發重新驗證, 所以清空避免空欄位紅字
        rules() {
            this.$nextTick(() => {
                this.$refs.form && this.$refs.form.clearValidate()
            })
        }
    },
    computed: {
        // 這是rootGetter
        ...mapGetters([
            'currency',
            'errors'
        ]),
        id() {
            return this.$route.params.id || -1
        }
    },
    methods: {
        ...mapActions([
            _M.SET_TEMP_DATA
        ]),
        formatNumber(row, column, cellValue = '') {
            return formatNumber(cellValue)
        },
        reset() {
            this.form = returnState(this.resetForm)
            this.$refs.form && this.$refs.form.resetFields()
            // 重置全域error
            this[_M.SET_TEMP_DATA]({ temp: 'errors', data: {} })
        },
        // 驗證通過,資料送出前
        beforeFormSubmit() {},
        handleSubmit() {
            // 避免紅框error無法顯示
            this[_M.SET_TEMP_DATA]({ temp: 'errors', data: {} })

            const form = this.$refs.form
            form.validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.beforeFormSubmit()
                    this[_M.FETCH](this.form)
                        .then((res) => {
                            if (!!res) {
                                this.handleUpdateView(res.data)
                                this.handleCancel()
                            }
                            this.loading = false
                        })
                }
            })
        },
        handleUpdateView() {
            this.$root.$emit('search')
        },
        handleCancel() {
            this.$parent[this.visbileName] = false
        },
        handleInstructions() {
            this.$parent.dialogInstructions = true
        }
    }
}
</script>
