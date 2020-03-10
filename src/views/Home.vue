<template>
  <div id="home">
    <div @click="navTo('/dialog')">
      弹框 - dialog >
    </div>
    <div @click="navTo('/btn')">
      按钮 - btn >
    </div>
    <div @click="navTo('/picker')">
      选择器 - picker >
    </div>
    <div @click="navTo('/input')">
      输入框 - input >
    </div>
  </div>
</template>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    console.log('DOMContentLoaded');
  });

  window.onload = function(){
    console.log('window.onload');
  }

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
