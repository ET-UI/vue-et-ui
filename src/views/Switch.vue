<template>
  <div id="switch-view">
    <div>
      <ETSwitch v-model="val"></ETSwitch>{{val}}
    </div>
    <div>
      <ETSwitch v-model="val2"></ETSwitch>{{val2}}
    </div>
    <div>
      <ETSwitch v-model="val3" disabled></ETSwitch>{{val3}}不可用
      <ETSwitch v-model="val4" disabled></ETSwitch>{{val4}}不可用
    </div>
  </div>
</template>

<script>
  import {ETSwitch} from '@/components/index'

  export default {
    components: {
      ETSwitch
    },
    name: 'switch-view',
    mounted() {
    },
    data() {
      return {
        val: false,
        val2: true,
        val3: false,
        val4: true,
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  #switch-view {
  }
</style>
