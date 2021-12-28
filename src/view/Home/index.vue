<template>
<el-container class="container">
    <Header />
    <Aside />
    <Breadcrumb v-show="isBreadcrumb" />
    <Main />
</el-container>
</template>
<style>
    .container {
        /* min-height: calc(100vh - 149px); */
        flex-direction: column;
    }

</style>
<script>
import { mapActions, mapGetters } from 'vuex'
import Header from './components/Header'
import Aside from './components/Aside'
import Breadcrumb from './components/Breadcrumb'
import Main from './components/Main'
export default {
    name: 'Home',
    components: {
        Header,
        Aside,
        Breadcrumb,
        Main
    },
    computed: {
        ...mapGetters([
        ]),
        isBreadcrumb() {
            return this.$route.name !== 'Dashboard'
        }
    },
    methods: {
        ...mapActions([
        ])
    }
}
</script>
