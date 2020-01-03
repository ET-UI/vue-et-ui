<template>
  <div id="btn">
    <ETBtn @click="bindClick">normal</ETBtn>
    <ETBtn @click="bindClick" type="disabled">disabled</ETBtn>
  </div>
</template>

<script>
  import {ETBtn} from '@/components/index'

  export default {
    components: {
      ETBtn
    },
    name: 'btn',
    mounted() {

    },
    methods: {
      bindClick() {
        this.$toast("点击");
      }
    }
  }
</script>

<style lang="scss" scoped>
  #btn {
  }
</style>
