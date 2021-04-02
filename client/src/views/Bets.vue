<template>
  <div class="bets"
    :class="{column: resize == 1, 'nomargin column': resize == 2}">
    <BetItem
      v-for="item in data.bets"
      v-bind:key="item.bid"
      v-bind:item="item" />
  </div>
</template>

<script>
import BetItem from '@/views/BetItem'
import { data } from '@/data'

export default {
  components: {
    BetItem
  },
  data() {
    return {
      data
    }
  },
  props: {
    resizeKey: {
      type: Number,
      required: true
    }
  },
  computed: {
    resize() {
      this.resizeKey;
      if (window.innerWidth - this.data.leftMenuWidth < 210)
        return 2;
      if (window.innerWidth - this.data.leftMenuWidth < 510)
        return 1;
    }
  }
}
</script>

<style scoped>
  .bets {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    box-sizing: border-box;
    margin: 0 2em;
  }

  .bets.column {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }

  .bets.nomargin {
    margin: 0;
  }
</style>