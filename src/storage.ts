import { postsType } from "@/store/todo";

interface PostsStorage {
  loadPosts: (key: string) => string | null | [];
  setLocalStorage: (key: string, posts: postsType) => void;
}

class PostsLocalStorage implements PostsStorage {
  loadPosts(key: string) {
    const json: string | null = localStorage.getItem(key);
    return json ? JSON.parse(json) : [];
  }
  setLocalStorage(key: string, posts: any) {
    localStorage.setItem(key, JSON.stringify(posts));
  }
}

const client = new PostsLocalStorage();
export default client;
