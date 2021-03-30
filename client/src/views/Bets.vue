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

  @media (max-width: 510px) {
    .bets {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr;
    }
  }

  @media (max-width: 210px) {
    .bets {
      margin: 0;
    }
  }
</style>