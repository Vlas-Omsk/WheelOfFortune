<template>
  <div class="wheelhistory">
    <ul>
      <WheelHistoryItem 
        v-for="item in data.history"
        v-bind:key="item.id"
        v-bind:item="item" />
    </ul>
  </div>
</template>

<script>
import WheelHistoryItem from '@/views/WheelHistoryItem'
import { data } from '@/data'

export default {
  components: {
    WheelHistoryItem
  },
  data() {
    return {
      data
    }
  }
}
</script>

<style scoped>
ul {
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  height: calc(12px * 20);
  transform: scaleY(-1) translateY(50%);
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

ul::-webkit-scrollbar { width: 0; }
</style>