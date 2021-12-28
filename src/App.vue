<template>
    <div>
        <router-view />
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'app',
    beforeMount() {
        this.$root.$on('setStore', this.setStore)
        this.$root.$on('unSetStore', this.unSetStore)
    },
    methods: {
        ...mapActions([
        ]),
        setStore(storeObj) {
            Object.keys(storeObj).forEach((name) => {
                if (!this.$store._modules.root.getChild(name)) {
                    this.$store.registerModule(name, storeObj[name])
                }
            })
        },
        unSetStore(storeArr) {
            if (!Array.isArray(storeArr)) {
                storeArr = [storeArr]
            }
            storeArr.forEach((name) => {
                if (this.$store._modules.root.getChild(name)) {
                    this.$store.unregisterModule(name)
                }
            })
        }
    }
}
</script>
