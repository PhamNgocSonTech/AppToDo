<template>
  <section class="vh-100" style="background-color: #9A616D;">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem;">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://images.unsplash.com/photo-1599498448014-81d90414c50a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=386&q=80"
                  alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;"/>
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form @submit.prevent="onFormSubmit">

                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                      <span class="h1 fw-bold mb-0"></span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Login your account</h5>

                    <div class="form-outline mb-4">
                      <input v-model="email" type="email" id="form2Example17" class="form-control form-control-lg"/>
                      <label class="form-label" for="form2Example17">Email address</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="password" type="password" id="form2Example27"
                             class="form-control form-control-lg"/>
                      <label class="form-label" for="form2Example27">Password</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                    </div>

                    <a class="small text-muted" href="#!">Forgot password?</a>
                    <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account?
                      <!--                      <a href="#!" style="color: #393f81;">Register here</a>-->
                      <router-link to="/register">Register</router-link>
                    </p>
                    <a href="#!" class="small text-muted">Terms of use.</a>
                    <a href="#!" class="small text-muted">Privacy policy</a>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted} from "vue";
import {loginUser} from "@/services/api";
import router from '../router/index';
import store from "@/store/store";
import {useToast} from 'vue-toast-notification';
// import {toastMixin} from "@/mixins/toastMixin";

const email = ref("");
const password = ref("")
const toast = useToast();
// const {showNotification} = toastMixin

onMounted(() => {
  const storeUserData = localStorage.getItem("userData");
  if (storeUserData) {
    const userData = JSON.parse(storeUserData);
    store.commit("setUser", userData);
    router.push({name: "Dashboard"})
  }
})

const login = async () => {
  const user = {
    email: email.value,
    password: password.value
  };
  try {
    const response = await loginUser(user);
    const {token, email, _id} = response;
    const userData = {
      token,
      _id,
      email
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    store.commit("setUser", userData);
    toast.open({
      message: 'Login Success',
      type: 'success',
      position: 'top',
      duration: 1500
    })
    router.push({name: "Dashboard"});
  } catch (err) {
    console.log("Login Failed", err)
    toast.open({
      message: 'Check Username and Password',
      type: 'error',
      position: 'top',
      duration: 1500
    })
    // showNotification("Login Failed", "Check Username and Password", "error")
  }
};

const onFormSubmit = () => {
  console.log("onFormSubmit")
  login();
}

</script>

<style scoped>

</style>
