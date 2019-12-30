//:active伪类不生效的问题
document.body.addEventListener('touchstart', function () {
});

// 通用样式
import '../style/index.scss';

//组件
import Toast from './Toast/index'
import Alert from './Alert/index'
import Confirm from './Confirm/index'
import Dialog from './Dialog'
import Btn from './Btn'
import Picker from './Picker'
import DatePicker from './DatePicker'

const components = [
  Toast, Alert, Confirm
];

let VueEtUi = {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};

export default VueEtUi;

export {
  Toast, Alert, Confirm, Dialog, Btn, Picker, DatePicker
};
