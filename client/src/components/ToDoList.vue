  <template>
    <div class="container">
<!--      <loading-->
<!--        :active="isLoading"-->
<!--        :can-cancel="false"-->
<!--        :loader="spinnerType"-->
<!--      >-->
<!--          <p>Loading</p>-->
<!--      </loading>-->
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
                  <input
                    v-if="isUpdate === index"
                    type="text"
                    v-model="updateTask"
                    @keydown.enter="updateToDoTask"
                    @keydown.esc="cancelUpdateTask"
                  />
                  <div v-else :class="[getCheckCompleted(todo.completed) ? 'isCompleted' : '']">{{ todo.task }}</div>
<!--                  <button @click="updateToDoTask">Save</button>-->
<!--                  <button @click="cancelUpdateTask">Cancel</button>-->
                <div class="">
                  <button
                    class="btn btn-sm btn-success"
                    @click="startUpdateTask(index,todo.task)"
                  >
                    Edit
                  </button>

                  <button
                    @click="deleteToDoTask(index)"
                    class="btn btn-sm btn-danger ms-2"
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
  import store from "@/store/user";
  import router from "@/router";
  import {
    getToDos,
    createToDo,
    deleteToDo,
    deleteAllToDo,
    updateToDoAxios,
    checkToDo,
  } from "@/services/api";
  import {useToast} from "vue-toast-notification";
  import Cookies from 'js-cookie'
  import 'vue-loading-overlay/dist/css/index.css';
  const todoList = ref([]);
  const newToDo = ref("")
  const toast = useToast();
  const isUpdate = ref(-1);
  const updateTask = ref('');
  let loader;

  // const loading = useLoading();
  import {useLoading} from 'vue-loading-overlay';

  const loading = useLoading({
    isFullPage: true,
    loader: 'bars',
    canCancel: false,
    color: '#3ac569',
    backgroundColor: '#e4e7ec',
    width: 100,
    height: 100,
  })
  const showLoadingOverlay = () => {
    return loading.show()
  }
  const startUpdateTask = (index,task) => {
    isUpdate.value = index;
    updateTask.value = task;
  }
  const cancelUpdateTask = () => {
    isUpdate.value = -1;
    updateTask.value = '';

  }

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
    } catch (err) {
      console.log("Failed Parsing User Data", err)
      router.push({name: "Login"})
    }
  })

  const fetchToDos = async (token, userId) => {
        loader = showLoadingOverlay()
    try {
        const res = await getToDos(token, userId);
        console.log("res:",res)
        todoList.value = res;
        console.log("Success Fetching To Do")
    } catch (err) {
      console.log("Failed Fetching To Do", err)
      toast.open({
        message: 'Session Expired Will Be Logout, Please LOGIN Again',
        type: 'warning',
        position: 'bottom-left',
        duration: 1500
      })
      logout();
    }finally {
      loader.hide();
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
    // loader = showLoadingOverlay();
    try {
      await createToDo(todo, store.getters.user.token, store.getters.user._id);
      fetchToDos(store.getters.user.token, store.getters.user._id);
      newToDo.value = ""
      toast.open({
        message: 'Add To Do Success',
        type: 'success',
        position: 'top',
        duration: 2000
      })
      console.log("Add To Do Success")
    } catch (err) {
      toast.open({
        message: 'Error Add To Do"',
        type: 'error',
        position: 'top',
        duration: 2000
      })
      console.log("Error Add To Do", err)
    }finally {
      // loader.hide();
      // isLoading.value = false;

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
      await checkToDo(todo, store.getters.user.token);
      toast.open({
        message: 'Success Check To Do',
        type: 'info',
        position: 'bottom-left',
        duration: 2000
      })
    } catch (err) {
      toast.open({
        message: 'Failed Check To Do',
        type: 'error',
        position: 'bottom-left',
        duration: 2000
      })
      console.log("Error Check To Do: ", err)
    }
  }

  const updateToDoTask = async () => {
    loader = showLoadingOverlay()
    try {
      const todo = todoList.value[isUpdate.value];
      await updateToDoAxios(todo, store.getters.user.token, updateTask.value)
      toast.open({
        message: 'Success Update To Do',
        type: 'success',
        position: 'bottom-left',
        duration: 2000
      })
      cancelUpdateTask();
    } catch (err) {
      toast.open({
        message: 'Failed Update To Do',
        type: 'error',
        position: 'bottom-left',
        duration: 2000
      })
      console.log("Error Update To Do: ", err)
    }finally {
      loader.hide();
    }
  }
  const deleteToDoTask = async (index) => {
    loader = showLoadingOverlay();
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
        duration: 10000
      })
      console.log("Failed Delete To Do", err)
    }finally {
      loader.hide();
    }
  }

  const deleteAllToDoTask = async () => {
    loader = showLoadingOverlay()
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
    }finally {
      loader.hide();
    }
  }
  const logout = () => {
    try {
      localStorage.removeItem("userData");
      Cookies.remove('refreshToken')
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

  // const showLoading = () => {
  //   isLoading.value = true
  //     loading.show({
  //       canCancel:false,
  //       loader: 'spinner',
  //       isFullPage: true,
  //       width: 64,
  //       height: 64,
  //     })
  // }

  // const hideLoading = () => {
  //   isLoading.value = false
  //   loading.hide
  // }



  // const autoLogout = () => {
  //   try {
  //     const date = new Date()
  //     const seconds = 1000;
  //     const time = date.getTime();
  //     const accessToken = localStorage.getItem('userData');
  //     if(accessToken.exp < Math.round(time /seconds)){
  //       console.log("AT Time: ", accessToken.exp)
  //       console.log("Time now: ",Math.round(time /seconds))
  //       logout();
  //       // return;
  //     }
  //     // axios.interceptors.response.use(
  //     //   (response) => response,
  //     //   (error) => {
  //     //     if(error.response && error.response.status === 401) {
  //     //       logout();
  //     //     }
  //     //     return Promise.reject(error)
  //     //   }
  //     // )
  //
  //   }catch (err) {
  //     console.log(err)
  //   }
  // }
  </script>
  <style scoped>
  .isCompleted {
    text-decoration: line-through;
  }
  </style>
