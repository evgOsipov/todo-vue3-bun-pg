<template>
  <v-table class="border" striped="odd" hover>
    <thead>
    <tr>
      <th>Status</th>
      <th>Task</th>
      <th>Expire date</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="todo in todos" :key="todo.id">
      <td>{{ todo.status }}</td>
      <td>{{ todo.task }}</td>
      <td>{{ todo.expireDate }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useTodo } from '../../../stores/todo.ts';

const { todos } = storeToRefs(useTodo());
const { getAllTodos } = useTodo();

await getAllTodos();
</script>

<style scoped>

</style>