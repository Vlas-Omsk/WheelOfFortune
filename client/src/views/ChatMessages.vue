<template>
  <ul ref="chatmessages" class="chatmessages">
    <ChatMessageItem
      v-for="msg in data.messages"
      v-bind:key="msg.id"
      v-bind:id="msg.id"
      v-bind:msg="msg" />
  </ul>
</template>

<script>
import ChatMessageItem from '@/views/ChatMessageItem'
import { data } from '@/data'
import { on, off } from '@/websocket'

export default {
  data() {
    return {
      data,
      lastReadedMessageId: -1
    }
  },
  components: {
    ChatMessageItem
  },
  watch: {
    'data.isChatOpened'() {
      if (this.lastReadedMessageId == -1 && this.data.isChatOpened)
        return;
      if (this.data.isChatOpened) {
        document.getElementById('message' + this.lastReadedMessageId).scrollIntoView();
      } else {
        this.lastReadedMessageId = this.data.messages[0].id;
      }
    }
  },
  created() {
    on('addmessage', 'chatmessages', () => {
      if (this.$refs.chatmessages.scrollHeight - 800 - 99 < this.$refs.chatmessages.scrollTop)
        setTimeout(() => {
          this.$refs.chatmessages.scrollTop = this.$refs.chatmessages.scrollHeight;
        }, 100);
    });
  },
  destroyed() {
    off('chatmessages');
  }
}
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: column-reverse;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 1rem;
}
</style>