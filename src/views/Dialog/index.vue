<template>
  <div id="dialog">
    <div @click="showToast('normal')">
      吐司 - toast
    </div>
    <div @click="showToast('loading')">
      吐司 - 加载中 - toast - loading
    </div>
    <div @click="showToast('success')">
      吐司 - 成功 - toast - success
    </div>
    <div @click="showToast('fail')">
      吐司 - 失败 - toast - fail
    </div>
    <div @click="showAlert">
      提示框 - alert
    </div>
    <div @click="showConfirm">
      确认框 - confirm
    </div>
    <div @click="showDialog">
      自定义弹框 - dialog
    </div>

    <ETDialog :show.sync="visible" :show-close="true" type="white">
      test
    </ETDialog>
  </div>
</template>

<script>
  import {ETDialog} from '@/components/index'

  export default {
    components: {
      ETDialog,
    },
    data() {
      return {
        visible: false,
      }
    },
    mounted() {
    },
    methods: {
      showToast(type) {
        switch (type) {
          case "normal":
            this.$toast("这是一个toast");
            return;
          case "loading":
            var toast = this.$toast({
              type: "loading",
            });
            setTimeout(() => {
              toast.close();
              this.$toast("已超时");
            }, 3000);
            return;
          case "success":
            this.$toast({
              type: "success",
              text: "加载成功",
            });
            return;
          case "fail":
            this.$toast({
              type: "fail",
              text: "加载失败",
            });
            return;
        }
      },
      showAlert() {
        this.$alert({
          title: '警告',
          text: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
          okText: '我知道了',
          callback: () => {
            console.log('点击了确定');
          }
        });
        /*let ale = this.$alert({
          title:'警告',
          text:"内容内容内容内容内容内容内容内容内容内容内容内容",
        });
        setTimeout(() => {
          ale.close();
        }, 500);*/
      },
      showConfirm() {
        this.$confirm({
          title: '确认框',
          text: "内容内容内容内容内容内容内容内容内容内容内容内容",
          cancelText: '我要取消',
          okText: '我知道了',
          callback: flag => {
            console.log(`点击了${flag}`);
          }
        });
      },
      showDialog() {
        this.visible = !this.visible;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #dialog {
  }
</style>
