<template>
  <div class="root" :style="rootStyle">
    <div class="wheel-container">
      <div class="wheel-body">
        <div ref="wheell" class="wheel" 
          :style="wheelStyle">
        </div>
        <Timer />
      </div>
      <WheelHistory />
    </div>
    <Bets />
  </div>
</template>

<script>
import WheelHistory from '@/views/WheelHistory'
import Bets from '@/views/Bets'
import Timer from '@/views/Timer'
import { data } from '@/data'
import { init } from '@/websocket'

export default {
  components: {
    WheelHistory,
    Bets,
    Timer
  },
  data() {
    return {
      data,
      wheelContainerMarginHorizontal: 50,
      wheelContainerMarginVertical: 25,
      wheelMaxWidth: 400,
      updateKey: 0
    }
  },
  computed: {
    wheelStyle() {
      let width = (window.innerWidth - this.wheelContainerMarginHorizontal);
      width = width > this.wheelMaxWidth ? this.wheelMaxWidth : width;
      return {
        height: width + "px",
        transform: 'rotate(' + this.data.wheelRoteteDegree + 'deg)',
        '--updateKey': this.updateKey
      }
    },
    rootStyle() {
      return {
        '--wheelContainerMargin': this.wheelContainerMarginHorizontal + 'px ' + this.wheelContainerMarginVertical + 'px',
        '--wheelMaxWidth': this.wheelMaxWidth + 'px'
      }
    }
  },
  methods: {
    onResize() {
      this.updateKey++;
    }
  },
  created() {
    init();
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  }
}
</script>

<style scoped>
  .root {
    display: flex;
    flex-direction: column;
  }

  .wheel-container {
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    margin: var(--wheelContainerMargin);
    box-sizing: border-box;
  }

  .wheel-body {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    overflow: hidden;
  }

  .wheel {
    max-width: var(--wheelMaxWidth);
    width: 100%;
    pointer-events: none;
    background: url("https://csgo500tr.com/static/images/wheel_400.png") no-repeat center;
    background-size: 100%;
  }
</style>