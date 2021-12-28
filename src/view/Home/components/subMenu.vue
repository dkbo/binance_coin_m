<template>
  <div>
    <template v-for="({children, path, name, notNav, meta: { isSuper, bName, title, key }}, index) in data">
      <el-submenu v-if="filterNav(children) && !notNav" :index="path">
        <template slot="title">
          <i :class="'fas el-fa-' + faIcon[index - 1]"></i>
          <span>{{$t(title)}}</span>
        </template>
        <subMenu :data="children" :rootIndex="`${rootIndex}${path}/`" />
      </el-submenu>
      <template v-else>
        <el-menu-item  v-if="fitlerItem(notNav, isSuper, key, children)" :index="`${rootIndex}${path}`" @mousedown.native.prevent="handleMousedown($event.which, `${rootIndex}${path}`)">
          <i class="fas el-fa-tachometer-alt" v-if="title === 'Dashboard'"></i>
          <span>{{$t(title)}}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'subMenu',
    props: {
        data: Array,
        rootIndex: String
    },
    methods: {
        filterNav(data) {
            return (data || []).filter(({notNav, meta}) => !notNav && this.getIsView(meta)).length
        },
        fitlerItem(notNav, isSuper, key, children = []) {
            // notNav = false && 判別有無權限 && 選單位置是否在 root
            const condition = !notNav
            // 判別有無權限
            const condition2 = this.getIsView({key})
            // 選單位置是否在 root
            const condition3 = (this.rootIndex !== '/' || (this.rootIndex === '/' && !children.filter(({notNav}) => !notNav).length))
            // 是否超級權限
            const condition4 = (isSuper && this.SSuper_admin)
            return (condition && condition2 && condition3) || condition4
        },
        getIsView({key}) {
            if (!key) {
                return true
            }
            const data = this.permissions[key] || ''
            return data.split(',').indexOf('v') > -1
        },
        handleMousedown(which, url) {
            if (which === 2) {
                window.open(url, '_blank')
            }
        }
    },
    computed: {
        ...mapGetters([
            'permissions',
            'SSuper_admin'
        ]),
        faIcon() {
            return [
                '',
                'address-card',
                'search-dollar',
                'history',
                'file-alt',
                'university',
                'sms',
                'toolbox'
            ]
        }
    }
}
</script>
