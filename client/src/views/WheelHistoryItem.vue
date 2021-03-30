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
  li {
    display: block;
    height: 3px;
    margin: 3px 0 6px 0;
    border-radius: 2px;
    width: 18px;
    background-color: #555;
  }

  .red-item {
    width: 22px;
    background-color: #c8354e;
  }

  .blue-item {
    width: 28px;
    background-color: #45b5da;
  }

  .gold-item {
    width: 36px;
    background-color: #ffc870;
  }

  @media (max-width: 510px) {
    li {
      margin: 0 3px 0 6px;
    }
  }
</style>