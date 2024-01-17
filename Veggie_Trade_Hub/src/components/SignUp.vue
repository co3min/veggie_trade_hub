<template>
  <div
    class="flex items-center justify-center h-screen relative bg-cover bg-center bg-[url('../assets/veggie_Account.jpg')]">
    <div class="w-full md:w-2/3 max-w-screen-md p-8 bg-white shadow-md rounded">
      <h2 class="text-2xl font-semibold mb-4 text-center">Create an Account</h2>
      <form @submit.prevent="handleSubmit" class="grid gap-2">
        <div class="flex flex-col">
          <label for="firstname" class="text-xl font-medium text-gray-600"
            >First Name:</label
          >
          <input
            v-model="firstname"
            type="text"
            id="firstname"
            required
            class="mt-1 p-2 border rounded-md" />
        </div>

        <div class="flex flex-col">
          <label for="lastname" class="text-xl font-medium text-gray-600"
            >Last Name:</label
          >
          <input
            v-model="lastname"
            type="text"
            id="lastname"
            required
            class="mt-1 p-2 border rounded-md" />
        </div>

        <div class="flex flex-col">
          <label for="email" class="text-xl font-medium text-gray-600"
            >Email:</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="mt-1 p-2 border rounded-md" />
        </div>

        <div class="flex flex-col">
          <label for="password" class="text-xl font-medium text-gray-600"
            >Password:</label
          >
          <input
            v-if="showPassword"
            type="text"
            v-model="password"
            class="mt-1 p-2 border rounded-md" />
          <input
            v-else
            type="password"
            v-model="password"
            class="mt-1 p-2 border rounded-md" />
        </div>

        <button
          type="submit"
          class="w-full md:w-auto bg-green-500 text-white text-xl p-2 rounded-md">
          Sign Up
        </button>
        <a href="login" class="text-black text-xl text-right"
          >Already have an account?</a
        >
      </form>
    </div>
  </div>
  <div
    :class="{
      'absolute top-0 right-0 mt-4 mr-4 p-4 rounded-xl z-20 bg-green-300':
        showAlert,
      'absolute top-0 right-0 mt-4 mr-4 p-4 rounded-xl z-20 bg-red-300':
        showError,
    }">
    {{ alertMessage }}
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      showAlert: false,
      showError: false,
      alertMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:5001/veggie/newUser",
          {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          }
        );

        console.log("Response from server:", response.data);

        this.showAlert = true;
        this.alertMessage = response.data;
        setTimeout(() => {
          this.showAlert = false;
          this.alertMessage = "";
          this.$router.push("/login");
        }, 3000);

        // You can handle the response or perform additional actions here
      } catch (error) {
        console.log(error.response.data);
        this.showError = true;
        this.alertMessage = error.response.data;
        setTimeout(() => {
          this.showError = false;
          this.alertMessage = "";
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
