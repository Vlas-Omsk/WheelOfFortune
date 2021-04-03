<template>
  <div class="chathelper" v-show="isVisible">
    <div class="container">
      <div
        v-if="items != null && isVisible"
        class="ul-wrapper">
        <ul
          v-for="item in items"
          v-bind:key="item.id"
          v-bind:item="item">
          <li>
            <div class="li-container" :class="{selected: selectedIndex == item.id}">
              {{item.n}}
            </div>
          </li>
        </ul>
      </div>
      <div
        v-else
        class="loading-container">
        <div class="dot-elastic"></div>
      </div>
      <div
        v-show="items && items.length == 0"
        class="nothing">Nothing found</div>
    </div>
  </div>
</template>

<script>
import { on, off } from '@/websocket'

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array
    },
    selectedIndex: {
      type: Number
    }
  },
  created() {
    on('getusers', 'chathelper', (msg) => {
      this.$emit('setSelectedIndex', 0);
      this.$emit('setitems', msg.users);
    });
  },
  destroyed() {
    off('chathelper');
  }
}
</script>

<style scoped>
.chathelper {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transform: translateY(-100%);
}

.ul-wrapper {
  width: 100%;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li, .nothing {
  font-size: 14px;
  font-weight: 600;
  color: rgb(196, 196, 196);
  word-wrap: break-word;
  width: 100%;
  text-align: start;
}

.li-container {
  padding: 10px 0;
  padding-left: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
}

.li-container.selected {
  background-color: #36393f;
}

.container {
  margin: 0 10px;
  padding: 15px 10px;
  margin-bottom: 10px;
  min-height: 60px;
  background-color: #2f3136;
  border-radius: 5px;
  box-sizing: border-box;
}

.loading-container {
  display: flex;
  width: 100%;
  justify-content: center;
}

.dot-elastic {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotElastic 1s infinite linear;
}

.dot-elastic::before, .dot-elastic::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-elastic::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotElasticBefore 1s infinite linear;
}

.dot-elastic::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotElasticAfter 1s infinite linear;
}

@keyframes dotElasticBefore {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.5);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes dotElastic {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 1.5);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}

@keyframes dotElasticAfter {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>