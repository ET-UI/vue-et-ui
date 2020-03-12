<template>
  <div class="et-switch"
       :class="{
        'et-switch--checked': cVal,
        'et-switch--disabled': __disabled,
       }"
       @click.stop="handleClick">
    <div class="et-switch-btn">

    </div>
  </div>
</template>

<script>
  export default {
    name: "et-switch",
    props: {
      //值
      value: {
        type: Boolean,
        default: false,
      },
      //不可用
      disabled: {},
    },
    data() {
      return {
        cVal: this.value,
      }
    },
    mounted() {
    },
    methods: {
      handleClick() {
        if (!this.__disabled && !this.__readonly) {
          this.cVal = !this.cVal;
        }
      }
    },
    watch: {
      value(n) {
        this.cVal = n;
      },
      cVal(n) {
        this.$emit('input', n);
      },
    },
    computed: {
      __disabled() {
        if (this.disabled === '') {
          return 1;
        }
        return JSON.parse(this.disabled || 0);
      },
    }
  }
</script>

<style lang="scss" scoped>
  .et-switch {
    width: 88px;
    height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #EBEBEB;
    border-radius: 100px;
    transition: background-color 0.3s;
    &-btn {
      width: 38px;
      height: 38px;
      background-color: #ffffff;
      border-radius: 100px;
      position: relative;
      transition: left 0.3s;
      left: -20px;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3);
    }
    &--checked {
      background-color: #28BC93;
      .et-switch-btn {
        left: 20px;
      }
    }
    &--disabled {
      opacity: .6;
    }
  }
</style>