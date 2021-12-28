<template>
  <div class="login-container">
    <el-form method="POST" ref="form" :model="form" :rules="loginRules" class="login-form" autocomplete="on">
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <el-form-item prop="API_KEY">
        <span class="svg-container">
          <i class="el-icon-s-custom" />
        </span>
        <el-input
          ref="API_KEY"
          v-model="form.API_KEY"
          placeholder="API_KEY"
          name="API_KEY"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-form-item prop="API_SECRET">
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          ref="API_SECRET"
          v-model="form.API_SECRET"
          :type="API_SECRETType"
          placeholder="API_SECRET"
          name="API_SECRET"
          tabindex="2"
          autocomplete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <i :class="API_SECRETType === 'API_SECRET' ? 'el-icon-lock' : 'el-icon-unlock'" />
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
        >Login
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'Login',
    data() {
        const message = this.$t('Incomplete input')
        // 驗證規則-必填
        const required = { required: true, trigger: 'blur', message }

        // 驗證-至少六字
        const moreThenSix = (rule, value, callback) => {
            const isOk = value.length >= 6
            isOk
                ? callback()
                : callback(new Error(this.$t('Validation.PassNeed6')))
        }
        return {
            form: {
                API_KEY: '',
                API_SECRET: ''
            },
            loginRules: {
                API_KEY: [required],
                API_SECRET: [
                    required,
                    { trigger: 'blur', validator: moreThenSix }
                ]
            },
            API_SECRETType: 'API_SECRET',
            loading: false,
            showDialog: false,
            redirect: undefined,
            otherQuery: {}
        }
    },
    mounted() {
        if (this.form.API_KEY === '') {
            this.$refs.API_KEY.focus()
        } else if (this.form.API_SECRET === '') {
            this.$refs.API_SECRET.focus()
        }
    },
    methods: {
        ...mapActions([
            _M.FETCH_LOGIN
        ]),
        showPwd() {
            this.API_SECRETType = this.API_SECRETType === 'API_SECRET' ? '' : 'API_SECRET'
            this.$nextTick(() => {
                this.$refs.API_SECRET.focus()
            })
        },
        handleLogin() {
            const form = this.$refs.form
            form.validate(async (valid) => {
                if (valid) {
                    this.loading = true
                    const isLogining = await this[_M.FETCH_LOGIN](this.form)
                    isLogining && this.$router.replace('/')
                    this.loading = false
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }
    },
    computed: {
        ...mapGetters([
            'isDev'
        ])
    }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 260px 35px 0;
    margin: 0 auto;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>