<template>
  <div class="left-menu">
    <ul>
      <li @click="toggleChat" :class="{opened: data.isChatOpened}">
        <div class="chatButtonContainer">
          <svg fill="currentColor" viewBox="-21 -47 682.66669 682" xmlns="http://www.w3.org/2000/svg"><path d="m552.011719-1.332031h-464.023438c-48.515625 0-87.988281 39.464843-87.988281 87.988281v283.972656c0 48.414063 39.300781 87.816406 87.675781 87.988282v128.863281l185.191407-128.863281h279.144531c48.515625 0 87.988281-39.472657 87.988281-87.988282v-283.972656c0-48.523438-39.472656-87.988281-87.988281-87.988281zm50.488281 371.960937c0 27.835938-22.648438 50.488282-50.488281 50.488282h-290.910157l-135.925781 94.585937v-94.585937h-37.1875c-27.839843 0-50.488281-22.652344-50.488281-50.488282v-283.972656c0-27.84375 22.648438-50.488281 50.488281-50.488281h464.023438c27.839843 0 50.488281 22.644531 50.488281 50.488281zm0 0"/><path d="m171.292969 131.171875h297.414062v37.5h-297.414062zm0 0"/><path d="m171.292969 211.171875h297.414062v37.5h-297.414062zm0 0"/><path d="m171.292969 291.171875h297.414062v37.5h-297.414062zm0 0"/></svg>
          <div class="newMessagesAvailable" :class="{visible: data.isNewMessagesAwailable}"></div>
        </div>
      </li>
    </ul>
    <Chat />
  </div>
</template>

<script>
import Chat from '@/views/Chat'
import { data } from '@/data'

export default {
  data() {
    return {
      data
    }
  },
  components: {
    Chat
  },
  methods: {
    onResize() {
      if (window.innerWidth < 725)
        this.data.leftMenuWidth = 80;
      else
        this.data.leftMenuWidth = 80 + (this.data.isChatOpened ? 275 : 0);
    },
    toggleChat() {
      this.data.isNewMessagesAwailable = false;
      this.data.isChatOpened = !this.data.isChatOpened;
      this.onResize();
    },
  },
  created() {
    if (window.innerWidth >= 725)
      this.data.isChatOpened = true;
    this.onResize();
    window.addEventListener("resize", this.onResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onResize);
  }
}
</script>

<style scoped>
.left-menu {
  display: flex;
  min-width: var(--leftMenuWidth);
  width: var(--leftMenuWidth);
}

ul {
  min-width: 80px;
  width: 80px;
  height: 100%;
  padding: 0;
  margin: 0;
  background-color: #1c1c22;
  border-right: 1px solid dimgrey;
  box-sizing: border-box;
}

li {
  height: 65px;
  width: 100%;
  padding: 18px;
  cursor: pointer;
  box-sizing: border-box;
}

li.opened svg {
  color: #c8354e;
}

li svg {
  height: 100%;
  color: whitesmoke;
}

.chatButtonContainer {
  height: 100%;
  position: relative;
}

.newMessagesAvailable {
  background-color: #c8354e;
  border-radius: 100%;
  position: absolute;
  display: none;
  width: 10px;
  height: 10px;
  top: 0;
  right: 0;
}

.newMessagesAvailable.visible {
  display: block;
}
</style>