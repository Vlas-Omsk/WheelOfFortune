<template>
  <ul>
    <BetUsersItem
      v-for="user in users"
      v-bind:key="user.id"
      v-bind:user="user" />
  </ul>
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
  }
}
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>