<template>
  <template v-if="user">
    <div>
      <Navbar> </Navbar>
    </div>
    <div
      class="bg-gray-200 w-full min-h-screen flex justify-normal items-start">
      <div
        v-for="(post, index) in allVeggiePosts"
        :key="index"
        class="w-60 p-2 bg-white rounded-xl mt-3 ml-3 mr-3">
        <img
          class="h-40 object-cover rounded-xl"
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
    <div
      class="bg-gray-200 w-full min-h-screen flex justify-normal items-start">
      <div
        v-for="(post, index) in allVeggiePosts"
        :key="index"
        class="w-60 p-2 bg-white rounded-xl mt-3 ml-3 mr-3">
        <img
          class="h-40 object-cover rounded-xl"
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
  },
  data() {
    return {
      selectedPost: null,
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
