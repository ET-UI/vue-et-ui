<template>
  <div id="home">
  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted() {
      this.testToast();
    },
    methods: {
      testToast() {
        // this.$toast("加载中");
        /*this.$toast({
          type: "loading",
        });*/
        /*this.$toast({
          type: "success",
          text: "加载成功",
        });*/
        this.$toast({
          type: "fail",
          text: "加载失败",
        });
        /*let toast = this.$toast({
          type: "loading"
        });
        setTimeout(() => {
          toast.close();
        }, 300);*/
      }
    }
  }
</script>

<style scoped>
</style>
