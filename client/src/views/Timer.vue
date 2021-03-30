<template>
  <div class="timer">
    <h1
      :style="colorStyle"
      :class="{hidden: data.spinningState != 0}">
      {{getTime()}}
    </h1>
    <div class="arrow"
      :style="colorStyle">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" x="0px" y="0px" viewBox="0 0 448.011 448.011" style="enable-background:new 0 0 448.011 448.011;" xml:space="preserve"><g><g><path d="M438.731,209.463l-416-192c-6.624-3.008-14.528-1.216-19.136,4.48c-4.64,5.696-4.8,13.792-0.384,19.648l136.8,182.4 l-136.8,182.4c-4.416,5.856-4.256,13.984,0.352,19.648c3.104,3.872,7.744,5.952,12.448,5.952c2.272,0,4.544-0.48,6.688-1.472 l416-192c5.696-2.624,9.312-8.288,9.312-14.528S444.395,212.087,438.731,209.463z"/></g></g></svg>
    </div>
  </div>
</template>

<script>
import { getWheelColorByDeg, getUnixNow } from '@/methods'
import { data } from '@/data'

export default {
  data() {
    return {
      data,
      currentTime: 0,
      intervalId: -1
    }
  },
  computed: {
    colorStyle() {
      return {
        color: getWheelColorByDeg(this.data.wheelRoteteDegree)
      }
    }
  },
  methods: {
    getTime() {
      return this.currentTime.toFixed(2);
    }
  },
  created() {
    this.intervalId = setInterval(() => {
      const i = this.data.nextSpinAt - getUnixNow();
      if (i > 0 && this.data.spinningState == 0)
        this.currentTime = i / 1000;
      else
        this.currentTime = 0;
    }, 10);
  },
  destroyed() {
    clearInterval(this.intervalId);
  }
}
</script>

<style scoped>
  .timer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 28px;
  }

  h1 {
    margin-top: auto;
    font-size: 30px;
    color: rgb(80, 80, 80);
    text-align: center;
    font-weight: 300;
    margin: 0;
    transition: opacity .1s linear,transform .1s;
  }

  h1.hidden {
    opacity: 0;
    transform: translateY(4px);
  }

  .arrow {
    width: 20px;
    height: 20px;
    transform: rotate(90deg);
  }
</style>