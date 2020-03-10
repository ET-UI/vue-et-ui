<template>
  <div id="app" v-cloak>
    <router-view />
  </div>
</template>

<script>
  import 'etccb-flexible'

  export default {
    name: 'app',
  }
</script>

<style scoped>
  @import '~@/assets/css/normalize.css';
  #app[v-cloak] {
    display: none;
  }
</style>
