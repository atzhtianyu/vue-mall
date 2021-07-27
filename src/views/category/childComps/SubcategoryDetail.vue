<template>
  <div>
    <goods-list :goods="detail"></goods-list>
  </div>
</template>

<script>
import GoodsList from "@/components/content/goods/GoodsList";
export default {
  name: "SubcategoryDetail",
  components: {
    GoodsList
  },
  props: {
    detail: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
