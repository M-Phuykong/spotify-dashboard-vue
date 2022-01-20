import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Cookies from 'js-cookie';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        access_token: "",
        refresh_token: "",
        expire_time: 0
    },
    mutations: {
      setAccessToken(state, access_token) {
          state.access_token = access_token;
      },
      setRefreshToken(state, refresh_token) {
        state.refresh_token = refresh_token;
      },
      setExpireTime(state, expire_time) {
        state.expire_time = expire_time;
      }
    },
    getters: {
        getAccessToken(state) {
            return state.access_token;
        },
        getRefreshToken(state) {
            return state.refresh_token;
        },
        getExpireTime(state) {
            return state.expire_time;
        }
    },
    plugins: [createPersistedState({
        storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) => Cookies.set(key, value, {secure: true }),
            removeItem: key => Cookies.remove(key)
    }
    })],
  
});