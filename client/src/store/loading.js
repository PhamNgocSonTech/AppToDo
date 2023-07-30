import {createStore} from "vuex";

const LoadingStore = {
  state: {
    isLoading: false,
  },

  getters: {
    isLoading: (state) => state.isLoading,
  },


  mutations: {
    setLoading(state, isLoading){
      state.isLoading = isLoading
    }
  },

  actions: {
    showLoading({commit}) {
      commit('setLoading', true)
    },
    hideLoading({commit}) {
      commit('setLoading', false)
    }
  }
}
 const StoreLoading = new createStore(LoadingStore)

export default StoreLoading
