<template>
  <div class="betitem" 
    :style="rootStyle" 
    :class="{locked: this.data.isSpinning}" >
    <div class="betbtn" @click="clickBet">{{item.title}}</div>
    <div class="summary">
      <div class="inline">
        <img class="person" src="user.svg">
        <span>{{item.users.length}}</span>
      </div>
      <div class="inline right">
        <img class="coins" src="coin.svg">
        <span>{{sumCoins()}}</span>
      </div>
    </div>
    <hr>
    <BetUsers
      v-bind:users="item.users" />
  </div>
</template>

<script>
import BetUsers from '@/views/BetUsers'
import { data } from '@/data'
import { showToast } from '@/methods'

export default {
  components: {
    BetUsers
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      data
    }
  },
  computed: {
    rootStyle() {
      return {
        '--color': this.item.color
      }
    }
  },
  methods: {
    sumCoins() {
      let sum = 0;
      for (let i = 0; i < this.item.users.length; i++)
        sum += Number(this.item.users[i].coins);
      return sum;
    },
    clickBet() {
      if (this.data.account == null)
        return showToast('First you need to sign in')
      this.data.betPopup.bid = this.item.bid;
      this.data.betPopup.isVisible = true;
    }
  }
}
</script>

<style scoped>
  hr {
    margin: 5px 10px;
    border-color: var(--color);
  }

  .inline {
    display: flex;
  }

  .inline.right {
    margin-left: auto;
  }

  span {
    font-weight: 700;
    color: var(--color);
    font-size: 14px;
  }

  .summary {
    display: flex;
    padding: 5px;
    height: 15px;
  }

  .person {
    margin: 0;
  }

  .coins {
    max-height: 100%;
    height: 100%;
  }

  .person, .coins {
    margin-right: 5px;
  }

  .betitem {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 .75rem;
    box-sizing: border-box;
    transition: .2s;
  }

  .betitem.locked {
    pointer-events: none;
    opacity: 0.3;
  }

  .betbtn {
    position: relative;
    display: flex;
    margin-bottom: 6px;
    border-top: 2px var(--color) solid;
    border-bottom: 2px var(--color) solid;
    color: var(--color);
    height: 60px;
    width: 100%;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 7px;
    font-size: 24px;
    font-weight: 400;
    transition: .2s ease;
    overflow: hidden;
  }

  .betbtn::before {
    content: ' ';
    display: block;
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: #1c1c22;
  }

  .betbtn::after {
    content: ' ';
    display: block;
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 106%;
    z-index: -1;
    background-color: var(--color);
    transform: translateY(100%);
    border-radius: 7px;
    transition: .2s ease;
  }

  .betbtn:hover {
    color: #1c1c22;
  }

  .betbtn:hover::after {
    transform: translateY(-3%);
  }
</style>