<template>
  <div class="et-input" :class="{'et-input--textarea':type=='textarea'}">
    <template v-if="type!='textarea'">
      <input :disabled="cDisabled"
             :readonly="cReadonly"
             :placeholder="placeholder"
             ref="input"
             @blur="blur"
             @focus="focus"
             :type="(type=='password' && !isShowCipher)?type:'text'"
             v-model="cVal" />
    </template>
    <template v-else>
      <textarea :disabled="cDisabled"
                ref="input"
                :readonly="cReadonly"
                :placeholder="placeholder"
                v-model="cVal" :rows="rows"></textarea>
    </template>
    <div v-if="type=='password' && cVal"
         @click.stop="showCipher"
         class="et-input__show">
      {{isShowCipher?'隐':'显'}}
    </div>
    <div v-if="cVal" class="et-input__reset" @click.stop="reset">
    </div>
  </div>
</template>

<script>
  export default {
    name: "et-input",
    props: {
      //类型，不填/input：输入框，password：密码框，textarea：文本框
      type: {
        type: String,
        default: "input"
      },
      disabled: {
        type: Boolean,
      },
      readonly: {
        type: Boolean,
      },
      placeholder: {
        type: String,
      },
      value: {},
      rows: {
        type: [Number, String]
      }
    },
    data() {
      return {
        cDisabled: false,
        cReadonly: false,
        cVal: false,
        isShowCipher: false,
      }
    },
    mounted() {
      this.cVal = this.value;
    },
    methods: {
      //基础事件
      blur() {
        this.$emit("blur");
      },
      focus() {
        this.$emit("focus");
      },

      //扩展事件
      //显示密文
      showCipher() {
        this.isShowCipher = !this.isShowCipher;
        this.$refs.input.focus();
      },
      //重置
      reset() {
        this.cVal = '';
        this.$refs.input.focus();
      },
    },
    watch: {
      cVal(nVal) {
        this.$emit("input", nVal);
      },
      disabled(nVal) {
        this.cDisabled = (nVal === '' || !!nVal);
      },
      readonly(nVal) {
        this.cReadonly = (nVal === '' || !!nVal);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .et-input {
    display: flex;
    align-items: center;
    position: relative;
    input, textarea {
      padding: 0;
      flex: 1;
      border: 0;
      line-height: 130%;
      font-size: 32px;
      &:active {
        border: 0;
      }
      &:focus {
        border: 0;
        outline: 0;
      }
    }
    &__show {
      font-size: 24px;
      padding: 10px 15px;
    }
    &__reset {
      position: relative;
      padding: 10px;
      color: #ffffff;
      background: #cccccc;
      border-radius: 80px;
      height: 20px;
      width: 20px;
      &::before {
        content: '×';
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto auto;
        font-size: 24px;
        height: 24px;
        line-height: 24px;
        width: 24px;
        text-align: center;
      }
    }
    &--textarea {
      .et-input__reset {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.7;
      }
    }
  }
</style>