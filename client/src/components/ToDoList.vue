<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-8 col-lg-6 mx-auto">
        <header class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="display-1 fw-bold">TodoList</h1>
          <div>
            <button class="btn btn-sm btn-danger">
              Delete All
            </button>
            <button @click="logout" class="btn btn-sm btn-warning ms-2">
              Logout
            </button>
          </div>
        </header>
        <form class="mb-3">
          <div class="row">
            <input
              name="todo-input"
              id="todo-input"
              class="form-control col-auto me-2 mb-2"
              placeholder="Be Amazing!"
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
                  type="checkbox"
                  id="flexCheckDefault"
                />
              </div>
              <div class="">{{ todo.task }}</div>
              <div class="">
                <button
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
import {getToDos} from "@/services/api";

const todoList = ref([]);
// const newToDo = ref("")

onMounted(() => {
  const storeUserData = localStorage.getItem("userData")
  console.log("Store User Data: ", storeUserData)

  if (!storeUserData) {
    router.push({name: "Login"});
    return;
  }
  try {
    const userData = JSON.parse(storeUserData);
    console.log("User Data: ", userData)


    if (!store.getters.user) {
      console.log("User State Not Populated, Initializing It With Data From Local Storage");
      store.commit("setUser", userData)
    }
    console.log("userId:", userData._id)
    fetchToDos(userData.token, userData._id)


  } catch (err) {
    console.log("Failed Parsing User Data", err)
    router.push({name: "Login"})
  }

})

const fetchToDos = async (token, userId) => {
  try {
    const res = await getToDos(token, userId);
    console.log("response", res)
    todoList.value = res;
  }catch(err) {
    console.log("Failed Fetching To Do", err)
  }
}

const logout = () => {
  try {
    localStorage.removeItem("userData");
    store.commit("setUser", null);
    router.push({name: "Login"})
  }catch (err) {
    console.log("Something Wrong", err)
  }
}


</script>

<style scoped>
h1 {
  font-size: 1.2rem;
}
</style>
