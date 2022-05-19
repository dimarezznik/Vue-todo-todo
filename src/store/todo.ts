import client from "@/storage";

export interface postType {
  id: number;
  text: string;
  changeSave: boolean;
  todos: TodosTypes[];
}

export interface postsType {
  posts: postType[];
}

interface TodosTypes {
  id: number;
  text: string;
  changeSave: boolean;
  isDone: boolean;
}

function todoFromPosts(state: any, payload: any) {
  return state.posts.find((post: postType) => {
    if (Number(payload.postId) === post.id) {
      return post.todos;
    }
  });
}

export const todo = {
  state: () => ({
    posts: client.loadPosts("posts"),
  }),
  getters: {
    getPosts(state: postsType) {
      return state.posts;
    },
  },
  mutations: {
    addPost(state: postsType, text: string): void {
      state.posts.push({
        todos: [],
        id: Date.now(),
        text: text,
        changeSave: false,
      });
      client.setLocalStorage("posts", state.posts);
    },
    removePost(state: postsType, id: number) {
      state.posts = state.posts.filter((post: postType) => post.id !== id);
      client.setLocalStorage("posts", state.posts);
    },
    saveNewText(state: postsType, payload: { id: number; text: string }) {
      state.posts.forEach((post: postType) => {
        if (post.id === payload.id) {
          post.text = payload.text;
        }
      });
      client.setLocalStorage("posts", state.posts);
    },
    showInput(state: postsType, payload: { id: number; changeSave: boolean }) {
      state.posts.forEach((post: postType) => {
        if (post.id === payload.id) {
          post.changeSave = payload.changeSave;
        }
      });
      client.setLocalStorage("posts", state.posts);
    },
    addTodo(state: postsType, payload: { text: string }) {
      todoFromPosts(state, payload).todos.push({
        id: Date.now(),
        text: payload.text,
        changeSave: false,
        isDone: false,
      });
      client.setLocalStorage("todos", todoFromPosts(state, payload).todos);
    },
    removeTodo(state: postsType, payload: { id: number }) {
      todoFromPosts(state, payload).todos = todoFromPosts(
        state,
        payload
      ).todos.filter((todo: TodosTypes) => todo.id !== payload.id);
    },
    changeTodo(state: postsType, payload: { id: number }) {
      todoFromPosts(state, payload).todos.forEach((todo: TodosTypes) => {
        if (todo.id === payload.id) todo.changeSave = !todo.changeSave;
      });
    },
    saveText(state: postsType, payload: { id: number; text: string }) {
      todoFromPosts(state, payload).todos.forEach((todo: TodosTypes) => {
        if (todo.id === payload.id) {
          todo.changeSave = !todo.changeSave;
          todo.text = payload.text;
        }
      });
      client.setLocalStorage("todos", todoFromPosts(state, payload).todos);
    },
    cancelChanges(state: postsType, payload: { id: number }) {
      let text: string;
      client.loadPosts("todos").forEach((todo: postType) => {
        if (todo.id == payload.id) {
          text = todo.text;
        }
      });
      todoFromPosts(state, payload).todos.forEach((todo: TodosTypes) => {
        if (todo.id === payload.id) {
          todo.changeSave = !todo.changeSave;
          todo.text = text;
        }
      });
    },
    cancelAllChanges(state: postsType) {
      state.posts = client.loadPosts("posts");
    },
    markTodo(state: postsType, payload: { id: number }) {
      todoFromPosts(state, payload).todos.forEach((todo: TodosTypes) => {
        if (todo.id === payload.id) {
          todo.isDone = !todo.isDone;
        }
      });
      client.setLocalStorage("todos", todoFromPosts(state, payload).todos);
    },
    repeatCancel(state: postsType, payload: { id: number }) {
      todoFromPosts(state, payload).todos = client.loadPosts("todos");
    },
    backToMenu(state: postsType) {
      state.posts = client.loadPosts("posts");
    },
  },
};
