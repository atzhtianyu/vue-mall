<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

.nav-bar {
  text-align: center;
  display: flex;
  /* line-height: 内容上下居中，只设置 line-height 会出现问题，需要同时设置 height */
  line-height: 44px;
  height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}

.left, .right {
  width: 60px;
}

.center {
  flex: 1;
}

</style>
