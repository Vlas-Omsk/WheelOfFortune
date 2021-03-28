<template>
  <li class="shadow">
    {{toast.content}}
  </li>
</template>

<script>
export default {
  props: {
    toast: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
li {
  background-color: #a22238;
  border: 1px solid #c8354e;
  color: #fff;
  font-weight: 600;
  font-family: 'Open Sans',Roboto,Helvetica,Arial,sans-serif;
  user-select: none;
  border-radius: 2px;
  top: 0;
  width: auto;
  clear: both;
  margin-top: 10px;
  position: relative;
  width: 50vw;
  max-width: 400px;
  height: auto;
  min-height: 32px;
  word-break: break-all;
  padding: 10px 25px;
  font-size: 0.9rem;
  box-sizing: border-box;
}
</style>