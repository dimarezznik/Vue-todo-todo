<template>
  <div class="main">
    <my-button @click="openModal">Новая заметка</my-button>
    <my-modal v-model:show="show">
      <todo-form v-model:show="show">
        <my-input
          placeholder="Введите название заметки"
          type="text"
          v-model="text"
          v-on:keydown.enter="addPost(text)"
        />
        <my-button @click="addPost(text)">Добавить заметку</my-button>
      </todo-form>
    </my-modal>
    <template v-if="getPosts.length">
      <todo-list v-for="post in getPosts" :post="post" :key="post.id">
        <div class="post">
          <template v-if="post.changeSave">
            <my-input type="text" v-model="post.text" />
            <my-button @click="saveNewText(post.text, post.id)"
              >Сохранить</my-button
            >
          </template>
          <template v-if="!post.changeSave">
            <p @click="clearStorageTodo(post.id)">{{ post.text }}</p>
            <my-button @click="showInput(!post.changeSave, post.id)"
              >Изменить</my-button
            >
          </template>
          <my-button @click="confirm = true">Удалить</my-button>

          <my-modal v-model:show="confirm">
            <div class="confirm">
              <h3>Вы точно хотите удалить?</h3>
              <div class="btns">
                <my-button @click="removePost(post.id)">Да</my-button>
                <my-button @click="confirm = false">Нет</my-button>
              </div>
            </div>
          </my-modal>
        </div>
        <template v-if="post.todos.length">
          <ul class="inside_todo">
            <li
              v-for="todo in showInsideTodo(post.todos)"
              :style="todo.isDone ? 'text-decoration: line-through' : ''"
            >
              <span>{{ todo.text }}</span>
            </li>
            <template v-if="post.todos.length > 3"> ... </template>
          </ul>
        </template>
      </todo-list>
    </template>
    <template v-else>
      <h1>Заметок пока нет.</h1>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MyButton from "@/components/UIComponents/MyButton.vue";
import MyInput from "@/components/UIComponents/MyInput.vue";
import MyModal from "@/components/UIComponents/MyModal.vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoList from "@/components/TodoList.vue";
import { postsType } from "@/store/todo";
import client from "@/storage";

export default defineComponent({
  components: {
    TodoList,
    TodoForm,
    MyInput,
    MyButton,
    MyModal,
  },
  data() {
    return {
      confirm: false,
      show: false,
      text: "",
      changeInput: false,
      changeText: "",
    };
  },
  methods: {
    clearStorageTodo(id: number) {
      client.setLocalStorage("todos", []);
      this.$router.push(`/${id}`);
    },
    showInsideTodo(todo: string | any[]) {
      return todo.slice(0, 3);
    },
    openModal() {
      this.show = !this.show;
    },
    addPost(text: string) {
      if (!text.trim()) return;
      this.$store.commit("addPost", text.trim());
      this.openModal();
      this.text = "";
    },
    removePost(id: number) {
      this.$store.commit("removePost", id);
      this.confirm = false;
    },
    showInput(changeSave: boolean, id: number) {
      this.$store.commit("showInput", { changeSave, id });
    },
    saveNewText(text: string, id: number) {
      this.$store.commit("saveNewText", { text, id });
      this.showInput(false, id);
    },
  },
  computed: {
    getPosts(): postsType {
      return this.$store.getters.getPosts;
    },
  },
});
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 50px;
}

p {
  padding: 10px;
  border-bottom: 1px solid aquamarine;
  color: blueviolet;
  cursor: pointer;
}

p:hover {
  color: gold;
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

span {
  color: blueviolet;
}

.btns {
  margin-top: 15px;
  background: white;
  display: flex;
  gap: 15px;
}

.post {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.inside_todo {
  border: 1px solid aquamarine;
  padding: 5px 20px;
}

.done-todo {
  text-decoration: line-through;
}
</style>
