<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style scoped>
button {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid aquamarine;
  background: azure;
  color: blueviolet;
  cursor: pointer;
}
</style>
