import { loadPosts, setLocalStorage } from "@/storage";

export interface postType {
  id: number;
  text: string;
  changeSave: boolean;
  todos: [];
}

export interface postsType {
  posts: postType[];
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
    addTodo(state: any, payload: any) {},
  },
};
