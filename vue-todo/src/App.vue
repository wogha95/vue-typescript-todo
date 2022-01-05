<template>
  <div>
    <h1>Vue todo with typescript</h1>
    <todo-input
      :item="todoText"
      @inputEvent="updateTodoText"
      @add="addTodoItem"
    ></todo-input>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
export default Vue.extend({
  components: { TodoInput },
  data() {
    return {
      todoText: "",
    };
  },
  methods: {
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      console.log(value);
      localStorage.setItem(value, value);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = "";
    },
  },
});
</script>

<style scoped></style>
