<template>
  <div id="dialog">
    <div @click="showToast('normal')">
      toast
    </div>
    <div @click="showToast('loading')">
      toast - loading
    </div>
    <div @click="showToast('success')">
      toast - success
    </div>
    <div @click="showToast('fail')">
      toast - fail
    </div>
    <div @click="showAlert">
      alert
    </div>
    <div @click="showConfirm">
      confirm
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dialog',
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
        // this.$alert("内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容");
        this.$alert({
          title: '警告',
          text: "内容内容内容内容内容内容内容内容内容内容内容内容",
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
      }
    }
  }
</script>

<style scoped>
</style>
