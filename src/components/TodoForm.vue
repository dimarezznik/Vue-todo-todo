<template>
  <form id="form" class="todo-form" @submit.prevent>
    <slot></slot>
  </form>
</template>

<script>
import MyButton from "@/components/UIComponents/MyButton";
import MyInput from "@/components/UIComponents/MyInput";

export default {
  components: {
    MyButton,
    MyInput,
  },
  props: {
    show: {
      type: Boolean,
    },
  },

  methods: {},
};
</script>

<style scoped>
.todo-form {
  padding: 30px;
  border: 1px solid aqua;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: white;
  gap: 15px;
}
</style>
