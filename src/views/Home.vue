<template>
  <div id="home">
    <div @click="navTo('/dialog')">
      dialog
    </div>
    <div @click="navTo('/btn')">
      btn
    </div>
    <div @click="navTo('/picker')">
      picker
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted() {
    },
    methods: {
      navTo(path) {
        this.$router.push({
          path: path
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  #home {
  }
</style>
