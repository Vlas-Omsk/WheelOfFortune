<template>
  <div class="chat" :class="{opened: data.isChatOpened}">
    <ChatMessages ref="chatmessages" />
    <div class="signin-plug message" v-show="data.account == null" :style="inputStyle">
      <div class="input">
        Please <router-link class="no-decoration" style="color: #c8354e" to="/login">sign in</router-link> to chat
      </div>
    </div>
    <div class="message" v-show="data.account != null">
      <textarea :style="inputStyle" @input="onInput" @keypress="onKeypress" @keydown="onKeydown" class="input" ref="inputMessage" placeholder="Your message..." type="text" maxlength="140" autocomplete="off" data-lpignore="true"></textarea>
      <div class="send" @click="sendMessage" :class="{locked: isSendButtonLocked}">
        <svg class="send_image" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="535.5px" height="535.5px" viewBox="0 0 535.5 535.5" style="enable-background:new 0 0 535.5 535.5;" xml:space="preserve"><g><g id="send"><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"/></g></g></svg>
      </div>
      <ChatHelper
        v-bind:isVisible="isChatHelperVisible"
        v-bind:items="itemsChatHelper"
        v-bind:selectedIndex="selectedIndexChatHelper"
        @setitems="setitems"
        @setSelectedIndex="setSelectedIndex" />
    </div>
  </div>
</template>

<script>
import ChatMessages from '@/views/ChatMessages'
import ChatHelper from '@/views/ChatHelper'
import { addmessage, getusers, on, off } from '@/websocket'
import { data } from '@/data'
import { isEmpty } from '@/methods'

export default {
  components: {
    ChatMessages,
    ChatHelper,
  },
  data() {
    return {
      inputLabelHeight: 43,
      data,
      responseWaiting: false,
      ___message: '',
      isChatHelperVisible: false,
      specialValue: null,
      itemsChatHelper: null,
      selectedIndexChatHelper: 0
    }
  },
  computed: {
    message: {
      get() {
        return this.$data.___message;
      },
      set(val) {
        this.$refs.inputMessage.value = val;
        this.$data.___message = val;
      }
    },
    inputStyle() {
      return {
        height: this.inputLabelHeight + 'px'
      }
    },
    isSendButtonLocked() {
      if (this.responseWaiting)
        return true;
      if (isEmpty(this.message.trim()))
        return true;
      return false;
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
    setitems(items) {
      this.itemsChatHelper = items;
    },
    setSelectedIndex(index) {
      this.selectedIndexChatHelper = index
    },
    detectSpecialCommand(target) {
      var begin = this.message.substr(0, target.selectionStart).lastIndexOf('@');
      if (begin != -1) {
        begin += 0;
        var end = this.message.indexOf(' ', begin);
        if (end == -1)
          end = this.message.length - 1;
        this.specialValue = this.message.substr(begin, end - begin + 1);
      } else this.specialValue = null
      if (this.specialValue && this.specialValue.indexOf(' ') == -1) {
        this.itemsChatHelper = null;
        this.isChatHelperVisible = true;
        var savedValue = this.specialValue;
        setTimeout(() => {
          if (this.isChatHelperVisible && savedValue == this.specialValue)
            getusers(savedValue.slice(1));
        }, 500);
      } else
        this.isChatHelperVisible = false;
    },
    onInput(e) {
      this.message = e.target.value;
      this.detectSpecialCommand(e.target);
      this.inputLabelHeight = this.getTextHeight(!isEmpty(this.message) ? this.message : 'space', e.target);
    },
    sendMessage() {
      if (isEmpty(this.message.trim()))
        return;
      this.responseWaiting = true;
      addmessage(this.message);
      this.message = '';
      this.$refs.inputMessage.focus();
      this.inputLabelHeight = this.getTextHeight('space', this.$refs.inputMessage);
    },
    onKeypress(e) {
      if (e.code === 'Enter' && !e.shiftKey && !this.isChatHelperVisible) {
        e.preventDefault();
        this.sendMessage();
      } else if (e.code === 'Enter' && this.isChatHelperVisible && this.itemsChatHelper.length != 0) {
        e.preventDefault();
        this.message += this.itemsChatHelper[this.selectedIndexChatHelper].n + " ";
        this.isChatHelperVisible = false;
      }
    },
    onKeydown(e) {
      if (e.code == 'ArrowDown' && this.isChatHelperVisible) {
        e.preventDefault();
        this.selectedIndexChatHelper += 1;
        if (this.selectedIndexChatHelper >= this.itemsChatHelper.length)
          this.selectedIndexChatHelper = 0;
      } else if (e.code == 'ArrowUp' && this.isChatHelperVisible) {
        e.preventDefault();
        this.selectedIndexChatHelper -= 1;
        if (this.selectedIndexChatHelper < 0)
          this.selectedIndexChatHelper = this.itemsChatHelper.length - 1;
      }
    }
  },
  created() {
    on('addmessage', 'chat', () => {
      this.responseWaiting = false;
    });
    on('error', 'chat', (msg) => {
      if (msg.reqtype == 'addmessage')
        this.responseWaiting = false;
    });
  },
  destroyed() {
    off('chat');
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
  position: relative;
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
  transition: opacity .1s, color .1s;
}

.message .send.locked {
  pointer-events: none;
  opacity: 0.4;
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