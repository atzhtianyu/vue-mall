<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
export default {
  name: "Detail",
  components: {
    DetailNavBar
  },
  data() {
    return {
      iid: null
    }
  },
  created() {
    this.iid = this.$route.params.iid;
  }
}
</script>

<style scoped>

</style>
