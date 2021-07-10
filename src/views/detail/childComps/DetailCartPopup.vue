<template>
  <div class="popup">
    <div class="popup-text">加入购物车成功!</div>
  </div>
</template>

<script>
export default {
  name: "DetailCartPopup"
}
</script>

<style scoped>

.popup {
  color: #fff;
  width: 100%;
  position: absolute;
  top: calc(40%);
  text-align: center;
}

.popup-text {
  padding: 10px 0;
  background-color: var(--color-tint);
  margin-left: calc(30%);
  margin-right: calc(30%);
  border-radius: 5px;
}
</style>
