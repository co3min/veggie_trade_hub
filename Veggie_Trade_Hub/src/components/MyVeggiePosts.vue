<template>
  <template v-if="user">
    <div>
      <Navbar></Navbar>
      <div class="overflow-x-auto">
        <table
          class="min-w-full divide-y divide-gray-200 border border-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Image
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Title
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Stock
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Unit
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">
                Location
              </th>
              <th
                scope="col"
                class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="post in veggiePosts" :key="post.id">
              <td class="px-6 py-4 whitespace-nowrap border-r">
                <img
                  v-bind:src="post.images.length > 0 ? post.images[0].url : ''"
                  alt="Post Image"
                  class="h-10 w-10 rounded-full" />
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-r">
                {{ post.title }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-r">
                {{ post.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-r">
                {{ post.stock }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-r">
                {{ post.unit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap border-r">
                {{ post.location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  @click="openDialog(post)"
                  class="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 py-1 px-3 rounded-md">
                  View
                </button>
                <button
                  @click="updatePost(post)"
                  class="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 py-1 px-3 rounded-md">
                  Update
                </button>
                <button
                  @click="deletePost(post.id)"
                  class="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 py-1 px-3 rounded-md">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <DialogPost :post="selectedPost" @close="closeDialog"></DialogPost>
    </div>
  </template>
  <template v-else>
    <h3>Unauthorized</h3>
  </template>
</template>

<script>
import Navbar from "./Navbar.vue";
import DialogPost from "./DialogPost.vue";
import CreateUpdatePage from "./CreateUpdatePage.vue";

export default {
  components: {
    Navbar,
    DialogPost,
    CreateUpdatePage,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    veggiePosts() {
      return this.$store.state.veggiePosts || [];
    },
  },
  data() {
    return {
      selectedPost: null,
    };
  },
  created() {
    this.fetchOwnUserVeggiePosts();
  },
  methods: {
    async fetchOwnUserVeggiePosts() {
      try {
        await this.$store.dispatch("fetchOwnUserVeggiePosts");
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
    async deletePost(postId) {
      try {
        await this.$store.dispatch("deleteVeggiePost", postId);
        await this.fetchOwnUserVeggiePosts();
      } catch (error) {
        console.error("Error deleting veggie post:", error);
      }
    },
    updatePost(post) {
      this.$router.push({ name: "updateVeggiePost", params: { id: post.id } });
    },
  },
};
</script>
