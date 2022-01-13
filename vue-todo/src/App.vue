<template>
  <div>
    <div
      class="back-ground"
      @mousemove="changePointer"
      @mouseenter="pointerIn"
      @mouseleave="pointerOut"
    ></div>
    <div
      class="pointer noneDisplay"
      :style="movePointer"
      @mouseover="pointerIn"
      @mousemove="changePointer"
      @mouseleave="pointerOut"
    ></div>
    <div class="form" @mouseover="pointerIn" @mousemove="changePointer">
      <header>
        <h1>TODO LIST</h1>
      </header>
      <main>
        <todo-input
          :item="todoText"
          @inputEvent="updateTodoText"
          @add="addTodoItem"
        ></todo-input>
        <ul class="todo-items">
          <todo-list-item
            v-for="(todoItem, index) in todoItems"
            :key="index"
            :index="index"
            :todoItem="todoItem"
            @toggle="toggleTodoItemComplete"
            @remove="removeTodoItem"
          ></todo-list-item>
        </ul>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";
import { VueEvent } from "./types";

const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: Todo[]) {
    const parsed = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch(): Todo[] {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    const result = JSON.parse(todoItems);
    return result;
  },
};

export interface Todo {
  title: string;
  done: boolean;
}

export interface Point {
  top: number;
  left: number;
}

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      todoItems: [] as Todo[],
      pointXY: {
        top: 0,
        left: 0,
      } as Point,
    };
  },
  computed: {
    movePointer(): { top: string; left: string } {
      return {
        top: this.pointXY.top + "px",
        left: this.pointXY.left + "px",
      };
    },
  },
  methods: {
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      const todo: Todo = {
        title: value,
        done: false,
      };
      this.todoItems.push(todo);
      storage.save(this.todoItems);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = "";
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch().sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      return "hi";
    },
    removeTodoItem(index: number) {
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    },
    toggleTodoItemComplete(todoItem: Todo, index: number) {
      this.todoItems.splice(index, 1, {
        ...todoItem,
        done: !todoItem.done,
      });
      storage.save(this.todoItems);
    },
    changePointer(event: VueEvent.Click) {
      this.pointXY.left = event.x;
      this.pointXY.top = event.y;
    },
    pointerIn() {
      let abc = document.querySelector(".pointer")!;
      abc.classList.remove("noneDisplay");
    },
    pointerOut() {
      let abc = document.querySelector(".pointer")!;
      abc.classList.add("noneDisplay");
    },
  },
  created() {
    this.fetchTodoItems();
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

main {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.noneDisplay {
  display: none;
}

.back-ground {
  z-index: -2;
  position: absolute;
  background-color: rgb(255, 255, 255);
  background-repeat: no-repeat;
  background-size: cover;
  content: "";
  width: 100vw;
  height: 100vh;
}

.pointer {
  z-index: -1;
  position: absolute;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-color: gray;
  opacity: 0.5;
  border-radius: 50%;
  transition-property: all;
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3rem;
  margin: 4rem;
  margin-bottom: 2rem;
}

.todo-items {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  margin-top: 1rem;
}

@media screen and (max-width: 830px) {
  h1 {
    font-size: 2rem;
    margin: 2rem;
    margin-bottom: 1rem;
  }

  main {
    width: 90%;
  }

  .todo-items {
    margin: 0;
  }
}
</style>
