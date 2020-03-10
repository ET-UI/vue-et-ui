<template>
  <div id="btn">
    <div class="title">
      类型 type
    </div>
    <ETBtn @click="bindClick">普通（默认） normal</ETBtn>
    <ETBtn @click="bindClick" type="disabled">不可用 disabled</ETBtn>
    <ETBtn @click="bindClick" type="hollow">镂空 hollow</ETBtn>
    <ETBtn @click="bindClick" type="grey">灰色 grey</ETBtn>
    <ETBtn @click="bindClick" type="black">黑色 black</ETBtn>


    <div class="title">
      不可用
    </div>
    <ETBtn @click="bindClick" disabled>普通 不可用 disabled</ETBtn>
    <ETBtn @click="bindClick" type="hollow" :disabled="true">镂空 不可用</ETBtn>
    <ETBtn @click="bindClick" type="grey" disabled="1">灰色 不可用</ETBtn>
    <ETBtn @click="bindClick" type="black" disabled="true">黑色 不可用</ETBtn>

    <div class="title">
      形状 shape
    </div>
    <ETBtn @click="bindClick">圆形（默认） circular</ETBtn>
    <ETBtn @click="bindClick" shape="rectangle">矩形 rectangle</ETBtn>

    <div class="title">
      尺寸 size
    </div>
    <ETBtn @click="bindClick">巨大尺寸（默认） large</ETBtn>
    <ETBtn @click="bindClick" size="big">大尺寸 big</ETBtn>
    <ETBtn @click="bindClick" size="middle">中尺寸 middle</ETBtn>
    <ETBtn @click="bindClick" size="small">小尺寸 small</ETBtn>

    <div class="title">
      混合使用
    </div>
    <ETBtn @click="bindClick" size="big" type="hollow" shape="rectangle">big hollow rectangle</ETBtn>
    <ETBtn @click="bindClick" size="middle" type="black" shape="rectangle" disabled>middle black rectangle disabled</ETBtn>

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
        // this.$toast("点击");
      }
    }
  }
</script>

<style lang="scss" scoped>
  #btn {
    padding: 20px;
    .title{
      margin-bottom: 20px;
      font-size: 32px;
    }
    .et-btn{
      margin-bottom: 20px;
    }
  }
</style>
