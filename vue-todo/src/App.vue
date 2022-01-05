<template>
  <div>
    <header>
      <h1>Vue todo with typescript</h1>
    </header>
    <main>
      <todo-input
        :item="todoText"
        @inputEvent="updateTodoText"
        @add="addTodoItem"
      ></todo-input>
      <div>
        <ul>
          <todo-list-item v-for="(todoItem, index) in todoItems" :key="index" :index="index" :todoItem="todoItem" @remove="removeTodoItem"></todo-list-item>
        </ul>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";

const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: any[]) {
    const parsed = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch() {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    const result = JSON.parse(todoItems);
    return result;
  },
};

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      todoItems: [] as any[],
    };
  },
  methods: {
    initTodoText() {
      this.todoText = "";
    },
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      this.todoItems.push(value);
      storage.save(this.todoItems);
      // localStorage.setItem(value, value);
      this.initTodoText();
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch();
    },
    removeTodoItem(index: number) {
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    }
  },
  created: {
    this.fetchTodoItems();
  }
});
</script>

<style scoped></style>
