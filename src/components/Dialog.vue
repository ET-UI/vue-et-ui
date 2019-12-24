<template>
  <div class="et-dialog" v-if="show">
    <div class="et-dialog__mask" @click="hideClose?close():''">

    </div>
    <div class="et-dialog__inner">
      <slot></slot>
    </div>
    <div class="et-dialog__close" v-if="!hideClose" @click.stop="close()">
      <img src="@/assets/images/icon_close.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "et-dialog",
    props: {
      hideClose: {
        type: Boolean,
        default: false,
      },
      show: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {}
    },
    methods: {
      close() {
        this.$emit('update:show', false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-dialog {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
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
        width: 56px;
      }
    }
  }
</style>