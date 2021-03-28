<template>
  <li @click="$emit('invoke', item.click)">
    {{item.name}}
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
li {
  padding: 10px 15px;
  text-align: start;
  color: rgb(219, 219, 219);
  cursor: pointer;
}
</style>