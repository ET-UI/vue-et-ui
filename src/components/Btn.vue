<template>
  <div class="et-btn"
       @click.stop="bindClick"
       :class="[
         type?`et-btn--${type}`:'',
         size?`et-btn--${size}`:'',
         shape?`et-btn--${shape}`:'',
         __disabled?`et-btn--disabled`:'',
       ]">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "et-btn",
    props: {
      //类型，不填/normal普通，disabled不可用，hollow镂空，grey灰色，black黑色
      type: {
        type: String,
        default: "normal"
      },
      //尺寸，不填/large，big，middle，small
      size: {
        type: String,
        default: "large"
      },

      //形状，不填/circular圆形，rectangle矩形
      shape: {
        type: String,
        default: "circular"
      },

      //不可用
      disabled: {}
    },
    data() {
      return {}
    },
    methods: {
      bindClick() {
        this.$emit("click");
      }
    },
    computed: {
      __disabled() {
        if(this.disabled===''){
          return 1;
        }
        return JSON.parse(this.disabled || 0);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-btn {
    font-size: 32px;
    height: 98px;
    line-height: 98px;
    text-align: center;
    background: #f1cf92;
    box-sizing: border-box;
    border-radius: 80px;
    &:active {
      -webkit-filter: brightness(0.9);
      filter: brightness(0.9);
    }
    /*样式*/
    &--hollow {
      color: #d1a86a;
      background-color: transparent;
      border: 2px solid #D1A86A;
      &:active {
        -webkit-filter: brightness(1);
        filter: brightness(1);
        background-color: #F6EEE1;
      }
      &.et-btn--disabled {
        border: 4px solid #f5f5f5;
        background-color: #F9F9F9;
        color: #ebebeb;
      }
    }
    &--grey {
      color: #222;
      background-color: transparent;
      border: 2px solid #e4e4e4;
      &:active {
        -webkit-filter: brightness(1);
        filter: brightness(1);
        background-color: #fbfbfb;
      }
      &.et-btn--disabled {
        border: 4px solid #f5f5f5;
        background-color: #F9F9F9;
        color: #ebebeb;
      }
    }
    &--black {
      color: #ffffff;
      background-color: #222222;
    }
    &--disabled {
      color: #fff;
      background-color: #e4e4e4;
    }
    /*尺寸*/
    &--big, &--middle, &--small {
      display: inline-block;
    }
    &--big {
      height: 76px;
      line-height: 76px;
      font-size: 30px;
      padding: 0 65px;
    }
    &--middle {
      height: 58px;
      line-height: 58px;
      font-size: 26px;
      padding: 0 53px;
    }
    &--small {
      height: 40px;
      line-height: 40px;
      font-size: 25px;
      padding: 0 33px;
    }
    /*形状*/
    &--rectangle {
      border-radius: 0;
    }
  }
</style>