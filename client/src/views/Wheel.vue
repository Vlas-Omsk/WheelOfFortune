<template>
  <div class="root">
    <div class="wheel-container">
      <div class="wheel-body">
        <div class="wheel" 
          :style="wheelStyle">
        </div>
        <Timer />
      </div>
      <WheelHistory />
    </div>
    <!-- <button 
      @click="spinWheel"
      :class="{locked: isSpinning}"
    >Test spin</button> -->
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
      data
    }
  },
  computed: {
    wheelStyle() {
      return {
        transform: 'rotate(' + this.data.wheelRoteteDegree + 'deg)'
      }
    }
  },
  created() {
    init();
  }
}
</script>

<style scoped>
  .root {
    display: flex;
    flex-direction: column;
  }

  .wheel-container {
    display: flex;
    align-items: center;
    max-width: 800px;
    margin: auto;
  }

  .wheel-body {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 50px 25px;
  }

  .wheel {
    width: 400px;
    height: 400px;
    background: url('https://csgo500tr.com/static/images/wheel_400.png') no-repeat center;
    pointer-events: none;
  }

  button {
    margin: 15px auto;
    width: 120px;
  }

  button.locked {
    pointer-events: none;
    opacity: 0.3;
  }
</style>