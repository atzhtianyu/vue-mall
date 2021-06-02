<template>
  <div class="tab-control">
    <div v-for="(item, index, id) in titles" :key="id"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>

.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 36px;
  line-height: 40px;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.active span {
  border-bottom: 2px solid var(--color-tint);
  padding: 3px;
}

.active {
  color: var(--color-high-text);
}



</style>
