import { createStore } from "vuex";
import axios from "axios";
import getUserFromCookie from "../src/components/userService.js";

export default createStore({
  state: {
    user: null,
    veggiePosts: null,
    allVeggiePosts: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setOwnUserVeggiePosts(state, veggiePosts) {
      state.veggiePosts = veggiePosts;
    },
    setAllVeggiePosts(state, allVeggiePosts) {
      state.allVeggiePosts = allVeggiePosts;
    },
  },
  actions: {
    async fetchUser({ commit }) {
      try {
        let user = await getUserFromCookie();
        if (user) {
          commit("setUser", user);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        commit("setUser", null);
      }
    },
    async fetchOwnUserVeggiePosts({ commit, state }) {
      try {
        let response = await axios.get(
          `http://localhost:5001/veggie/posts/veggiePostsByUserId?userID=${state.user.id}`
        );
        let veggiePosts = response.data;
        if (veggiePosts) {
          commit("setOwnUserVeggiePosts", veggiePosts);
        }
      } catch (error) {
        console.error("Error fetching veggiePosts:", error);
        commit("setOwnUserVeggiePosts", null);
      }
    },
    async fetchAllVeggiePosts({ commit }) {
      try {
        let response = await axios.get(`http://localhost:5001/veggie/allPosts`);
        let allVeggiePosts = response.data;
        if (allVeggiePosts) {
          commit("setAllVeggiePosts", allVeggiePosts);
        }
      } catch (error) {
        console.error("Error fetching allVeggiePosts:", error);
        commit("setAllVeggiePosts", null);
      }
    },
    async deleteVeggiePost({ commit }, veggieId) {
      try {
        await axios.delete(
          `http://localhost:5001/veggie/post/delete/${veggieId}`
        );
      } catch (error) {
        console.error("Error deleting veggie post:", error);
      }
    },
  },
  modules: {},
});
