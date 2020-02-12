<template>
  <div class="et-btn" @click.stop="bindClick" :class="{'et-btn--disabled':type==='disabled', 'et-btn--hollow':type==='hollow'}">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "et-btn",
    props: {
      //类型，不填/normal：普通，disabled：不可用，hollow：镂空
      type: {
        type: String,
        default: "normal"
      },
      size: {
        type: String,
      }
    },
    data() {
      return {}
    },
    methods: {
      bindClick() {
        this.$emit("click");
      }
    },
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
    &--disabled {
      color: #fff;
      background-color: #e4e4e4;
      border-color: #e4e4e4;
    }
    &--hollow{
      color: #d1a86a;
      background-color: transparent;
      border: 2px solid #f1cf92;
    }
    &:active {
      -webkit-filter: brightness(0.9);
      filter: brightness(0.9);
    }
  }
</style>