<template>
  <div class="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">小码哥商城</div>
    </nav-bar>
    <user-info></user-info>

  </div>

</template>

<script>
import UserInfo from "@/views/profile/childComps/UserInfo";

import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo
  },

}
</script>

<style scoped>

.profile-nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}

</style>
