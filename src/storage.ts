import { postsType } from "@/store/todo";

export function loadPosts(key: string) {
  const json: string | null = localStorage.getItem(key);
  return json ? JSON.parse(json) : [];
}

export function setLocalStorage(key: string, posts: any) {
  localStorage.setItem(key, JSON.stringify(posts));
}
