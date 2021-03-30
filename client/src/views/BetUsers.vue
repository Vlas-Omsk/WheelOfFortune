<template>
  <div>
    <div class="container">
      <div class="inline">
        <img class="person" src="user.svg">
        <span>{{users.length}}</span>
      </div>
      <div class="right-container inline">
        <img class="coins" src="coin.svg">
        <span>{{sumCoins()}}</span>
      </div>
    </div>
    <hr>
    <ul>
      <BetUsersItem
        v-for="user in users"
        v-bind:key="user.id"
        v-bind:user="user" />
    </ul>
  </div>
</template>

<script>
import BetUsersItem from '@/views/BetUsersItem'

export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  components: {
    BetUsersItem
  },
  methods: {
    sumCoins() {
      let sum = 0;
      for (let i = 0; i < this.users.length; i++)
        sum += Number(this.users[i].coins);
      return sum;
    }
  }
}
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  hr {
    margin: 5px 10px;
    background-color: var(--color);
  }

  .inline {
    display: flex;
  }

  span {
    font-weight: 700;
    color: var(--color);
    font-size: 14px;
  }

  .person, .coins {
    margin: 0;
    height: 16px;
    margin-right: 5px;
  }

  .container {
    background-color: transparent;
    padding: 5px;
  }
</style>