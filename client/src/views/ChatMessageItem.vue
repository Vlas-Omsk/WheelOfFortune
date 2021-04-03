<template>
  <li :id="'message' + this.id">
    <div class="message-body">
      <router-link class="message-author no-decoration" :class="{'own-message': isOwnMessage}" to="#">{{msg.username}}</router-link>
      <div class="message-content">
        <span>{{getContent}}</span>
      </div>
    </div>
  </li>
</template>

<script>
import { data } from '@/data'

export default {
  data() {
    return {
      data
    }
  },
  props: {
    msg: {
      type: Object,
      required: true
    },
    id: {
      type: Number
    }
  },
  computed: {
    isOwnMessage() {
      if (!this.data.account)
        return false;
      else if (this.data.account.uid == this.msg.uid)
        return true;
      return false;
    },
    getContent() {
      return this.msg.content.replace('\n', '<br>').replace('\r\n', '<br>')
    }
  }
}
</script>

<style scoped>
li {
  box-sizing: border-box;
  padding-top: 1.5rem;
  padding-bottom: 0;
  padding-left: 1rem;
  padding-right: 1rem;
}

.message-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.message-author {
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 600;
  color: rgb(196, 196, 196);
  word-wrap: break-word;
}

.message-content {
  word-wrap: break-word;
  font-size: 13px;
  color: #888;
  overflow: hidden;
  margin-top: 2px;
  box-sizing: border-box;
}

.message-content span {
  word-break: break-word;
  display: block;
  text-align: left;
}

.own-message {
  color: rgb(118, 118, 255);
}
</style>

<style>
.user-reference {
  display: inline-block;
  border-radius: 10%;
  padding: 2px 4px!important;
  background: #35353a;
  font-weight: bold;
  cursor: pointer;
  color: rgb(199, 199, 199);
  text-decoration: none;
}

.user-reference:hover {
  text-decoration: underline;
}
</style>