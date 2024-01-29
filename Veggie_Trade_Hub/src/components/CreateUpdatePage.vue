<template>
  <div>
    <Navbar></Navbar>
    <div
      class="container mx-auto mt-8 px-4 sm:px-8 md:px-16 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
      <h1 class="text-2xl font-bold mb-8 text-center">
        {{ formMode === "create" ? "Create" : "Update" }} Veggie Post
      </h1>

      <form
        @submit.prevent="submitForm"
        class="text-center border border-black rounded-md mb-8 p-8">
        <div class="mb-4">
          <label for="title" class="block text-xl font-semibold text-gray-600"
            >Title</label
          >
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
            class="block text-xl font-semibold text-gray-600"
            >Description</label
          >
          <textarea
            v-model="veggiePost.description"
            id="description"
            rows="4"
            class="w-full mt-1 p-4 border rounded-md"></textarea>
        </div>

        <div class="mb-4">
          <label for="price" class="block text-xl font-semibold text-gray-600"
            >Price</label
          >
          <input
            v-model="veggiePost.price"
            type="number"
            id="price"
            required
            min="0"
            class="w-full mt-1 p-2 border rounded-md" />
        </div>

        <div class="mb-4">
          <label for="stock" class="block text-xl font-semibold text-gray-600"
            >Stock</label
          >
          <input
            v-model="veggiePost.stock"
            type="number"
            id="stock"
            required
            min="0"
            class="w-full mt-1 p-2 border rounded-md" />
        </div>

        <div class="mb-4">
          <label for="unit" class="block text-xl font-semibold text-gray-600"
            >Unit</label
          >
          <input
            v-model="veggiePost.unit"
            type="text"
            id="unit"
            required
            class="w-full mt-1 p-2 border rounded-md" />
        </div>

        <div class="mb-4">
          <label
            for="location"
            class="block text-xl font-semibold text-gray-600"
            >Location</label
          >
          <input
            v-model="veggiePost.location"
            type="text"
            id="location"
            required
            class="w-full mt-1 p-2 border rounded-md" />
        </div>

        <div class="mb-4">
          <label for="phoneNo" class="block text-xl font-semibold text-gray-600"
            >Phone number</label
          >
          <input
            v-model="veggiePost.phoneNo"
            type="text"
            id="phoneNo"
            required
            class="w-full mt-1 p-2 border rounded-md" />
        </div>

        <div class="mb-4">
          <label for="image" class="block text-xl font-semibold text-gray-600"
            >Image</label
          >
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
          {{ formMode === "create" ? "Submit" : "Update" }}
        </button>
      </form>
    </div>
    <div
      :class="{
        'fixed top-0 right-0 mt-4 mr-4 p-4 rounded-xl z-20 bg-green-300':
          showAlert,
        'fixed top-0 right-0 mt-4 mr-4 p-4 rounded-xl z-20 bg-red-300':
          showError,
      }">
      {{ alertMessage }}
    </div>
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
      showAlert: false,
      showError: false,
      alertMessage: "",
      veggiePost: {
        id: null,
        title: "",
        description: "",
        price: 0,
        stock: 0,
        unit: "",
        location: "",
        phoneNo: "",
        images: [],
        userID: "",
      },
      formMode: "create",
    };
  },
  created() {
    const veggiePostId = this.$route.params.id;
    if (veggiePostId) {
      axios
        .get(`http://localhost:5001/veggie/post/${veggiePostId}`)
        .then((response) => {
          this.veggiePost = response.data;
          this.veggiePost.id = veggiePostId;
          this.formMode = "update";
        })
        .catch((error) => {
          console.error("Error fetching veggie post:", error);
        });
    }
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
        } else {
          this.showError = true;
          this.alertMessage = "You can upload a maximum of 5 images.";
          setTimeout(() => {
            this.showError = false;
            this.alertMessage = "";
          }, 3000);
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

      try {
        if (this.formMode === "create") {
          const responseToPost = await axios.post(
            "http://localhost:5001/veggie/newVeggiePost",
            {
              title: this.veggiePost.title,
              description: this.veggiePost.description,
              price: this.veggiePost.price,
              stock: this.veggiePost.stock,
              unit: this.veggiePost.unit,
              location: this.veggiePost.location,
              phoneNo: this.veggiePost.phoneNo,
              images: this.veggiePost.images,
              userID: this.veggiePost.userID,
            }
          );

          this.showAlert = true;
          this.alertMessage = "VeggiePost successfully created !";
          setTimeout(() => {
            this.showAlert = false;
            this.alertMessage = "";
            this.$router.push("/myVeggiePosts");
          }, 3000);
        } else if (this.formMode === "update") {
          const responseToUpdate = await axios.put(
            `http://localhost:5001/veggie/post/update/${this.veggiePost.id}`,
            {
              title: this.veggiePost.title,
              description: this.veggiePost.description,
              price: this.veggiePost.price,
              stock: this.veggiePost.stock,
              unit: this.veggiePost.unit,
              location: this.veggiePost.location,
              phoneNo: this.veggiePost.phoneNo,
              images: this.veggiePost.images,
              userID: this.veggiePost.userID,
            }
          );

          this.showAlert = true;
          this.alertMessage = "VeggiePost successfully updated!";
          setTimeout(() => {
            this.showAlert = false;
            this.alertMessage = "";
            this.$router.push("/myVeggiePosts");
          }, 3000);
        }
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

<style scoped></style>
