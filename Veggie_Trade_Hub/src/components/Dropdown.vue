<template>
  <div
    class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-start gap-5 md:gap-0 lg:gap-0 relative">
    <div class="relative inline-block text-left items-center">
      <button
        @click="toggleDropdown2"
        type="button"
        class="md:inline-flex md:items-center w-full md:px-5 md:pb-0 text-xl text-gray-100 rounded-md shadow-sm hover:text-blue-500 transition duration-300">
        {{ selectedOption2 }}
      </button>

      <div
        v-if="isOpen2"
        class="origin-top-right max-sm:left-44 max-sm:-bottom-5 absolute transform -translate-x-1/2 mt-2 w-48 rounded-md shadow-lg bg-gray-900 border border-gray-700 hover:text-blue-500">
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <button
            @click="createVeggie()"
            class="block px-2 py-1 text-xl text-gray-100 hover:text-blue-500 transition duration-300"
            role="menuitem">
            Create VeggiePost
          </button>
          <button
            @click="viewVeggies()"
            class="block px-2 py-1 text-xl text-gray-100 hover:text-blue-500 transition duration-300"
            role="menuitem">
            My VeggiePosts
          </button>
        </div>
      </div>
    </div>

    <div class="relative inline-block text-left">
      <button
        @click="toggleDropdown"
        type="button"
        class="md:inline-flex justify-center md:items-center w-full md:px-5 md:pb-0 text-xl text-gray-100 rounded-md shadow-sm hover:text-blue-500 transition duration-300">
        {{ selectedOption }}
      </button>

      <div
        v-if="isOpen"
        class="origin-top-right max-sm:left-40 max-sm:-bottom-5 absolute transform -translate-x-1/2 mt-2 w-36 rounded-md shadow-lg bg-gray-900 border border-gray-700 hover:text-blue-500">
        <div
          class="py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          <button
            @click="userInfo()"
            class="block px-2 py-1 text-xl text-gray-100 hover:text-blue-500 transition duration-300"
            role="menuitem">
            User Info
          </button>
          <button
            @click="logout()"
            class="block px-2 py-1 text-xl text-gray-100 hover:text-blue-500 transition duration-300"
            role="menuitem">
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen2: false,
      isOpen: false,
      selectedOption: "Profile",
      selectedOption2: "Veggie",
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.isOpen2 = false;
      }
    },
    toggleDropdown2() {
      this.isOpen2 = !this.isOpen2;
      if (this.isOpen2) {
        this.isOpen = false;
      }
    },
    async logout() {
      try {
        document.cookie =
          "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        this.$router.push({ path: "/" }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.log(error);
      }
    },
    userInfo() {
      this.$router.push({ name: "userInfo" });
    },
    createVeggie() {
      this.$router.push({ name: "createVeggiePost" });
    },
    viewVeggies() {
      this.$router.push({ name: "myVeggiePosts" });
    },
  },
};
</script>

<style scoped></style>
