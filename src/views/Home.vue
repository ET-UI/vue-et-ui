<template>
  <div id="home">
    <div>
      <a href="javascript:;" @click="navTo('/dialog')">dialog</a>
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

<style scoped>
</style>
