<template>
  <div id="app" :style="appStyle" :class="{useCustomScrollbar: !isMobile}">
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
import { postData } from '@/methods'

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
    },
    isMobile() {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
          || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
          return true;
      }
      return false;
    }
  },
  mounted() {
    postData('/api/check', {}, () => {}, (data) => {
      this.data.account = data;
    });
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

  .useCustomScrollbar *::-webkit-scrollbar {
    background-color: rgb(33, 33, 38);
    border-right: 1px;
    border-right-color: rgb(33, 33, 38);
    border-right-style: solid;
    width: 15px;
    height: 15px;
  }

  .useCustomScrollbar *::-webkit-scrollbar-thumb {
    background-color: rgb(101, 101, 103);
  }

  .useCustomScrollbar *::-webkit-scrollbar-thumb:hover {
    background-color: rgb(83, 83, 83);
  }

  .useCustomScrollbar *::-webkit-scrollbar-thumb:active {
    background-color: rgb(67, 67, 69);
  }

  .useCustomScrollbar *::-webkit-scrollbar-button:single-button {
    height: 0;
    width: 0;
  }

  * {
    outline: 0;
  }
</style>
