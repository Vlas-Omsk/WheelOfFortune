<template>
  <li class="inline">
    <span class="underline">{{user.username}}</span>
    <div class="inline">
      <img class="coins" src="coin.svg">
      <span>{{user.coins}}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  .underline:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  li {
    padding: 5px;
    height: 30px;
    display: flex;
    justify-content: space-between;
  }

  .inline {
    display: flex;
  }

  .inline.right {
    margin-left: auto;
  }

  .coins {
    height: 15px;
    margin-right: 5px;
  }

  span {
    color: #666;
    font-size: 14px;
  }
</style>