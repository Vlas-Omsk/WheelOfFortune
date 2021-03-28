<template>
  <div class="overlay"
    :class="{visible: data.betPopup.isVisible}"
    @click="closePopup"
    ref="overlay">
    <div class="popup">
      <div class="popup-content">
        <h2>New bet</h2>
        <div class="field">
          <label>Coins</label>
          <input type="text" v-model="coins" />
        </div>
        <button class="btn" @click="onSubmit">Submit</button>
        <button class="btn" @click="data.betPopup.isVisible = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { bet } from '@/websocket'
import { data } from '@/data'

export default {
  data() {
    return {
      data,
      coins: 0
    }
  },
  methods: {
    closePopup(e) {
      if (e.path[0] == this.$refs.overlay)
        data.betPopup.isVisible = false;
    },
    onSubmit() {
      this.data.betPopup.isVisible = false;
      bet(this.coins, this.data.betPopup.bid);
    }
  }
}
</script>

<style scoped>
  .popup {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    overflow-x: hidden;
    padding: 20px;
    box-sizing: border-box;
    background-color: #1b1f22;
    color: #fff;
    border-radius: 5px;
    transform: scale(0.7, 0.7);

    transition: transform .25s cubic-bezier(.48,1.93,1,.68);
  }

  .popup div.popup-content {
    position: relative;
    height: auto;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .overlay.visible .popup {
    transform: none;
  }

  .overlay {
    display: block;
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .8);
    z-index: 9999;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    transition: opacity .1s ease-in;
  }

  .overlay.visible {
    pointer-events: auto;
    opacity: 1;

    transition: opacity .2s ease-in;
  }
</style>