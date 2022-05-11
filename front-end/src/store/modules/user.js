/*
 * @Description: user state
 */
export default {
  state: {
    userName: "", // 登录的用户姓名
    islogin:false,
    user_id:"",
    userEmail:"",

    showLogin: false // 用于控制是否显示登录组件
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getShowLogin (state) {
      return state.showLogin
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data;
    },
    setShowLogin (state, data) {
      state.showLogin = data;
    }
  },
  actions: {
    setUser ({ commit }, data) {
      commit('setUser', data);
    },
    setShowLogin ({ commit }, data) {
      commit('setShowLogin', data);
    }
  }
}