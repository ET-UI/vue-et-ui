<template>
  <div id="btn">
    <Btn @click="bindClick">normal</Btn>
    <Btn @click="bindClick" type="disabled">disabled</Btn>
  </div>
</template>

<script>
  import {Btn} from '@/components/index'

  export default {
    components: {
      Btn
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
