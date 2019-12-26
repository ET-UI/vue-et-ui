<template>
  <div class="et-dialog" v-if="show" :class="{'et-dialog--white':type==='white'}">
    <div class="et-dialog__mask" @click="!showClose?close():''">

    </div>
    <div class="et-dialog__inner">
      <slot></slot>
    </div>
    <div class="et-dialog__close" v-if="showClose" @click.stop="close()">
      <img src="@/assets/images/icon-close-gray.png" alt="" v-if="type==='white'">
      <img src="@/assets/images/icon-close.png" alt="" v-else>
    </div>
  </div>
</template>

<script>
  export default {
    name: "et-dialog",
    props: {
      showClose: {
        type: Boolean,
        default: false,
      },
      show: {
        type: Boolean,
        default: false,
      },
      //类型，normal普通，white白色
      type: {
        type: String,
        default: "normal",
      }
    },
    data() {
      return {}
    },
    methods: {
      display() {
        this.$emit('update:show', true);
      },
      close() {
        this.$emit('update:show', false);
        this.$emit('close');
      }
    },
  }
</script>

<style lang="scss" scoped>
  .et-dialog {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    z-index: 1001;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: rgba(0, 0, 0, 0.7);
    }
    &__inner {
      position: relative;
      z-index: 1002;
      max-width: 100%;
    }
    &__close {
      margin-top: 20px;
      position: relative;
      z-index: 1002;
      img {
        width: 66px;
      }
    }
    &--white {
      .et-dialog__mask {
        background: #fff;
      }
    }
  }
</style>