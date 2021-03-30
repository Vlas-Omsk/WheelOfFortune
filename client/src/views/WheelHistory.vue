<template>
  <div class="wheelhistory">
    <ul class="column">
      <WheelHistoryItem 
        v-for="item in data.history"
        v-bind:key="item.id"
        v-bind:item="item" />
    </ul>
    <div class="row">
      <ul>
        <WheelHistoryItem 
          v-for="item in data.history"
          v-bind:key="item.id"
          v-bind:item="item" />
      </ul>
    </div>
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
}

ul.column {
  overflow-y: scroll;
  height: calc(12px * 20);
  transform: translateY(-50%) translateX(-100%);
}

ul, div.row {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}

ul::-webkit-scrollbar,
div.row::-webkit-scrollbar { width: 0; }

div.row {
  display: none;
  position: absolute;
  width: 100%;
  overflow-x: scroll;
  left: 0;
  top: 0;
  transform: translateY(-100%);
}

div.row ul {
  display: none;
  position: relative;
  transform: translateY(-100%);
}

@media (max-width: 510px) {
  ul.column {
    display: none;
  }
  div.row {
    display: block;
  }
  div.row ul {
    display: inline-flex;
  }
}
</style>