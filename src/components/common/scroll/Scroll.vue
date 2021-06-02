<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: 3,
      click: true,
      observeDOM: true
      // updated: true
    })
    this.scroll.on('scroll', (position) => {
      console.log(position);
    })
  }
}
</script>

<style scoped>

</style>
