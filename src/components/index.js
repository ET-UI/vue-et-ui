// 通用样式
import '../style/index.scss';

//组件
import Toast from './Toast/index'
import Alert from './Alert/index'
import Confirm from './Confirm/index'
import Dialog from './Dialog'

const components = [
  Toast, Alert, Confirm
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
  Toast, Alert, Confirm
};
