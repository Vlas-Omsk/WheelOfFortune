<template>
  <div id="app" :style="appStyle">
    <div class="container header">
      <router-link to="/" class="no-decoration">
        <h1>Wheel of fortune</h1>
      </router-link>
      <div class="right-container">
        <router-link to="/login" class="btn no-decoration" v-if="data.account == null">
          Login
        </router-link>
        <MiniProfile v-else />
      </div>
    </div>
    <hr>
    <div class="columns">
      <div class="scrollable">
        <router-view />
      </div>
      <LeftMenu />
    </div>
    
    <ToastContainer />
    <BetPopup />
  </div>
</template>

<script>
import ToastContainer from '@/views/ToastContainer'
import MiniProfile from '@/views/MiniProfile'
import BetPopup from '@/views/BetPopup'
import LeftMenu from '@/views/LeftMenu'
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
    BetPopup,
    LeftMenu
  },
  created() {
    connect();
  },
  computed: {
    appStyle() {
      return {
        '--leftMenuWidth': this.data.leftMenuWidth + 'px'
      }
    }
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
    display: flex;
    height: 100%;
    flex-direction: column;
  }

  html, body {margin: 0; height: 100%; overflow: hidden}

  body {
    background-color: #26262c;
    margin: 0;
    min-width: 150px;
    overflow: hidden;
  }

  .scrollable {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .columns {
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  hr {
    margin: 0;
    border: none;
    background-color: dimgrey;
    height: 1.5px;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 5px 20px;
    box-sizing: border-box;
  }

  .container .right-container {
    margin-left: auto;
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
    display: block;
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
    cursor: pointer;
    transition: all .1s;
  }

  .btn:hover {
    background-color: #c32d4f!important;
    border-color: #c8354e;
  }

  .buttons-container {
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .buttons-container .btn {
    margin: 2px 5px;
  }

  .no-decoration {
    color: whitesmoke;
    text-decoration: none;
  }

  .btn, .shadow {
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.16), 0 2px 10px 0 rgba(0,0,0,.12);
  }

  .person {
    margin: 2px;
    box-sizing: border-box;
  }

  .header {
    background-color: #1c1c22;
  }

  *::-webkit-scrollbar {
    background-color: rgb(33, 33, 38);
    border-right: 1px;
    border-right-color: rgb(33, 33, 38);
    border-right-style: solid;
    width: 15px;
    height: 15px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgb(101, 101, 103);
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: rgb(83, 83, 83);
  }

  *::-webkit-scrollbar-thumb:active {
    background-color: rgb(67, 67, 69);
  }

  *::-webkit-scrollbar-button:single-button {
    height: 0;
    width: 0;
  }

  * {
    outline: 0;
  }
</style>
