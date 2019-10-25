import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import {
  MdField,
  MdDialog,
  MdButton,
  MdToolbar,
  MdDialogAlert,
  MdDialogPrompt,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import App from './index.vue';
import i18n from './i18n';

Vue.use(VueClipboard);

Vue.use(MdField);
Vue.use(MdDialog);
Vue.use(MdButton);
Vue.use(MdToolbar);
Vue.use(MdDialogAlert);
Vue.use(MdDialogPrompt);

new Vue({
  i18n,
  mounted() {
    this.$i18n.locale = navigator.language;
  },
  render: (h) => h(App),
}).$mount('#app');
