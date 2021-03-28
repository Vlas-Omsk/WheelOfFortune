<template>
  <div id="app">
    <div class="header">
      <router-link to="/" class="no-decoration">
        <h1>Wheel of fortune</h1>
      </router-link>
      <router-link to="/login" class="btn no-decoration" v-if="data.account == null">
        Login
      </router-link>
      <MiniProfile v-else />
    </div>
    <hr>
    <router-view />
    <ToastContainer />
    <BetPopup />
  </div>
</template>

<script>
import ToastContainer from '@/views/ToastContainer'
import MiniProfile from '@/views/MiniProfile'
import BetPopup from '@/views/BetPopup'
import { connect } from '@/websocket'
import { data } from '@/data'

export default {
  name: 'App',
  data() {
    return {
      data
    }
  },
  components: {
    ToastContainer,
    MiniProfile,
    BetPopup
  },
  created() {
    connect();

    setInterval(() => {
      if (data.currentTime > 0)
        data.currentTime -= 0.01
      else if (data.currentTime != 0)
        data.currentTime = 0;
    }, 10);
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: whitesmoke;
  }

  body {
    background-color: #26262c;
    overflow-x: hidden;
    margin: 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1c1c22;
    padding: 15px 15px 0px 15px;
    box-sizing: border-box;
  }

  .field {
    display: flex;
    flex-direction: column;
    margin: 20px 0;
  }

  .field input[type=text] {
    margin-top: 5px;
    margin-bottom: 3px;
    background: #202026;
    height: 45px;
    border: none;
    box-shadow: none;
    color: #a1a1a7;
    font-size: 12px;
    border-radius: 4px;
    padding: 0 10px;
  }

  .field label {
    margin-right: auto;
    font-size: 14px;
    color: #8b8b9c;
  }

  .btn {
    background: #c8354e;
    border-color: #c8354e;
    border-bottom-color: #b32b4a;
    font-size: 15px;
    border: 1px solid #1c1c22;
    color: whitesmoke;
    padding: .5rem 1rem;
    border-radius: 4px;
    height: initial!important;
    font-weight: 400;
    transition: all .1s;
  }

  .btn:hover {
    background-color: #c32d4f!important;
    border-color: #c8354e;
  }

  .no-decoration {
    color: whitesmoke;
    text-decoration: none;
  }

  .btn, .shadow {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
  }

  .person {
    max-height: 28px;
    height: 100%;
    width: auto;
    margin: 2px;
  }
</style>
