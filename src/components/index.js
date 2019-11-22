// 通用样式
import '../style/common.scss';

//组件
import Toast from './Toast/index'

const components = [
  Toast
];

let VueEtccbUi = {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};

export default VueEtccbUi;


export {
  Toast
};
