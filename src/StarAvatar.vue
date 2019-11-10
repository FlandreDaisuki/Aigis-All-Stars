<template>
  <a class="icon"
     :style="style"
     :data-id="id"
     :class="className"
     :title="title"
     @click.left.passive="toggleOwned"
  ></a>
</template>

<script>
import icon_groups from '../icon_groups/*.png';
import { divmod } from './utils';
import { allStarsNameMap } from '../all-stars.json';

export default {
  props: {
    id: {
      type: Number,
      default: 0,
    },
    ownedSet: {
      type: Set,
      default: () => new Set,
    },
  },
  computed: {
    style() {
      const [t, y] = divmod(this.id, 10);
      const [g, x] = divmod(t, 10);
      return {
        backgroundImage: `url(${ icon_groups[`g${g}`] })`,
        backgroundPosition: `-${y * 50}px -${x * 50}px`,
      };
    },
    className() {
      return { 'owned': this.ownedSet.has(this.id) };
    },
    title() {
      return allStarsNameMap[this.id];
    },
  },
  methods: {
    toggleOwned() {
      console.log('toggleOwned');
      if (this.ownedSet.has(this.id)) {
        console.log('toggleOwned:delete-id');
        this.$emit('delete-id', this.id);
      } else {
        console.log('toggleOwned:add-id');
        this.$emit('add-id', this.id);
      }
    },
  },
};
</script>

<style scoped>
.icon {
  height: 50px;
  width: 50px;
  display: block;
  filter: opacity(.5);
  margin: 1px;
}
.icon.owned {
  filter: none;
}
</style>
