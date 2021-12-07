import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        access_token: null,
        refresh_token: null
    },
    mutations: {
      setAccessToken(state, access_token) {
          state.access_token = access_token;
      },
      setRefreshToken(state, refresh_token) {
        state.refresh_token = refresh_token;
    }
    },
    getters: {
        getAccessToken(state) {
            return state.access_token;
        },
        getRefreshToken(state) {
            return state.refresh_token;
        }
    },
  
});