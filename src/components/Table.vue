<script>
import { formatNumber } from '@UTIL'
export default {
    name: 'Table',
    data() {
        return {
            tableBodyHeight: ''
        }
    },
    mounted() {
        window.addEventListener('resize', this.resizeContainer, false)
        this.$nextTick(() => {
            const height = window.innerHeight - this.$refs.tableBody.getBoundingClientRect().top
            this.tableBodyHeight = height + 'px'
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeContainer, false)
    },
    methods: {
        resizeContainer() {
            const height = window.innerHeight - this.$refs.tableBody.getBoundingClientRect().top
            this.tableBodyHeight = height + 'px'
        },
        formatNumber(cellValue = '') {
            return formatNumber(cellValue)
        },
        // 預設值為0
        formatNumberDefaultZero(cellValue = '') {
            const result = formatNumber(cellValue)
            return +result === 0 ? 0 : result
        },
        // 預設值為空
        formatNumberNoZero(cellValue = '') {
            const result = formatNumber(cellValue)
            return +result === 0 ? '' : result
        },
        getDate(time) {
            return moment(time).format('YYYY-MM-DD  hh:mm:ss')
        }
    }
}
</script>
