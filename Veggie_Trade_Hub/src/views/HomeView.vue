<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const showOptions = ref(false);

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const handleSignUpClick = () => {
  router.push("/signup");
};

const handleLoginUpClick = () => {
  router.push("/login");
};
</script>

<template>
  <main>
    <!-- Your existing content goes here -->

    <!-- Account button in the top right corner -->
    <button @click="toggleOptions" class="account-button">
      <span v-if="!showOptions">Account</span>
      <span v-else>&#x2715; Close</span>
    </button>

    <!-- Options dropdown -->
    <div v-if="showOptions" class="options-dropdown">
      <button @click="handleLoginUpClick">Sign In</button>
      <button @click="handleSignUpClick">Sign Up</button>
    </div>
  </main>
</template>

<style scoped>
.account-button {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #5addef;
  color: #333333;
  border: 1px solid #ccc;
  border-radius: 24px; /* Rounded corners */
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.account-button:hover {
  background-color: #0bc9f4; /* Lighter background color on hover */
  transform: scale(1.05); /* Scale effect on hover */
}

.options-dropdown {
  position: fixed;
  top: 60px; /* Adjust the top position */
  right: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  z-index: 1000;
}

.options-dropdown button {
  padding: 8px;
  margin: 5px 0;
  background-color: #1564f5;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.options-dropdown button:hover {
  background-color: #0857f5;
}
</style>
