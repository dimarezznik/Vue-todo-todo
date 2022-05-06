<template>
  <div class="inside-page">
    <todo-form class="form-todo">
      <my-button @click="$router.push('/')">Назад</my-button>
      <my-input
        placeholder="Введите название заметки"
        type="text"
        v-model="text"
      />
      <my-button @click="addTodo($route.params.id, text)"
        >Добавить заметку</my-button
      >
    </todo-form>
    <template v-if="getTodo($route.params.id).todos.length">
      <todo-list
        v-for="todo in getTodo($route.params.id)?.todos"
        :key="todo.id"
      >
        <template v-if="todo.check">
          <my-input type="text" v-model="todo.text" />
          <my-button @click="saveChanges($route.params.id, todo.id)"
            >Сохранить</my-button
          >
          <my-button @click="removeTodo($route.params.id, todo.id)"
            >Удалить</my-button
          >
        </template>
        <template v-if="!todo.check">
          <p>{{ todo.text }}</p>
          <my-button @click="changeTodo(todo.id, $route.params.id)"
            >Изменить</my-button
          >
          <my-button @click="removeTodo($route.params.id, todo.id)"
            >Удалить</my-button
          >
        </template>
      </todo-list>
    </template>
    <template v-else>
      <h1>Заметки отсутсвуют.</h1>
    </template>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import MyButton from "@/components/UIComponents/MyButton";
import myInput from "@/components/UIComponents/MyInput";
import { setLocalStorage } from "@/storage";

export default {
  components: { TodoList, TodoForm, MyButton, myInput },

  data() {
    return {
      text: "",
    };
  },
  methods: {
    getTodo(id) {
      return this.getPosts.find((post) => post.id === Number(id));
    },
    addTodo(id, text) {
      if (!this.text.trim()) return;
      this.getTodo(id).todos.push({
        id: Date.now(),
        text: this.text,
        check: false,
      });
      this.text = "";
      setLocalStorage("todos", this.getTodo(id).todos);
    },

    removeTodo(urlId, id) {
      this.getTodo(urlId).todos = this.getTodo(urlId).todos.filter(
        (todo) => todo.id !== id
      );
    },
    changeTodo(id, urlId) {
      this.getTodo(urlId).todos.forEach((todo) => {
        if (todo.id === id) {
          todo.check = !todo.check;
        }
      });
    },
    saveChanges(urlId, id) {
      this.getTodo(urlId).todos.forEach((todo) => {
        if (todo.id === id) {
          todo.check = !todo.check;
        }
      });
    },
  },
  computed: {
    getPosts() {
      return this.$store.getters.getPosts;
    },
  },
};
</script>

<style scoped>
.inside-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 50px;
}
.form-todo {
  background: #e5e5e5e5;
}
p {
  padding: 10px;
  border-bottom: 1px solid aquamarine;
  color: blueviolet;
}
</style>
