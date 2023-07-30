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
                  alt="register form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;"/>
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">

                  <form @submit.prevent="onFormSubmit">
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style="color: #ff6219;"></i>
                      <span class="h1 fw-bold mb-0"></span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Register your account</h5>

                    <div class="form-outline mb-4">
                      <input v-model="name" type="text" id="form2Example17" class="form-control form-control-lg"/>
                      <label class="form-label" for="form2Example17">User Name</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="email" type="email" id="form2Example17" class="form-control form-control-lg"/>
                      <label class="form-label" for="form2Example17">Email Address</label>
                    </div>

                    <div class="form-outline mb-4">
                      <input v-model="password" type="password" id="form2Example27"
                             class="form-control form-control-lg"/>
                      <label class="form-label" for="form2Example27">Password</label>
                    </div>

                    <div class="pt-1 mb-4">
                      <button class="btn btn-dark btn-lg btn-block" type="submit">Register</button>
                    </div>

                    <p class="mb-5 pb-lg-2" style="color: #393f81;">Have an account!
                      <!--                      <a href="#!" style="color: #393f81;">Login here</a>-->
                      <router-link to="/login">Login</router-link>
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
import {registerUser} from "@/services/api";
import {useToast} from "vue-toast-notification";
import {useLoading} from 'vue-loading-overlay';
// import StoreLoading from "@/store/loading";
// import LoadingOverlay from 'vue-loading-overlay';


import router from "@/router";
import StoreUser from "@/store/user";
// import loading from "@/store/loading";

const name = ref("");
const password = ref("");
const email = ref("")
const toast = useToast();

const fullPage = ref(true)
// const isLoading = ref(false);

const loading = useLoading({
  isFullPage: fullPage,
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

onMounted(() => {

  if (StoreUser.getters.user != null) {
    router.push({name: "Dashboard"})
  }
})

// const showLoading = () => {
//   // isLoading.value = true;
//   $loading.show()
// }
// // const hideLoading = () => {
//   isLoading.value = false;
// }
const register = async () => {
  const user = {
    email: email.value,
    name: name.value,
    password: password.value
  };
    const loader = showLoadingOverlay();
  try {
    const response = await registerUser(user);
    const {_id, email, token} = response;
    const userData = {
      _id,
      email,
      token,
    }
    // localStorage.setItem("userData", JSON.stringify(userData));
    StoreUser.commit("setUser", userData);
    router.push({name: "Login"});
    toast.open({
      message: 'Register Success!! Login Now',
      type: 'success',
      position: 'top',
      duration: 2500
    })
  } catch (err) {
    toast.open({
      message: 'Register Failed',
      type: 'error',
      position: 'top',
      duration: 2500
    })
    console.log("Register Failed", err)
  }finally {
    loader.hide();
  }
}

const onFormSubmit = () => {
  // $loading.show()
  register();
}

</script>

<style scoped>
@import 'vue-loading-overlay/dist/css/index.css';

</style>
