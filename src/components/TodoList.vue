<template>
  <div class="todo-list">
    <slot></slot>
  </div>
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
    post: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.todo-list {
  border: 1px solid aqua;
  padding: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
</style>
