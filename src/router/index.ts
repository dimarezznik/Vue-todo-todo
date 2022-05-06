import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TodoPageId from "../views/TodoPageId.vue";
import MainTodoPage from "@/views/MainTodoPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: MainTodoPage,
  },
  {
    path: "/:id",
    name: "todos",

    component: TodoPageId,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
