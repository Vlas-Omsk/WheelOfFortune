<template>
  <div class="chat" :class="{opened: data.isChatOpened}">
    <ChatMessages />
    <div class="signin-plug message" v-if="data.account == null" :style="inputStyle">
      <div class="input">
        Please <router-link class="no-decoration" style="color: #c8354e" to="/login">sign in</router-link> to chat
      </div>
    </div>
    <div class="message" v-else>
      <textarea :style="inputStyle" @input="onInput" @keypress="onKeypress" class="input" ref="inputMessage" placeholder="Your message..." type="text" maxlength="140" autocomplete="off" data-lpignore="true" v-model="message"></textarea>
      <div class="send" @click="sendMessage">
        <svg class="send_image" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="535.5px" height="535.5px" viewBox="0 0 535.5 535.5" style="enable-background:new 0 0 535.5 535.5;" xml:space="preserve"><g><g id="send"><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"/></g></g></svg>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMessages from '@/views/ChatMessages'
import { addmessage } from '@/websocket'
import { data } from '@/data'

export default {
  components: {
    ChatMessages
  },
  data() {
    return {
      inputLabelHeight: 43,
      message: '',
      data
    }
  },
  computed: {
    inputStyle() {
      return {
        height: this.inputLabelHeight + 'px'
      }
    }
  },
  methods: {
    getTextHeight(text, el) {
      var div = document.createElement('div');
      div.style.wordBreak = 'break-all';
      var compStyle = window.getComputedStyle(el);
      div.style.lineHeight = compStyle.lineHeight;
      div.style.fontSize = compStyle.fontSize;
      div.style.fontFamily = compStyle.fontFamily;
      div.style.padding = compStyle.padding;
      div.style.paddingBlockEnd = compStyle.paddingBlockEnd;
      div.style.paddingBlockStart = compStyle.paddingBlockStart;
      div.style.paddingBottom = compStyle.paddingBottom;
      div.style.paddingInlineEnd = compStyle.paddingInlineEnd;
      div.style.paddingInlineStart = compStyle.paddingInlineStart;
      div.style.paddingLeft = compStyle.paddingLeft;
      div.style.paddingRight = compStyle.paddingRight;
      div.style.paddingTop = compStyle.paddingTop;
      div.style.margin = compStyle.margin;
      div.style.boxSizing = compStyle.boxSizing;
      div.style.width = el.clientWidth + 'px';
      // div.style.position = 'absolute';
      // div.style.color = '#fff'
      // div.style.top = 0;
      div.innerText = text;
      document.body.appendChild(div);
      let height = div.clientHeight;
      document.body.removeChild(div);
      return height;
    },
    onInput(e) {
      this.inputLabelHeight = this.getTextHeight(e.target.value ? e.target.value : 'space', e.target);
    },
    sendMessage() {
      addmessage(this.message);
      this.message = '';
      this.inputLabelHeight = this.getTextHeight('space', this.$refs.inputMessage);
    },
    onKeypress(e) {
      if (e.code === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    }
  }
}
</script>

<style scoped>
.chat {
  background-color: #1c1c22;
  height: 100%;
  width: 100%;
  display: none;
  flex-direction: column;
  justify-content: flex-end;
}

.chat.opened {
  display: flex;
}

@media (max-width: 725px) {
  .chat {
    width: calc(100% - var(--leftMenuWidth));
    margin-left: var(--leftMenuWidth);
    display: none;
    position: absolute;
  }
}

.messages {
  height: 100%;
}

.message {
  margin: 0;
  padding-left: 1rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  background-color: #17171c;
}

.message .input {
  border: none;
  padding: 14px;
  background: inherit;
  margin: 0;
  resize: none;
  font-size: 13px;
  overflow: auto;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  color: whitesmoke;
  overflow: hidden;
}

.message .send {
  align-self: center;
  display: block;
  width: 24px;
  height: 24px;
  font-size: 2rem;
  color: #636373;
  transition: color .1s;
  user-select: none;
  margin-right: .75rem;
  cursor: pointer;
}

.message .send:hover {
  color: #c8354e;
}

.message .send .send_image {
  display: block;
  width: 100%;
  height: 100%;
}

.signin-plug {
  padding: 0;
}
</style>