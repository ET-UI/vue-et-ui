<template>
  <div id="input">
    <h3>input组件</h3>
    <ETInput @input="input1" placeholder="Input组件" v-model="val"></ETInput>
    <hr>
    <ETInput placeholder="Input组件-密码" type="password" v-model="val2"></ETInput>
    <hr>
    <ETInput placeholder="Input组件-文本框" type="textarea" v-model="val3" rows="3"></ETInput>
    <hr>
  </div>
</template>

<script>
  import {ETInput} from '@/components/index'

  export default {
    components: {
      ETInput
    },
    name: 'view-input',
    data() {
      return {
        val: '',
        val2: '',
        val3: '',
      }
    },
    mounted() {

    },
    methods: {
      input1(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="scss" scoped>
  #input {
  }
</style>
