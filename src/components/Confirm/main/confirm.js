import confirm from './confirm.vue';

export default {
  install(Vue) {
    Vue.prototype.$confirm = function (options) {
      if (!options) {
        return;
      }
      let Constructor = Vue.extend(confirm);
      let node;
      let text = ""
      if (typeof options === 'object' && options instanceof Object) {
        node = new Constructor({
          propsData: options
        });
        text = options.text;
      } else if (typeof options === 'string') {
        node = new Constructor();
        text = options;
      }
      node.vm = node.$mount();
      // node.vm.visible = true;
      node.vm.text = text;
      document.body.appendChild(node.$el);
      return node.vm;
    }
  }
};
