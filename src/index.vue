<template>
  <div id="app">
    <md-toolbar class="title-bar md-large" md-elevation="1">
      <div class="md-toolbar-row">
        <h3 class="md-title">
          所有率: <span>{{ ownedRate }}</span>％（{{ ownedCount }}/{{ totalCount }}）
        </h3>

        <div class="mode-indicator">
          <md-button class="md-icon-button" :disabled="!shareMode" @click.left.passive="switchMode">
            <md-icon>
              person
            </md-icon>
            <md-tooltip md-direction="bottom">
              {{ $t('personal-mode-title') }}
            </md-tooltip>
          </md-button>
          <md-button class="md-icon-button" :disabled="shareMode" @click.left.passive="switchMode">
            <md-icon>
              share
            </md-icon>
            <md-tooltip md-direction="bottom">
              {{ $t('share-mode-title') }}
            </md-tooltip>
          </md-button>
        </div>
      </div>
      <md-button class="export md-raised md-primary" :disabled="!encodedOwned.length" @click.left.passive="exportData">
        {{ $t('export') }}
      </md-button>
      <md-button class="import md-raised md-primary" @click.left.passive="openImportDialog">
        {{ $t('import') }}
      </md-button>
      <md-button v-external-link class="social-twitter md-raised md-primary" :href="twitterLink">
        <img src="./twitter-brands.svg" style="height: 24px;" />
      </md-button>
      <md-button class="clear md-raised md-accent" @click.left.passive="clickCleanup">
        {{ $t('clear') }}
      </md-button>
    </md-toolbar>
    <section>
      <div v-for="firstGroup in allStars" :key="JSON.stringify(firstGroup)">
        <h2>{{ firstGroup[0] }}</h2>

        <ul v-if="Number.isFinite(firstGroup[1])" class="star-list">
          <li v-for="firstGroupId in firstGroup.slice(1)" :key="JSON.stringify(firstGroupId)" class="star-list-item">
            <StarAvatar
              v-if="Number.isFinite(firstGroupId)"
              :id="firstGroupId"
              :owned-set="owned"
              @add-id="addId"
              @delete-id="deleteId"
            />
          </li>
        </ul>

        <div v-for="secondGroup in firstGroup.slice(1)" v-else :key="JSON.stringify(secondGroup)">
          <h3>{{ secondGroup[0] }}</h3>
          <ul v-if="Number.isFinite(secondGroup[1])" class="star-list">
            <li v-for="secondGroupId in secondGroup.slice(1)" :key="JSON.stringify(secondGroupId)" class="star-list-item">
              <StarAvatar
                v-if="Number.isFinite(secondGroupId)"
                :id="secondGroupId"
                :owned-set="owned"
                @add-id="addId"
                @delete-id="deleteId"
              />
            </li>
          </ul>

          <div v-for="thirdGroup in secondGroup.slice(1)" v-else :key="JSON.stringify(thirdGroup)">
            <h4>{{ thirdGroup[0] }}</h4>
            <ul class="star-list">
              <li v-for="thirdGroupId in thirdGroup.slice(1)" :key="JSON.stringify(thirdGroupId)" class="star-list-item">
                <StarAvatar :id="thirdGroupId" :owned-set="owned" @add-id="addId" @delete-id="deleteId" />
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

    <!-- template hack works! -->

    <template>
      <md-dialog-alert
        :md-active.sync="exportSuccessfulActive"
        :md-title="$t('copied')"
        :md-confirm-text="$t('confirm-text')"
      />
    </template>

    <template>
      <md-dialog :md-active.sync="exportFailedActive">
        <md-dialog-title>{{ $t('copy-following-encoded-string') }}</md-dialog-title>
        <md-field>
          <md-input v-model="copyTextArea" readonly />
        </md-field>
      </md-dialog>
    </template>

    <template>
      <md-dialog-confirm
        :md-active.sync="clearInPersonalModeActive"
        :md-title="$t('clear-in-personal-mode-title')"
        :md-confirm-text="$t('confirm-text')"
        :md-cancel-text="$t('cancel-text')"
        @md-confirm="cleanup"
      />
    </template>

    <template>
      <md-dialog
        :md-active.sync="isImportDialogOpened"
      >
        <md-dialog-title>{{ $t('import') }}</md-dialog-title>
        <md-dialog-content>
          <md-field md-clearable>
            <span class="md-helper-text">{{ $t('input-encoded-string') }}</span>
            <md-input v-model="importEncodedValue" :placeholder="importEncodedPlaceholder" :disabled="!!importURLValue" />
          </md-field>
          <md-field md-clearable>
            <span class="md-helper-text">{{ $t('input-importable-url') }}</span>
            <md-input v-model="importURLValue" placeholder="http://usashoya.web.fc2.com…" :disabled="!!importEncodedValue" />
          </md-field>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="isImportDialogOpened = false">
            {{ $t('cancel-text') }}
          </md-button>
          <md-button class="md-primary" @click="importData">
            {{ $t('confirm-text') }}
          </md-button>
        </md-dialog-actions>
      </md-dialog>
    </template>
  </div>
</template>

<script>
import { allStars } from '../all-stars.json';
import { encode, decode, allStarsConst } from './utils';

import StarAvatar from './StarAvatar.vue';

const STORAGE_KEY = 'owned';

export default {
  components: {
    StarAvatar,
  },
  data() {
    const { totalCount, lastUpdateTimestamp } = allStarsConst;

    return {
      allStars,
      lastUpdateTimestamp,
      totalCount,
      owned: new Set(),
      isImportDialogOpened: false,
      exportSuccessfulActive: false,
      exportFailedActive: false,
      clearInPersonalModeActive: false,
      copyTextArea: '',
      shareMode: false,
      importEncodedValue: '',
      importURLValue: '',
    };
  },
  computed: {
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
    twitterLink() {
      const text = `Aigis All Stars ※ユニット所有率：${this.ownedRate}％（所有数 : ${this.ownedCount}/${this.totalCount}）
https://flandredaisuki.github.io/Aigis-All-Stars/?s=${this.encodedOwned}
#アイギス所持チェッカー #千年戦争アイギス`;
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    },
    importEncodedPlaceholder() {
      return '1!xxxxx… ' + this.$t('or') + ' 2!xxxxx…';
    },
  },
  mounted() {
    if (location.search) {
      const encodedShared = new URLSearchParams(location.search).get('s');
      this.owned = new Set(decode(encodedShared));
      this.shareMode = true;
    } else {
      this.loadFromLocal();
      this.saveToLocal();
    }
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
      if (!this.shareMode) {
        localStorage.setItem(STORAGE_KEY, this.encodedOwned);
      }
      this.updateURL();
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
      this.isImportDialogOpened = false;
      if (this.importEncodedValue) {
        this.owned = new Set(decode(this.importEncodedValue));
      } else {
        const range = (start, end) => Array.from({ length: Math.abs(start - end) + 1 }, (_, i) => start + i);
        const ids = new URL(this.importURLValue).search
          .replace('?', '')
          .split(/[,]/g)
          .flatMap((n) => n.includes('-') ? range(...n.split('-').map(Number)) : Number(n))
          .filter(Boolean)
          .map((n) => n - 1000);

        this.owned = new Set(ids);
      }
      this.saveToLocal();
    },
    clickCleanup() {
      if (this.shareMode) {
        this.cleanup();
      } else {
        this.clearInPersonalModeActive = true;
      }
    },
    cleanup() {
      this.owned = new Set();
      this.saveToLocal();
    },
    updateURL() {
      if (this.shareMode) {
        history.replaceState(null, document.title, '?s=' + this.encodedOwned);
      } else {
        history.replaceState(null, document.title, location.pathname);
      }
    },
    switchMode() {
      if (this.shareMode) {
        this.loadFromLocal();
      }
      this.shareMode = !this.shareMode;
      this.updateURL();
    },
    openImportDialog() {
      this.isImportDialogOpened = true;
      this.importEncodedValue = this.importURLValue = '';
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
.star-list {
  padding: 0;
}
.star-list-item {
  list-style: none;
  display: inline-block;
}
.clear {
  margin-left: auto;
}
.mode-indicator {
  height: 24px;
  margin-left: auto;
}
.mode-indicator .md-icon {
  font-weight: 900;
  font-size: 30px;
}
.md-button.md-theme-default[disabled] .md-icon-font {
  color: #74F;
}
</style>
