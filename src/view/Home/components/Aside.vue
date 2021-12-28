<template>
  <el-menu
      class="el-menu-horizontal"
      :default-active="$route.path"
      :collapse="isCollapse"
      collapse-transition
      :unique-opened="false"
      router
      mode="horizontal"
    >
      <SubMenu :data="navData" rootIndex="/" />
  </el-menu>
</template>
<style lang="scss">
  @import '~@CSS/mixin.scss';
  .el-submenu .el-menu-item, .el-menu-item {
    color: #ffffff;
    background-color: $subMenuBg;
    border-right: 5px solid transparent;
    &:hover {
      color: #ffffff;
      background-color: $subMenuHover;
    }
    &.is-active {
      border-right: 5px solid transparent;
      color: #ffffff;
    }
  }
  .el-menu-item, .el-submenu {
    float: left;
    display: block;
    i {
      color: rgba(255, 255, 255, 1);
      margin-left: 5px;
      position: relative;
      top: 0;
      right: 0;
      margin-top: 0;
      &.fas {
        font-size: 14px;
      }
    }
  }
  //title active
  .el-submenu.is-active .el-submenu__title,
  .el-submenu.is-active .el-submenu__title:hover,
  .el-submenu.is-active:hover .el-submenu__title,
  .el-menu-item.is-active,
  .el-menu-item.is-active:hover,
  .el-menu-item:hover {
    background-color: $subMenuHover !important;
    color: #ffffff !important;
    i.fas {
      color: #ffffff;
    }
  }
    // @media screen and (max-width: 700px) {
    .el-menu-horizontal {
      overflow-y: hidden;
      overflow-x: auto;
      white-space: nowrap;
      .el-menu-item, .el-submenu {
        float: none;
        display: inline-block;
      }
      .el-menu-item {
        display: inline-block;
      }
    }
  // }
</style>
<script>
import variables from '@CSS/elementUi/vars.scss'
import SubMenu from './SubMenu'
import { setStorage, getStorage } from '@UTIL'

export default {
    name: 'Aside',
    components: {
        SubMenu
    },
    data() {
        const { routes } = this.$router.options
        const navData = routes[1].children
        return {
            navData,
            variables,
            // is_router: 'Dashboard',
            isCollapse: !!+getStorage('collapse', false)
        }
    },
    computed: {
        isCollapseData: {
            set(boolean) {
                this.isCollapse = boolean
                setStorage('collapse', +boolean, false)
            },
            get() {
                return this.isCollapse
            }
        }
    }
}
</script>
