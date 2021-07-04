<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length - 1" :key="index">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}

.info-title {
  color: #222;
}

.info-price {
  margin-top: 10px;
}

.info-price .n-price {
  color: var(--color-high-text);
  font-size: 24px;
}

.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}

.discount {
  font-size: 12px;
  padding: 2px 5px;
  background-color: var(--color-high-text);
  color: #fff;
  border-radius: 8px;
  margin-left: 5px;

  /*让元素上浮一些: 使用相对定位即可*/
  position: relative;
  top: -8px;
}

.info-other {
  display: flex;
  margin-top: 15px;
  line-height: 30px;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
  font-size: 13px;
  justify-content: space-between;
}

.info-service {
  display: flex;
  line-height: 60px;
  justify-content: space-between;
}

.info-service img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}

.info-service span {
  font-size: 13px;
  color: #333;
}

</style>
