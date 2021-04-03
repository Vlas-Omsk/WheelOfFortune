<template>
  <div class="betitem" 
    :style="rootStyle" 
    :class="{translucent: isLocked, locked: data.spinningState != 0}" >
    <div class="betbtn shadow" @click="clickBet">{{item.title}}</div>
    <BetUsers
      v-bind:users="item.users" />
  </div>
</template>

<script>
import BetUsers from '@/views/BetUsers'
import { data } from '@/data'
import { showToast, getWheelColorByDeg } from '@/methods'

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
    },
    isLocked() {
      if (this.data.spinningState == 2) {
        var b = this.item.color !== getWheelColorByDeg(this.data.wheelRoteteDegree);
        if (!b) {
          var multiple = Number(this.item.title.slice(0, -1));
          for (var i = 0; i < this.item.users.length; i++) {
            this.item.users[i].coins *= multiple;
            console.log(this.item.users[i].coins);
          }
        }
        return b;
      }
      return data.spinningState != 0
    }
  },
  methods: {
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
  .betitem {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 .75rem;
    box-sizing: border-box;
    transition: .2s;
  }

  .betitem.translucent {
    opacity: 0.3;
  }

  .betitem.locked {
    pointer-events: none;
  }

  .betbtn {
    position: relative;
    display: flex;
    margin-bottom: 6px;
    border-top: 2.1px var(--color) solid;
    border-bottom: 2.1px var(--color) solid;
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
    transform: translateY(-2%);
  }
</style>