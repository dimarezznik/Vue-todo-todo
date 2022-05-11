import { loadPosts, setLocalStorage } from "@/storage";

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
    if (Number(payload.urlId) === post.id) {
      return post.todos;
    }
  });
}

export const todo = {
  state: () => ({
    posts: loadPosts("posts"),
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
      setLocalStorage("posts", state.posts);
    },
    removePost(state: postsType, id: number) {
      state.posts = state.posts.filter((post: postType) => post.id !== id);
      setLocalStorage("posts", state.posts);
    },
    saveNewText(state: postsType, payload: { id: number; text: string }) {
      state.posts.forEach((post: postType) => {
        if (post.id === payload.id) {
          post.text = payload.text;
        }
      });
      setLocalStorage("posts", state.posts);
    },
    showInput(state: postsType, payload: { id: number; changeSave: boolean }) {
      state.posts.forEach((post: postType) => {
        if (post.id === payload.id) {
          post.changeSave = payload.changeSave;
        }
      });
      setLocalStorage("posts", state.posts);
    },
    addTodo(state: postsType, payload: { text: string }) {
      todoFromPosts(state, payload).todos.push({
        id: Date.now(),
        text: payload.text,
        changeSave: false,
        isDone: false,
      });
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
    },
    cancelChanges(state: postsType, payload: { id: number }) {
      let text: string;
      loadPosts("posts").forEach((arr: postType) => {
        arr.todos.forEach((todo: TodosTypes) => {
          if (todo.id == payload.id) {
            text = todo.text;
          }
        });
      });
      todoFromPosts(state, payload).todos.forEach((todo: TodosTypes) => {
        if (todo.id === payload.id) {
          todo.changeSave = !todo.changeSave;
          todo.text = text;
        }
      });
    },
    cancelAllChanges(state: postsType) {
      state.posts = loadPosts("posts");
    },
    markTodo(state: postsType, payload: { id: number }) {
      todoFromPosts(state, payload).todos.forEach((todo: TodosTypes) => {
        if (todo.id === payload.id) {
          todo.isDone = !todo.isDone;
        }
      });
    },
  },
};
