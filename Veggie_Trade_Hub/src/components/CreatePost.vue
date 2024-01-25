<template>
  <div>
    <Navbar> </Navbar>
  </div>
  <div
    class="container mx-auto mt-8 px-4 sm:px-8 md:px-16 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
    <h1 class="text-2xl font-bold mb-8 text-center">Create Veggie Post</h1>

    <form
      @submit.prevent="submitForm"
      class="text-center border border-black rounded-md mb-8 p-8">
      <div class="mb-4">
        <label for="title" class="block text-xl font-semibold text-gray-600">
          Title
        </label>
        <input
          v-model="veggiePost.title"
          type="text"
          id="title"
          required
          class="w-full mt-1 p-4 border rounded-md" />
      </div>

      <div class="mb-4">
        <label
          for="description"
          class="block text-xl font-semibold text-gray-600">
          Description
        </label>
        <textarea
          v-model="veggiePost.description"
          id="description"
          rows="4"
          class="w-full mt-1 p-4 border rounded-md"></textarea>
      </div>

      <div class="mb-4">
        <label for="price" class="block text-xl font-semibold text-gray-600">
          Price
        </label>
        <input
          v-model="veggiePost.price"
          type="number"
          id="price"
          required
          min="0"
          class="w-full mt-1 p-2 border rounded-md" />
      </div>

      <div class="mb-4">
        <label for="stock" class="block text-xl font-semibold text-gray-600">
          Stock
        </label>
        <input
          v-model="veggiePost.stock"
          type="number"
          id="stock"
          required
          min="0"
          class="w-full mt-1 p-2 border rounded-md" />
      </div>

      <div class="mb-4">
        <label for="unit" class="block text-xl font-semibold text-gray-600">
          Unit
        </label>
        <input
          v-model="veggiePost.unit"
          type="text"
          id="unit"
          required
          class="w-full mt-1 p-2 border rounded-md" />
      </div>

      <div class="mb-4">
        <label for="location" class="block text-xl font-semibold text-gray-600">
          Location
        </label>
        <input
          v-model="veggiePost.location"
          type="text"
          id="location"
          required
          class="w-full mt-1 p-2 border rounded-md" />
      </div>

      <div class="mb-4">
        <label for="image" class="block text-xl font-semibold text-gray-600">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          multiple
          @change="handleImageChange"
          class="w-full mt-1 p-2 border rounded-md" />
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-xl sm:text-base">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  components: {
    Navbar,
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      formData: null,
      veggiePost: {
        title: "",
        description: "",
        price: 0,
        stock: 0,
        unit: "",
        location: "",
        images: [],
        userID: "",
      },
    };
  },
  methods: {
    handleImageChange(event) {
      const files = event.target.files;
      if (files.length > 0) {
        if (this.veggiePost.images.length + files.length <= 5) {
          this.formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            this.formData.append("images", files[i]);
          }
          console.log(this.formData);
        } else {
          alert("You can upload a maximum of 5 images.");
        }
      }
    },
    async submitForm() {
      this.veggiePost.userID = this.user.id;
      if (this.formData != null) {
        try {
          const response = await axios.post(
            "http://localhost:5001/veggie/upload",
            this.formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (response.status === 200) {
            const imageUrls = response.data;
            this.veggiePost.images.push(...imageUrls);
          } else {
            console.error("Failed to upload images");
          }
        } catch (error) {
          console.log(error);
        }
      }

      console.log("Submitted VeggiePost:", this.veggiePost);
    },
  },
};
</script>

<style scoped>
/* Add your custom styling or adjustments here */
</style>
