<template>
  <ul :class="{opened: isDropdownOpened}">
    <MiniProfileDropdownItem
      v-for="item in items"
      v-bind:key="item.name"
      v-bind:item="item"
      @invoke="invoke" />
  </ul>
</template>

<script>
import MiniProfileDropdownItem from '@/views/MiniProfileDropdownItem'
import { data } from '@/data'

export default {
  components: {
    MiniProfileDropdownItem
  },
  props: {
    isDropdownOpened: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      data,
      items: [
        {
          name: "Settings",
          click(data) {
            
          }
        },
        {
          name: "Sign out",
          click(data) {
            data.account = null;
          }
        }
      ]
    }
  },
  methods: {
    invoke(func) {
      this.$emit('invoke');
      func(this.data);
    }
  }
}
</script>

<style scoped>
ul {
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 160px;
  background-color: #1c1c22;
  right: 0;
  border: black 1px solid;
  border-radius: 4px;
  opacity: 0;
  display: none;
  transition: opacity .1s, display 0s;
  transition-delay: 0s, 1s;
  z-index: 999;
}

ul.opened {
  opacity: 1;
  display: block;
  transition-delay: 0s, 0s;
}
</style>