<template>
  <ul class="toastcontainer">
    <transition-group name="toastcontainer-transition" tag="li">
      <ToastItem
        v-for="toast in data.toasts"
        v-bind:key="toast.id"
        v-bind:toast="toast" />
    </transition-group>
  </ul>
</template>

<script>
import ToastItem from '@/views/ToastItem'
import { data } from '@/data'

export default {
  components: {
    ToastItem
  },
  data() {
    return {
      data
    }
  }
}
</script>

<style scoped>
.toastcontainer {
  position: fixed;
  top: 150px;
  right: 7%;
  max-width: 86%;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 100001;
}

.toastcontainer-transition-enter-active, .toastcontainer-transition-leave-active {
  transition: all 0.3s;
}
.toastcontainer-transition-enter, .toastcontainer-transition-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>