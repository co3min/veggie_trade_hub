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
    <button
      @click="toggleOptions"
      class="fixed top-20 right-20 px-4 py-2 bg-blue-500 text-white border border-gray-300 rounded-full flex items-center cursor-pointer transition-all duration-300 hover:bg-blue-600 transform hover:scale-105"
    >
      <span v-if="!showOptions">Account</span>
      <span v-else>&#x2715; Close</span>
    </button>

    <!-- Options dropdown -->
    <div
      v-if="showOptions"
      class="fixed top-32 right-20 bg-white shadow-md border border-gray-300 rounded p-2 flex flex-col z-10"
    >
      <button
        @click="handleLoginUpClick"
        class="py-1 px-2 bg-blue-500 text-white border-none rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-600"
      >
        Sign In
      </button>
      <button
        @click="handleSignUpClick"
        class="py-1 px-2 bg-blue-500 text-white border-none rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-600"
      >
        Sign Up
      </button>
    </div>
  </main>
</template>
