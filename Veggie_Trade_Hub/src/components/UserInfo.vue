<template>
  <template v-if="user">
    <div>
      <Navbar> </Navbar>
    </div>
    <div class="user-info">
      <div
        class="max-w-md mx-auto bg-white p-8 shadow-md rounded-md mt-10 sm:w-96 md:w-full lg:w-1/2 xl:w-1/3">
        <h2 class="text-3xl font-bold mb-6 text-center">User Information</h2>

        <p class="text-gray-800 font-semibold">
          First Name: {{ user.firstname }}
        </p>
        <p class="text-gray-800 font-semibold">
          Last Name: {{ user.lastname }}
        </p>
        <p class="text-gray-800 font-semibold">Email: {{ user.email }}</p>
      </div>
    </div>
  </template>

  <template v-else>
    <h3>Unauthorized</h3>
  </template>
</template>

<script>
import Navbar from "./Navbar.vue";
export default {
  components: {
    Navbar,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style>
body {
  background-color: azure; /* Replace with your desired color */
  margin: 0;
  padding: 0;
}
</style>
