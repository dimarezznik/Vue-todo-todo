<template>
  <div class="todos">
    <todo-inside />
  </div>
</template>

<script>
import TodoInside from "@/components/TodoInside";

export default {
  components: { TodoInside },
};
</script>

<style scoped>
.todos {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
