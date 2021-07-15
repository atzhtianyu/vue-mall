<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      <div>{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default: null
  //   },
  //   isShow: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration = 1500) {
      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
      }, duration);
    }
  }
}
</script>

<style scoped>

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  color: #fff;
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, .75);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

</style>
