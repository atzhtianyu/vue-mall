<template>
  <div class="recommend">
    <div v-for="(item, id) in recommends" :key="id" class="recommend-item">
      <a :href="item.link">
        <img v-lazy="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>

.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 20px;
  font-size: 12px;
  border-bottom: 10px solid #eee;
}

.recommend-item {
  flex: 1;

}

.recommend-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}

</style>
