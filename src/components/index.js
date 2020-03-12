//:active伪类在移动端不生效的问题
document.body.addEventListener('touchstart', function () {
});

// 通用样式
import '../style/index.scss';

//组件
import Toast from './Toast/index'
import Alert from './Alert/index'
import Confirm from './Confirm/index'
import ETDialog from './Dialog'
import ETBtn from './Btn'
import ETPicker from './Picker'
import ETDatePicker from './DatePicker'
import ETInput from './Input'
import ETSwitch from './Switch'

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
  Toast, Alert, Confirm, ETDialog, ETBtn, ETPicker, ETDatePicker, ETInput, ETSwitch
};
