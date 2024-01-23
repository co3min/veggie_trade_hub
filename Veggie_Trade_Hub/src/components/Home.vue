<template>
  <div>
    <Navbar> </Navbar>
  </div>
  <div>
    <h1>Welcome, {{ user ? user.email : "Guest" }}!</h1>
  </div>
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

<style scoped>
/* Add any additional styles here if needed */
</style>
