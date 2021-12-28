<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="({meta: { bName, title, isRoute = true }, name, path}) in $route.matched"
        :key="path"
      >
        <span
          v-if="!isRoute || name === $route.name"
          class="no-redirect"
          :class="{'is_active': title !== 'Details' && name === $route.name}"
        >{{$t(bName || title)}}</span>
        <a
          v-else
          @click.prevent="handleLink(name)"
          :class="{'is_activeDetails': $route.meta.titleName && title === $route.meta.titleName[$route.meta.titleName.length - 1].replace('H. ','')}"
        >{{$t(bName || title)}}</a>
      </el-breadcrumb-item>
      </transition-group>
  </el-breadcrumb>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'
import '@CSS/pages/breadcrumb.scss'

export default {
    name: 'Breadcrumb',
    methods: {
        handleLink(name) {
            this.$router.replace({name})
        }
    }
}
</script>
