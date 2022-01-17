<template>
  <li class="todo-item">
    <span class="item" :class="todoItemClass" @click="toggleItem">{{
      todoItem.title
    }}</span>
    <button class="erase-btn" @click="removeItem"></button>
  </li>
</template>

<script lang="ts">
import { Todo } from "@/App.vue";
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    todoItem: Object as PropType<Todo>,
    index: Number,
  },
  computed: {
    // computed 의 return 값 추론을 해줘야 문제없음
    todoItemClass(): string | null {
      return this.todoItem.done ? "complete" : null;
    },
  },
  methods: {
    toggleItem() {
      this.$emit("toggle", this.todoItem, this.index);
    },
    removeItem() {
      const response = confirm("삭제하겠습니까?");
      if (response) this.$emit("remove", this.index);
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

.todo-item {
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: solid 3px gray;
  margin: 0.5rem;
}

.item {
  cursor: pointer;
  margin: 1rem;
  max-width: 25rem;
  min-height: 3rem;
  font-size: 1.5rem;
  color: gray;
}

.complete {
  text-decoration: line-through;
}

.erase-btn {
  width: 2rem;
  height: 2rem;
  background: url(../assets/minus.svg) center center no-repeat;
  opacity: 0.5;
  outline: none;
  border: none;
}

@media screen and (max-width: 830px) {
  .todo-item {
    width: 90%;
  }

  .item {
    margin: 0.5rem;
    min-height: 1.5rem;
    font-size: 1rem;
  }
}
</style>
