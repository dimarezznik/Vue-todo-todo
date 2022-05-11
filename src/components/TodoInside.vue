<template>
  <div class="inside-page">
    <todo-form class="form-todo">
      <my-button @click="$router.push('/')">Назад</my-button>
      <my-input
        placeholder="Введите название заметки"
        type="text"
        v-model="text"
        v-on:keydown.enter="addTodo($route.params.id, text)"
      />
      <my-button @click="addTodo($route.params.id, text)"
        >Добавить заметку</my-button
      >
      <my-button @click="saveChanges($route.params.id)">Сохранить</my-button>
      <my-button @click="cancelAllChanges($route.params.id)"
        >Отменить изменения</my-button
      >
    </todo-form>

    <todo-list v-for="todo in getTodo($route.params.id)" :key="todo.id">
      <template v-if="!todo.changeSave">
        <input
          class="check"
          type="checkbox"
          @click="markTodo($route.params.id, todo.id)"
          v-model="todo.isDone"
        />
        <p :class="todo.isDone ? 'done' : 'not-ready'">{{ todo.text }}</p>
        <template v-if="!todo.isDone">
          <my-button @click="changeTodo($route.params.id, todo.id)"
            >Изменить</my-button
          >
          <my-button @click="show = true">Удалить</my-button>
        </template>
      </template>
      <template v-else>
        <my-input type="text" v-model="todo.text" />
        <my-button @click="saveText($route.params.id, todo.id, todo.text)"
          >Изменить</my-button
        >
        <my-button @click="cancelChanges($route.params.id, todo.id)"
          >Отменить</my-button
        >
      </template>
      <my-modal v-model:show="show">
        <div class="confirm">
          <h3>Вы точно хотите удалить?</h3>
          <div class="btns">
            <my-button
              @click="removeTodo($route.params.id, todo.id), (show = false)"
              >Да</my-button
            >
            <my-button @click="show = false">Нет</my-button>
          </div>
        </div>
      </my-modal>
    </todo-list>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import MyButton from "@/components/UIComponents/MyButton";
import myInput from "@/components/UIComponents/MyInput";
import MyModal from "@/components/UIComponents/MyModal";
import { setLocalStorage } from "@/storage";

export default {
  components: { TodoList, TodoForm, MyButton, myInput, MyModal },

  data() {
    return {
      text: "",
      show: false,
    };
  },
  methods: {
    getTodo(id) {
      return this.getPosts.find((post) => post.id === Number(id)).todos;
    },
    addTodo(urlId, text) {
      if (!this.text.trim()) return;
      this.$store.commit("addTodo", { urlId, text });
      this.text = "";
    },

    removeTodo(urlId, id) {
      this.$store.commit("removeTodo", { urlId, id });
    },
    changeTodo(urlId, id) {
      this.$store.commit("changeTodo", { urlId, id });
    },
    saveText(urlId, id, text) {
      this.$store.commit("saveText", { urlId, id, text });
    },
    cancelChanges(urlId, id) {
      this.$store.commit("cancelChanges", { urlId, id });
    },
    cancelAllChanges(urlId) {
      this.$store.commit("cancelAllChanges", { urlId });
    },
    markTodo(urlId, id) {
      this.$store.commit("markTodo", { urlId, id });
    },
    saveChanges() {
      setLocalStorage("posts", this.getPosts);
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
.not-ready {
  padding: 10px;
  border-bottom: 1px solid aquamarine;
  color: blueviolet;
  transition: ease 0.4s;
}

.confirm {
  position: relative;
  padding: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50px);
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  background: white;
}

.btns {
  margin-top: 15px;
  display: flex;
  gap: 30px;
  background: white;
}

.done {
  transition: ease 0.4s;
  color: gray;
}

.check:checked + p {
  text-decoration: line-through;
}
</style>
