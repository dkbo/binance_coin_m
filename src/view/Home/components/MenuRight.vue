<template>
  <div class="right-menu">
      <!-- 设置 -->
      <el-dropdown
        trigger="click"
        :class="{is_active: isSettingActive}"
        @visible-change="settingsActive"
      >
        <div class="el-dropdown-link">
          <i class="el-icon-user-solid"></i>
          <!-- {{userName}} -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>
            <span style="display:block;">{{$t('Settings')}}</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item v-if="isShowUserListAdd" :class="{is_active: isRouter === 'Create User'}">
            <span v-if="this.$route.name === 'User List'"  style="display:block;"  @click="handleCreateUser"><i class="fas el-fa-user-plus"></i>{{$t('Create User')}}</span>
            <router-link v-else :to="getRouter('UserList?t=add')"><i class="fas el-fa-user-plus"></i>{{$t('Create User')}}</router-link>
           </el-dropdown-item>
          <el-dropdown-item v-if="isShowUserList" :class="{is_active: isRouter === 'User List'}">
            <router-link :to="getRouter('UserList')"><i class="fas el-fa-users"></i>{{$t('User List')}}</router-link>
          </el-dropdown-item>
          <el-dropdown-item v-if="isShowRole" :class="{is_active: isRouter === 'Role Permissions'}">
            <router-link :to="getRouter('RolePermissions')"><i class="fas el-fa-user-tag"></i>{{$t('Role Permissions')}}</router-link>
          </el-dropdown-item> -->
          <el-dropdown-item divided :class="{is_active: isRouter === 'Logout'}">
            <span style="display:block;" @click="logout"><i class="fas el-fa-sign-out-alt"></i>{{$t('Logout')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 語言 -->
      <el-select class="langSelect" v-model="$i18n.locale" size="mini" style="width: 100px;margin-left: 5px;">
        <el-option v-for="l in lang" :label="$t(l)" :value="l" :key="l" >
          <span style="display:block;" @click="handleChangLang(l)">{{$t(l)}}</span>
        </el-option>
      </el-select>
  </div>
</template>

<script>
import '@CSS/pages/menu_right.scss'
import virtualList from 'vue-virtual-scroll-list'
import { mapGetters as rootGetters, mapActions as rootActions } from 'vuex'
export default {
    name: 'MenuRight',
    data() {
        return {
            is_menuActive: false,
            isSettingActive: false
        }
    },
    components: {
        'virtual-list': virtualList
    },
    computed: {
        ...rootGetters([
            'userName',
            'permissions'
        ]),
        lang() {
            return Object.keys(this.$i18n.messages)
        },
        isRouter() {
            return this.$route.name
        }
    },

    methods: {
        ...rootActions([
            _M.SET_LANG,
            _M.FETCH_LOGOUT
        ]),
        handleChangLang(l) {
            this.$root.$emit('lang', l)
            this[_M.SET_LANG](l)
        },
        handleCreateUser() {
            this.$root.$emit('add')
        },
        logout() {
            this[_M.FETCH_LOGOUT]()
            this.$router.replace('login')
        },
        settingsActive(bool) {
            this.isSettingActive = bool
        }
    }
}
</script>