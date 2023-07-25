<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto">
        <header class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="display-4 fw-bold">UpNote</h1>
          <div>
            <button @click="deleteAllToDoTask" class="btn btn-sm btn-danger">
              Delete All
            </button>
            <button @click="logout" class="btn btn-sm btn-warning ms-2">
              Logout
            </button>
          </div>
        </header>
        <form class="mb-3" @submit.prevent="addToDo">
          <div class="row">
            <input
              name="todo-input"
              id="todo-input"
              class="form-control col-auto me-2 mb-2"
              placeholder="Be Amazing!"
              v-model="newToDo"
              @keydown.enter="addToDoOnEnter"
            />
            <button class="btn btn-sm btn-primary col-auto" type="submit">
              Add Todo
            </button>
          </div>
        </form>
        <div class="showTodo">
          <div class="bg-light rounded px-2" v-if="todoList.length > 0">
            <div
              class="d-flex justify-content-between align-items-center bg-light border-bottom py-2 text-dark"
              v-for="(todo, index) in todoList"
              :key="index"
            >
              <div class="form-check">
                <input
                  class="form-check-input"
                  :class="[]"
                  type="checkbox"
                  id="flexCheckDefault"
                  :value="todo.completed"
                  :checked="getCheckCompleted(todo.completed)"
                  @change="checkCompleted(index)"
                />
              </div>
              <div :class="[getCheckCompleted(todo.completed) ? 'isCompleted' : '']">{{ todo.task }}</div>
              <div class="">
                <button
                  @click="deleteToDoTask(index)"
                  class="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from "vue";
import store from "@/store/store";
import router from "@/router";
import {getToDos, createToDo, updateToDo, deleteToDo, deleteAllToDo} from "@/services/api";
import {useToast} from "vue-toast-notification";

const todoList = ref([]);
const newToDo = ref("")
const toast = useToast();

onMounted(() => {
  const storeUserData = localStorage.getItem("userData")

  if (!storeUserData) {
    router.push({name: "Login"});
    return;
  }
  try {
    const userData = JSON.parse(storeUserData);
    if (!store.getters.user) {
      // console.log("User State Not Populated, Initializing It With Data From Local Storage");
      store.commit("setUser", userData)
    }
    fetchToDos(userData.token, userData._id)

    console.log("User Data ID", userData._id)

  } catch (err) {
    console.log("Failed Parsing User Data", err)
    router.push({name: "Login"})
  }
})

const fetchToDos = async (token, userId) => {
  try {
    const res = await getToDos(token, userId);
    todoList.value = res;
    console.log("Success Fetching To Do")
  } catch (err) {
    console.log("Failed Fetching To Do", err)
  }
}

const addToDo = async () => {
  if (!newToDo.value) return;
  const todo = {
    task: newToDo.value,
    completed: false,
    created_at: Date.now(),
    completed_time: null
  };
  try {
    await createToDo(todo, store.getters.user.token, store.getters.user._id);
    fetchToDos(store.getters.user.token, store.getters.user._id);
    newToDo.value = ""
    toast.open({
      message: 'Add To Do Success',
      type: 'success',
      position: 'top',
      duration: 1500
    })
    console.log("Add To Do Success")
  } catch (err) {
    toast.open({
      message: 'Error Add To Do"',
      type: 'error',
      position: 'top',
      duration: 1500
    })
    console.log("Error Add To Do", err)
  }
}

const addToDoOnEnter = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addToDo();
  }
}

const getCheckCompleted = (completed) => {
  return completed;
}

const checkCompleted = async (index) => {
  const todo = todoList.value[index];
  todo.completed = !todo.completed
  try {
    await updateToDo(todo, store.getters.user.token);
    toast.open({
      message: 'To Updated To Do',
      type: 'info',
      position: 'bottom-left',
      duration: 1000
    })
    console.log("To Do Updated");
  } catch (err) {
    console.log("Error Updating To Do", err);
  }
}
const deleteToDoTask = async (index) => {
  try {
    await deleteToDo(todoList.value[index]._id, store.getters.user.token);
    todoList.value.splice(index, 1);
    toast.open({
      message: 'Success Delete To Do',
      type: 'success',
      position: 'top',
      duration: 1500
    })
    console.log("Success Delete To Do")
  } catch (err) {
    toast.open({
      message: 'Failed Delete To Do',
      type: 'error',
      position: 'top',
      duration: 1500
    })
    console.log("Failed Delete To Do", err)
  }
}

const deleteAllToDoTask = async () => {
  try {
    await deleteAllToDo(store.getters.user.token, store.getters.user._id);
    todoList.value = [];
    toast.open({
      message: 'Success Delete All To Do',
      type: 'success',
      position: 'top',
      duration: 1500
    })
    console.log("Success Delete All To Do");
  } catch (err) {
    toast.open({
      message: 'Failed Delete All To Do',
      type: 'error',
      position: 'top',
      duration: 1500
    })
    console.log("Failed Delete To Do", err);
  }
}
const logout = () => {
  try {
    localStorage.removeItem("userData");
    store.commit("setUser", null);
    router.push({name: "Login"})
    toast.open({
      message: 'Logout Success',
      type: 'success',
      position: 'top',
      duration: 1500
    })
  } catch (err) {
    console.log("Something Wrong", err)
  }
}
</script>
<style scoped>
.isCompleted {
  text-decoration: line-through;
}
</style>
