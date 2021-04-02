<template>
  <li
    :class="getClass">
  </li>
</template>

<script>
import { getWheelColor, wheelColors } from '@/methods.js'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    getClass() {
      var color = getWheelColor(this.item.winnumber);
      for (var i in wheelColors)
        if (wheelColors[i] === color)
          return i + "-item";
    }
  }
}
</script>

<style scoped>
  .wheelHistory ul li.red-item {
    min-width: 22px;
    width: 22px;
    background-color: #c8354e;
  }

  .wheelHistory ul li.blue-item {
    min-width: 28px;
    width: 28px;
    background-color: #45b5da;
  }

  .wheelHistory ul li.gold-item {
    min-width: 36px;
    width: 36px;
    background-color: #ffc870;
  }
</style>