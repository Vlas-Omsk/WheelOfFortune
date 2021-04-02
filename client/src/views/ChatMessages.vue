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