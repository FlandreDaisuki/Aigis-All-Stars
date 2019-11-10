import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import {
  MdIcon,
  MdField,
  MdButton,
  MdToolbar,
  MdTooltip,
  MdDialog,
  MdDialogAlert,
  MdDialogPrompt,
  MdDialogConfirm,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import App from './index.vue';
import i18n from './i18n';

Vue.use(VueClipboard);

Vue.use(MdIcon);
Vue.use(MdField);
Vue.use(MdButton);
Vue.use(MdTooltip);
Vue.use(MdToolbar);
Vue.use(MdDialog);
Vue.use(MdDialogAlert);
Vue.use(MdDialogPrompt);
Vue.use(MdDialogConfirm);

Vue.directive('external-link', (el) => {
  if (el instanceof HTMLAnchorElement) {
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  }
});

window.vueInstance = new Vue({
  i18n,
  mounted() {
    this.$i18n.locale = navigator.language;
  },
  render: (h) => h(App),
}).$mount('#app');
