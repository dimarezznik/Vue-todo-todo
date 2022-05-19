<template>
  <div class="inside-page">
    <todo-form class="form-todo">
      <my-button @click="backToMenu">Назад</my-button>
      <my-input
        placeholder="Введите название заметки"
        type="text"
        v-model="text"
        v-on:keydown.enter="addTodo(text)"
      />
      <my-button @click="addTodo(text)">Добавить заметку</my-button>
      <my-button @click="saveChanges($route.params.id)">Сохранить</my-button>
      <my-button @click="cancelAllChanges($route.params.id)"
        >Отменить изменения</my-button
      >
      <my-button @click="repeatCancel">Повторить отмененное</my-button>
    </todo-form>

    <todo-list v-for="todo in getTodo($route.params.id)" :key="todo.id">
      <div class="todo">
        <template v-if="!todo.changeSave">
          <input
            class="check"
            type="checkbox"
            @click="markTodo(todo.id)"
            v-model="todo.isDone"
          />
          <p :class="todo.isDone ? 'done' : 'not-ready'">{{ todo.text }}</p>
          <template v-if="!todo.isDone">
            <my-button @click="changeTodo(todo.id)">Изменить</my-button>
            <my-button @click="show = true">Удалить</my-button>
          </template>
        </template>
        <template v-else>
          <my-input type="text" v-model="todo.text" />
          <my-button @click="saveText(todo.id, todo.text)">Изменить</my-button>
          <my-button @click="cancelChanges(todo.id)">Отменить</my-button>
        </template>
        <my-modal v-model:show="show">
          <div class="confirm">
            <h3>Вы точно хотите удалить?</h3>
            <div class="btns">
              <my-button @click="removeTodo(todo.id)">Да</my-button>
              <my-button @click="show = false">Нет</my-button>
            </div>
          </div>
        </my-modal>
      </div>
    </todo-list>
  </div>
</template>

<script>
import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import MyButton from "@/components/UIComponents/MyButton";
import myInput from "@/components/UIComponents/MyInput";
import MyModal from "@/components/UIComponents/MyModal";
import client from "@/storage";

export default {
  components: { TodoList, TodoForm, MyButton, myInput, MyModal },

  data() {
    return {
      text: "",
      show: false,
    };
  },
  methods: {
    backToMenu() {
      this.$router.push("/");
      this.$store.commit("backToMenu", { postId: this.$route.params.id });
    },
    repeatCancel() {
      if (client.loadPosts("todos").length) {
        this.$store.commit("repeatCancel", { postId: this.$route.params.id });
      }
    },
    getTodo(id) {
      return this.allPosts.find((post) => post.id === Number(id))?.todos;
    },
    addTodo(text) {
      if (!this.text.trim()) return;
      this.$store.commit("addTodo", { text, postId: this.$route.params.id });
      this.text = "";
    },

    removeTodo(id) {
      this.$store.commit("removeTodo", { postId: this.$route.params.id, id });
      this.show = false;
    },
    changeTodo(id) {
      this.$store.commit("changeTodo", { postId: this.$route.params.id, id });
    },
    saveText(id, text) {
      this.$store.commit("saveText", {
        postId: this.$route.params.id,
        id,
        text,
      });
    },
    cancelChanges(id) {
      this.$store.commit("cancelChanges", {
        postId: this.$route.params.id,
        id,
      });
    },
    cancelAllChanges() {
      this.$store.commit("cancelAllChanges", { postId: this.$route.params.id });
    },
    markTodo(id) {
      this.$store.commit("markTodo", { postId: this.$route.params.id, id });
    },
    saveChanges() {
      client.setLocalStorage("posts", this.allPosts);
    },
  },
  computed: {
    allPosts() {
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

.todo {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
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
