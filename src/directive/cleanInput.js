import { floatPatternSoft, integerPattern, integerAndEnglishPatternSoft, floatPatternSoftNega } from '@UTIL/pattern'

export default {
    /**
     * 更新後觸發
     * @param {String} binding.arg 自訂參數
     * @param {String} binding.expression 綁定值的字串
     * @param {String} binding.modifiers 修飾符
     * @param {String} binding.value [value-String] 綁定對象的值
     * @param {String} binding.oldValue 綁定對象更新前的值
     * @param {String} value.val [value-Object] 綁定對象的值
     * @param {Function} value.setVal [value-Object] 設定值的方法
     * @param {Function} value.cb [value-Object] callback
     */
    update: (el, binding, vnode) => {
        const { oldValue: o, value: v, expression, arg, modifiers } = binding
        const _this = vnode.context

        // 設定oldValue/value, 有兩種型態(Object/String)
        let inputObj, oldValue
        if (typeof v === 'object') {
            oldValue = o.val
            inputObj = v
        } else {
            oldValue = `${o || ''}`
            let obj = {
                val: `${v}`,
                setVal: (theVal = oldValue) => {
                    // ex: form.wd_rate
                    const [theForm, col] = expression.split('.')
                    _this.$set(_this[theForm], col, theVal)
                }
            }
            inputObj = obj
        }
        const value = inputObj.val
        // 空值不檢查
        if (!v || !value) return

        //小數點前的位數限制
        const digitMode = {
            tiny: 2,
            short: 4,
            mid: 6,
            long: 8,
            money: 11,
            default: 20
        }
        const key = Object.keys(modifiers)[0] || 'default'
        const digit = digitMode[key] || +key

        _this.$nextTick(() => {
            let valid = true
            // 整數:只允許輸入數字
            if (arg === 'int') {
                // 最後輸入數
                valid = integerPattern.test(value.replace(/,/g, '')) // 過濾掉","
            } else if (arg === 'float') {
                // 小數:只允許輸入數字&小數點, 且小數點只有一個
                valid = floatPatternSoft.test(value.replace(/,/g, '')) // 過濾掉","
            } else if (arg === 'floatNega') {
                // 小數(含負數):只允許輸入數字/小數點/負號, 且小數點/負號只有一個
                valid = floatPatternSoftNega.test(value.replace(/,/g, '')) // 過濾掉","
            } else if (arg === 'inteng') {
                valid = integerAndEnglishPatternSoft.test(value)
            }
            // 超過位數 (整數位數, 小數位數)
            const [intNum = '', floatNum = ''] = value.split('.')
            if (intNum.replace(/,/g, '').length > digit || floatNum.replace(/,/g, '').length > 6) {
                valid = false
            }

            // 有金額的欄位都要過濾","
            const amountArr = ['int', 'float', 'floatNega']
            const comaOff = value.replace(/,/g, '')
            if (!valid) {
                // 只要不合法就還原回舊值
                inputObj.setVal(oldValue)
            } else if (amountArr.includes(arg) && value !== comaOff) {
                // 合法狀態下, 如果是 amountArr 則去除逗點
                inputObj.setVal(comaOff)
            }

            // callback
            if (inputObj.cb) {
                inputObj.cb(valid ? value : oldValue)
            }
        })
    }
}
