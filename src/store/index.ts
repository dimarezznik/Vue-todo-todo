import { createStore } from "vuex";
import { todo } from "@/store/todo";
export default createStore({
  modules: {
    todo,
  },
});
