<template>
  <el-container ref="cont">
    <el-main class="main">
      <transition name="fade-transform" mode="out-in">
        <router-view />
      </transition>
    </el-main>
  </el-container>
</template>
<style lang="scss" scoped>
.main {
  ::v-deep .main-bg {
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 11px #e9e9e9;
  }
}
</style>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Main',
    computed: {
        ...mapGetters([
            'isLoading'
        ]),
        isBreadcrumb() {
            return this.$route.name !== 'Dashboard'
        }
    }
}
</script>
