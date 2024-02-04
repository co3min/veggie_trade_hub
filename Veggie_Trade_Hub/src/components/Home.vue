<template>
  <template v-if="user">
    <div>
      <Navbar> </Navbar>
    </div>
    <div class="flex justify-center mb-2 mt-2">
      <input
        v-model="searchTitle"
        type="text"
        placeholder="Search by title"
        class="w-full md:w-1/2 p-2 border border-black rounded-md" />
    </div>
    <div
      class="bg-gray-200 min-h-screen justify-normal items-start grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 overflow-hidden">
      <div
        v-for="(post, index) in filteredVeggiePosts"
        :key="index"
        class="w-auto p-2 bg-white rounded-xl mt-3 mb-3 ml-3 mr-3">
        <img
          class="h-40 object-cover rounded-xl w-full"
          v-bind:src="post.images.length > 0 ? post.images[0].url : ''"
          alt="Veggie Post Image" />
        <div class="p-2">
          <h2 class="font-bold text-lg">{{ post.title }}</h2>
          <p class="text-sm text-gray-600">Price: {{ post.price }}</p>
          <p class="text-sm text-gray-600">Stock: {{ post.stock }}</p>
          <p class="text-sm text-gray-600">Unit: {{ post.unit }}</p>
          <p class="text-sm text-gray-600">Location: {{ post.location }}</p>
        </div>
        <div class="m-2">
          <button
            @click="openDialog(post)"
            class="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-800">
            View more
          </button>
        </div>
      </div>

      <DialogPost
        :post="selectedPost"
        v-if="selectedPost"
        @close="closeDialog" />
    </div>
  </template>
  <template v-else>
    <div>
      <Navbar> </Navbar>
    </div>
    <div class="flex justify-center mb-2 mt-2">
      <input
        v-model="searchTitle"
        type="text"
        placeholder="Search by title"
        class="w-full md:w-1/2 p-2 border border-black rounded-md" />
    </div>
    <div
      class="bg-gray-200 min-h-screen justify-normal items-start grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 overflow-hidden">
      <div
        v-for="(post, index) in filteredVeggiePosts"
        :key="index"
        class="w-auto p-2 bg-white rounded-xl mt-3 mb-3 ml-3 mr-3">
        <img
          class="h-40 object-cover rounded-xl w-full"
          v-bind:src="post.images.length > 0 ? post.images[0].url : ''"
          alt="Veggie Post Image" />
        <div class="p-2">
          <h2 class="font-bold text-lg">{{ post.title }}</h2>
          <p class="text-sm text-gray-600">Price: {{ post.price }}</p>
          <p class="text-sm text-gray-600">Stock: {{ post.stock }}</p>
          <p class="text-sm text-gray-600">Unit: {{ post.unit }}</p>
          <p class="text-sm text-gray-600">Location: {{ post.location }}</p>
        </div>
        <div class="m-2">
          <button
            @click="openDialog(post)"
            class="text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-800">
            View more
          </button>
        </div>
      </div>

      <DialogPost
        :post="selectedPost"
        v-if="selectedPost"
        @close="closeDialog" />
    </div>
  </template>
</template>

<script>
import Navbar from "./Navbar.vue";
import DialogPost from "./DialogPost.vue";

export default {
  components: {
    Navbar,
    DialogPost,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    allVeggiePosts() {
      return this.$store.state.allVeggiePosts || [];
    },
    filteredVeggiePosts() {
      if (!this.searchTitle) {
        return this.allVeggiePosts;
      }
      const searchTerm = this.searchTitle.toLowerCase();
      return this.allVeggiePosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm)
      );
    },
  },
  data() {
    return {
      selectedPost: null,
      searchTitle: "",
    };
  },
  created() {
    this.fetchAllVeggiePosts();
  },
  methods: {
    async fetchAllVeggiePosts() {
      try {
        await this.$store.dispatch("fetchAllVeggiePosts");
        console.log(this.allVeggiePosts);
      } catch (error) {
        console.error("Error fetching veggiePosts data:", error);
      }
    },
    openDialog(post) {
      this.selectedPost = post;
    },
    closeDialog() {
      this.selectedPost = null;
    },
  },
};
</script>

<style scoped></style>
