import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: false // 初始状态为未登录
  },
  mutations: {
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    }
  },
  actions: {
    setLoginStatus({ commit }, status) {
      commit('SET_LOGIN_STATUS', status);
    }
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn
  }
});