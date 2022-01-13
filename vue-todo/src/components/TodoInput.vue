<template>
  <div class="main">
    <label class="todo-label" for="todo-input">TODO : </label>
    <input
      class="todo-input"
      id="todo-input"
      type="text"
      :value="item"
      @input="handleInput"
      @keyup.enter="addTodo"
    />
    <button class="todo-btn" @click="addTodo" type="button"></button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueEvent } from "@/types/index";

export default Vue.extend({
  props: {
    item: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleInput(event: VueEvent.Input<HTMLInputElement>) {
      const eventTarget = event.target;
      this.$emit("inputEvent", eventTarget.value);
    },
    addTodo() {
      this.$emit("add");
    },
  },
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
}

a:hover,
a {
  color: none;
  text-decoration: none;
}

button:focus,
button:active,
input:focus,
input:active,
textarea:focus,
textarea:active {
  outline: none;
  box-shadow: none;
}

ul,
ol,
li {
  list-style-type: none;
  padding-left: 0;
  margin-left: 0;
}

.main {
  width: 100%;
  display: flex;
  justify-content: center;
}

.todo-label {
  width: 20%;
  margin: 1rem;
  font-size: 2rem;
  color: gray;
  text-align: center;
}

.todo-input {
  width: 70%;
  height: 3rem;
  font-size: 2rem;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: solid 2px;
  margin: 1rem;
}

.todo-btn {
  width: 10%;
  height: 3rem;
  background: url(../assets/plus.svg) center center no-repeat;
  background-color: transparent;
  opacity: 0.5;
  outline: none;
  border: none;
  margin: 1rem;
}

@media screen and (max-width: 830px) {
  .todo-label {
    font-size: 1rem;
    margin: 0.5rem;
    padding: 16px 0;
  }

  .todo-input {
    font-size: 1rem;
    height: 2.5rem;
    margin: 0.5rem;
  }

  .todo-btn {
    margin: 0.5rem;
  }
}
</style>
