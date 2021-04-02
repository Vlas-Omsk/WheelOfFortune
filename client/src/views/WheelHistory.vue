<template>
  <div class="wheelHistory" :class="{column: isColumn, row: !isColumn}">
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
  props: {
    resizeKey: {
      type: Number,
      required: true
    }
  },
  components: {
    WheelHistoryItem
  },
  data() {
    return {
      data
    }
  },
  computed: {
    isColumn() {
      this.resizeKey;
      return window.innerWidth - this.data.leftMenuWidth > 510;
    }
  }
}
</script>

<style scoped>
.wheelHistory {
  position: absolute;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.wheelHistory ul li {
  display: block;
  min-height: 3px;
  height: 3px;
  margin: 3px 0 6px 0;
  border-radius: 2px;
  min-width: 18px;
  width: 18px;
  background-color: #555;
}

.wheelHistory.row ul li {
  margin: 0 3px 0 6px;
}

.wheelHistory.column {
  right: 0;
}

.wheelHistory.column ul::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.wheelHistory.column ul {
  flex-direction: column-reverse;
  height: calc(12px * 20);
  transform: none;
  overflow-y: scroll;
  width: 36px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.wheelHistory.row {
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(-100%);
}

.wheelHistory.row ul {
  flex-direction: row;
  overflow-x: scroll;
  padding: 10px 0;
}
</style>