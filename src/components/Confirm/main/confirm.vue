<template>
  <div class="et-confirm" :style="zIndex?('z-index:'+zIndex):''">
    <div class="et-confirm__inner" :class="{visible:visible}">
      <div class="et-confirm__title" v-if="title">
        {{title}}
      </div>
      <div class="et-confirm__text" v-html="text" v-if="text">
      </div>
      <div class="et-confirm__buttons">
        <div class="et-confirm__button" @click.stop="close(false)">
          {{cancelText}}
        </div>
        <div class="et-confirm__button et-confirm__button--ok" @click.stop="close(true)">
          {{okText}}
        </div>
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
      cancelText: {//取消文案
        type: String,
        default: '取消',
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
      close(flag) {
        this.$el.remove();
        this.callback && this.callback(flag);
      }
    },
    computed: {},
  };
</script>