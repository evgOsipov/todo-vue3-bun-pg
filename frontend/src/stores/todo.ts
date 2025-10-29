import { defineStore } from 'pinia';
import { ref } from 'vue';
import { todoApi } from '../api/todo.ts';

interface Todo {
  id: string;
  task: string;
  status: string;
  expireDate: string;
}
export const useTodo = defineStore('todo', () => {
const todos = ref<Todo[]>([]);

  const getAllTodos = async () => {
    todos.value = await todoApi.getAll();
  };

  return {
    todos,
    getAllTodos,
  };
});
