<template>
  <div class="bets">
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
</style>