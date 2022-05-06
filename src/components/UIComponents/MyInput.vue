<template>
  <input :type="type" :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    modelValue: {
      type: String,
    },
  },
  methods: {
    updateInput(e) {
      this.$emit("update:modelValue", e.target.value);
    },
  },
};
</script>

<style scoped>
input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid aquamarine;
  color: blueviolet;
}

input:focus {
  outline: 1px solid aqua;
}
</style>
