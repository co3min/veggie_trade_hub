<template>
  <div
    v-if="post"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg p-6 w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <button @click="closeDialog" class="text-gray-500 hover:text-gray-700">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <!-- Render carousel only if there are images -->
      <template v-if="post.images && post.images.length > 0">
        <!-- Carousel -->
        <carousel :items-to-show="1">
          <slide v-for="(image, index) in post.images" :key="index">
            <img :src="image.url" :alt="image.alt" class="w-full h-auto mb-4" />
          </slide>
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </template>
      <div>
        <p class="text-sm text-gray-600">Price: {{ post.price }}</p>
        <p class="text-sm text-gray-600">Stock: {{ post.stock }}</p>
        <p class="text-sm text-gray-600">Unit: {{ post.unit }}</p>
        <p class="text-sm text-gray-600">Location: {{ post.location }}</p>
        <p class="text-sm text-gray-600">Phone Number: {{ post.phoneNo }}</p>
        <p v-if="post.description" class="text-sm text-gray-600">
          Description: <br />
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped></style>
