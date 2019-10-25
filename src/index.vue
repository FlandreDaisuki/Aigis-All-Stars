<template>
  <div id="app">
    <md-toolbar class="title-bar md-medium" md-elevation="1">
      <div class="md-toolbar-row">
        <h3 class="md-title">
          所有率: <span>{{ ownedRate }}</span>％（{{ ownedCount }}/{{ totalCount }}）
        </h3>
      </div>
      <md-button class="export md-raised md-primary" :disabled="!encodedOwned.length" @click="exportData">
        {{ $t('export') }}
      </md-button>
      <md-button class="import md-raised md-primary" @click="promptActive = true">
        {{ $t('import') }}
      </md-button>
      <md-button class="clear md-raised md-accent" @click="cleanup">
        {{ $t('clear') }}
      </md-button>
    </md-toolbar>
    <section>
      <div v-for="group in allStars" :key="group[0]">
        <h2>{{ group[0] }}</h2>

        <ul v-if="typeof(group[1][0]) === 'number'" class="icon-list">
          <li v-for="groupId in group[1]" :key="groupId" class="icon-list-item">
            <Icon :id="groupId" :owned-set="owned" @add-id="addId" @delete-id="deleteId" />
          </li>
        </ul>
        <div v-for="(subgroup, index) in group[1]" v-else :key="index">
          <h3>{{ subgroup[0] }}</h3>

          <ul v-if="typeof(subgroup[1]) === 'number'" class="icon-list">
            <li v-for="subgroupId in subgroup.slice(1)" :key="subgroupId" class="icon-list-item">
              <Icon :id="subgroupId" :owned-set="owned" @add-id="addId" @delete-id="deleteId" />
            </li>
          </ul>
          <div v-for="(subsubgroup, subindex) in subgroup.slice(1)" v-else :key="subindex">
            <h4>{{ subsubgroup[0] }}</h4>

            <ul class="icon-list">
              <li v-for="subsubgroupId in subsubgroup.slice(1)" :key="subsubgroupId" class="icon-list-item">
                <Icon :id="subsubgroupId" :owned-set="owned" @add-id="addId" @delete-id="deleteId" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <p>Last Update: {{ lastUpdateTime }}</p>
      <p>
        All data are from
        <a href="http://usashoya.web.fc2.com/aigis/checklist/aigis_checklist.html">[非公式]千年戦争アイギス - ユニット所持チェッカー</a>
      </p>
      <p>Copyright © <a href="https://flandre.tw/github">FlandreDaisuki</a></p>
      <p>License is <a href="https://opensource.org/licenses/MIT">MIT</a></p>
    </footer>

    <!-- <md-dialog-alert
      :md-active.sync="exportSuccessfulActive"
      md-content="已複製到剪貼簿"
      md-confirm-text="好！"
    /> -->

    <md-dialog :md-active.sync="exportSuccessfulActive">
      <md-dialog-title>{{ $t('copied') }}</md-dialog-title>
    </md-dialog>

    <md-dialog :md-active.sync="exportFailedActive">
      <md-dialog-title>{{ $t('copy-following-encoded-string') }}</md-dialog-title>
      <md-field>
        <md-input v-model="copyTextArea" readonly />
      </md-field>
    </md-dialog>

    <md-dialog-prompt
      v-model="importValue"
      :md-active.sync="promptActive"
      :md-input-placeholder="$t('input-encoded-string')"
      :md-confirm-text="$t('confirm-text')"
      :md-cancel-text="$t('cancel-text')"
      @md-confirm="importData"
    />
  </div>
</template>

<script>
import { lastUpdateTimestamp, allStars } from '../all-stars.json';
import { encode, decode } from './utils';

import Icon from './icon.vue';

const STORAGE_KEY = 'owned';

export default {
  components: { Icon },
  data() {
    return {
      allStars,
      lastUpdateTimestamp,
      owned: new Set(),
      promptActive: false,
      exportSuccessfulActive: false,
      exportFailedActive: false,
      importValue: '',
      copyTextArea: '',
    };
  },
  computed: {
    totalCount() {
      return this.allStars.flat(Infinity).filter(Number).length;
    },
    ownedCount() {
      return this.owned.size;
    },
    ownedRate() {
      return (this.ownedCount * 100 / this.totalCount).toFixed(2);
    },
    encodedOwned() {
      return encode(this.owned);
    },
    lastUpdateTime() {
      return new Date(this.lastUpdateTimestamp).toLocaleString(this.$i18n.locale);
    },
  },
  mounted() {
    this.loadFromLocal();
    this.saveToLocal();
  },
  methods: {
    addId(id) {
      this.owned.add(id);
      this.owned = new Set(this.owned);
      this.saveToLocal();
    },
    deleteId(id) {
      this.owned.delete(id);
      this.owned = new Set(this.owned);
      this.saveToLocal();
    },
    saveToLocal() {
      localStorage.setItem(STORAGE_KEY, this.encodedOwned);
    },
    loadFromLocal() {
      const stored = localStorage.getItem(STORAGE_KEY) || '';
      this.owned = new Set(decode(stored));
    },
    exportData() {
      const resolve = () => {
        this.exportSuccessfulActive = true;
      };
      const reject = () => {
        this.exportFailedActive = true;
        this.copyTextArea = this.encodedOwned;
      };

      this.$copyText(this.encodedOwned).then(resolve, reject);
    },
    importData() {
      this.owned = new Set(decode(this.importValue));
      this.importValue = '';
      this.saveToLocal();
    },
    cleanup() {
      this.owned = new Set();
      this.saveToLocal();
    },
  },
};
</script>

<style scoped>
#app {
  display: grid;
  max-width: 1200px;
  margin: 0 auto;
}
.title-bar {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}
.icon-list {
  padding: 0;
}
.icon-list-item {
  list-style: none;
  display: inline-block;
}
.clear {
  margin-left: auto;
}
</style>
