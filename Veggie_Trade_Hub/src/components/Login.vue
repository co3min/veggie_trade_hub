<template>
  <div
    class="bg-gray-400 min-h-screen flex items-center justify-center bg-[url('../assets/login.jpg')] bg-cover bg-center">
    <div class="bg-white p-10 rounded shadow-lg max-w-md w-full">
      <h2 class="text-3xl font-semibold mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-2xl font-medium text-gray-600"
            >Emai</label
          >
          <input
            v-model="email"
            type="text"
            id="email"
            name="email"
            class="mt-1 p-2 w-full border rounded-md" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-2xl font-medium text-gray-600"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            class="mt-1 p-2 w-full border rounded-md" />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white text-2xl p-2 rounded-md">
          Login
        </button>
      </form>
      <a href="signup" class="text-black text-xl">Don't have an account?</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import getUserFromCookie from "./userService.js";
export default {
  data() {
    return {
      email: "",
      password: "",
      user: null,
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:5001/veggie/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response.data);

        try {
          this.user = await getUserFromCookie();

          console.log(this.user.email);
          this.$store.commit("setUser", this.user);

          this.$router.push({ name: "home" });
        } catch (error) {
          console.error("Error in getUserData:", error);
        }
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
