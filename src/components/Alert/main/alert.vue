<template>
  <div class="etc-alert" :style="zIndex?('z-index:'+zIndex):''">
    <div class="etc-alert__inner" :class="{visible:visible}">
      <div class="etc-alert__title" v-if="title">
        {{title}}
      </div>
      <div class="etc-alert__text" v-html="text" v-if="text">
      </div>
      <div class="etc-alert__button" @click.stop="close">
        {{okText}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "alert",
    props: {
      zIndex: {//层级
        type: Number,
        default: 1000,
      },
      title: {//标题
        type: String,
        default: '',
      },
      okText: {//确定文案
        type: String,
        default: '确定',
      },
      callback: {//回调事件
        type: Function,
        default: null,
      }
    },
    data() {
      return {
        visible: false,
        text: "",
      };
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
    },
    methods: {
      init() {
        setTimeout(() => {
          this.visible = true;
        }, 0);
      },
      close() {
        this.$el.remove();
        this.callback && this.callback();
      }
    },
    computed: {},
  };
</script>