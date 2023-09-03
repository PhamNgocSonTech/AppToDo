import axios from "axios";
// const BASE_URL_API = process.env.VUE_APP_BASE_URL_API;
// const BASE_URL_API = 'http://localhost:3000/api/v1';
const BASE_URL_API = 'https://uptodo.onrender.com/api/v1';
export async function registerUser(userData) {
  return axios.post(`${BASE_URL_API}/users/register`, userData)
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function loginUser(userData) {
  return axios.post(`${BASE_URL_API}/users/login`, userData)
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function logoutUser (refreshToken) {
  return axios.post(`${BASE_URL_API}/users/logout`, {refreshToken})
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function getToDos(token, userId) {
  return axios.get(`${BASE_URL_API}/todos`, {
    headers: {
      "x-access-token": token,
    },
    params: {
      userId: userId,
    }

  })
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function createToDo(todo, token, userId) {
  return axios.post(`${BASE_URL_API}/todos/create`, todo, {
    headers: {
      "x-access-token": token,
    },
    params: {
      userId: userId,
    },
  })
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function checkToDo(todo, token) {
  if (todo.completed) {
    todo.completed_time = Date.now();
  } else {
    todo.completed_time = null;
  }
  // todo.task = newTask;
  return axios.put(`${BASE_URL_API}/todos/update/${todo._id}`, todo, {
    headers: {
      "x-access-token": token,
    }
  })
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function updateToDoAxios(todo, token, newTask) {
    todo.task = newTask;
  // todo.task = newTask;
  return axios.put(`${BASE_URL_API}/todos/update/${todo._id}`, todo, {
    headers: {
      "x-access-token": token,
    }
  })
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function deleteToDo(id, token) {
  return axios.delete(`${BASE_URL_API}/todos/delete/${id}`, {
    headers: {
      "x-access-token": token,
    }
  })
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}

export async function deleteAllToDo(token, userId) {
  return axios.delete(`${BASE_URL_API}/todos/deleteAll`, {
    headers: {
      "x-access-token": token,
    },
    params: {
      userId: userId
    }
  })
    .then(({data}) => data)
    .catch(error => {
      throw error
    })
}
