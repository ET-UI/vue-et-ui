<template>
  <!--<transition name="cc-toast-fade"
              @after-leave="deleteEl">
    <div class="cc-toast"
         :class="[
         toastType
         ,{
          'cc-toast&#45;&#45;big':showButton
         }]"
         :style="'zIndex:'+zIndex"
         @mousemove="clearTimer"
         @mouseleave="initAutoClose"
         v-show="visible">
      <slot />
      <i class="cc-toast__closeButton"
         @click="deleteEl"
         v-if="showButton">
&lt;!&ndash;        <ccIcon name='cc-close'/>&ndash;&gt;
      </i>
    </div>
  </transition>-->
</template>

<script>
// import ccIcon from "@/components/Icon/main/icon.vue";
export default {
  name: "toast",
  // components: { ccIcon },
  props: {
    type: {
      type: String,
      default: "normal"
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy() {
  }
};
</script>