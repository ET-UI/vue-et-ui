<template>
  <div class="et-toast" :class="[toastType,{}]" :style="zIndex?('z-index:'+zIndex):''">
    <div class="et-toast__inner" :class="{visible:visible}">
      <div class="et-toast__icon" v-if="type!='normal'">

      </div>
      <div class="et-toast__text" v-html="text" v-if="text">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    props: {
      type: {//类型，normal，success，fail，loading
        type: String,
        default: "normal"
      },
      autoClose: {//是否自动关闭，布尔型/undefined
      },
      closeTime: {//关闭的延时
        type: Number,
        default: 2000
      },
      zIndex: {//层级
        type: Number,
        default: 1000
      }
    },
    data() {
      return {
        visible: false,
        timer: null,
        text: "",
        cAutoClose: true,
      };
    },
    mounted() {
      if (this.autoClose === undefined) {
        this.cAutoClose = (this.type !== "loading");
      } else {
        this.cAutoClose = this.autoClose;
      }
      this.init();
    },
    beforeDestroy() {
      this.clearTimer();
    },
    methods: {
      init() {
        if (this.cAutoClose && Math.abs(this.closeTime) > 0) {
          this.timer = setTimeout(() => {
            this.close();
          }, Math.abs(this.closeTime));
        }
      },
      clearTimer() {
        clearTimeout(this.timer);
      },
      close() {
        this.visible = false;
        setTimeout(() => {
          this.$el.remove();
          this.$destroy();
        }, 300);
      }
    },
    computed: {
      toastType() {
        let arr = ["normal", "success", "fail", "loading"];
        if (arr.includes(this.type)) {
          return "et-toast--" + this.type;
        }
        return "et-toast--normal";
      },
    },
  };
</script>