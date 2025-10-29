<template>
  <v-container>
    <v-navigation-drawer>
      <v-sheet class="d-flex flex-column fill-height">
        <v-list class="flex-1-1" selectable>
          <v-list-item prepend-icon="mdi-format-list-checkbox">
            ToDo List
          </v-list-item>
        </v-list>
        <v-divider />
        <v-list selectable>
          <v-list-item prepend-icon="mdi-logout">
            Logout
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-navigation-drawer>
    <v-container>
      <Suspense>
        <template #fallback>

        </template>
        <TodoTable />
      </Suspense>
    </v-container>
  </v-container>
</template>

<script lang="ts" setup>

import TodoTable from './todo-table/TodoTable.vue';
</script>

<style scoped>

</style>