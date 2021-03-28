<template>
  <div class="miniprofile-root">
    <div class="miniprofile" @click="isDropdownOpened = !isDropdownOpened">
      <div class="miniprofile-container">
        <div class="username">{{data.account.username}}</div>
        <div class="coins">
          <img src="coin.svg">
          <div>{{data.account.coins}}</div>
        </div>
      </div>
      <img class="dropdownarrow" :class="{opened: isDropdownOpened}" src="arrow.svg">
      <img class="person" src="user.svg">
    </div>
    <MiniProfileDropdown
      v-bind:isDropdownOpened="isDropdownOpened"
      @invoke="invoke" />
  </div>
</template>

<script>
import MiniProfileDropdown from '@/views/MiniProfileDropdown'
import { data } from '@/data'

export default {
  components: {
    MiniProfileDropdown
  },
  data() {
    return {
      data,
      isDropdownOpened: false
    }
  },
  methods: {
    invoke() {
      this.isDropdownOpened = false;
    }
  }
}
</script>

<style scoped>
.miniprofile-root {
  position: relative;
}

.miniprofile {
  display: flex;
  cursor: pointer;
}

.miniprofile-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.username {
  font-size: 14px;
  font-weight: bold;
}

.coins {
  display: flex;
  font-size: 12px;
  color: rgb(173, 173, 173);
  align-items: center;
}

.coins img {
  height: 10px;
  margin-right: 5px;
}

.dropdownarrow {
  width: 10px;
  margin: 10px;
  transition: transform .1s;
}

.dropdownarrow.opened {
  transform: rotate(180deg);
}
</style>