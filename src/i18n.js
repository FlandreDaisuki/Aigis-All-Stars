import Vue from 'vue';
import VueI18n from 'vue-i18n';

import jaJP from './_locales/ja_JP';
import zhTW from './_locales/zh_TW';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'ja-JP',
  fallbackLocale: 'ja-JP',
  messages: {
    'ja-JP': jaJP,
    'zh-TW': zhTW,
  },
});
