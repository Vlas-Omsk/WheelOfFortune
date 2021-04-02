<template>
  <li :id="'message' + this.id">
    <div class="message-body">
      <router-link class="message-author no-decoration" to="#">{{msg.username}}</router-link>
      <div class="message-content">
        <span v-html="msg.content.replace('\n', '<br>').replace('\r\n', '<br>')"></span>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    msg: {
      type: Object,
      required: true
    },
    id: {
      type: Number
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
</style>