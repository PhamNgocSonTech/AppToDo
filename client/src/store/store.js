import Vuex from 'vuex'

const UserStore = {
  state: {
    user: null,
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    }
  },

  actions: {},

  getters: {
    user: (state) => state.user,
  },


}

const StoreUser = new Vuex.Store(UserStore);

export default StoreUser
