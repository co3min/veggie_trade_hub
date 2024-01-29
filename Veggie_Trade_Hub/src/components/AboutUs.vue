<template>
  <template v-if="user">
    <div>
      <Navbar> </Navbar>
    </div>
  </template>
  <template v-else>
    <div>
      <Navbar> </Navbar>
    </div>
  </template>
  <div>
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 class="text-3xl font-bold mb-4">About Us</h2>
        <p class="text-lg mb-8">
          At Veggie Trade Hub, we're passionate about fostering a community of
          individuals who share a love for fresh, locally sourced vegetables.
          Our platform serves as a hub where growers and consumers can come
          together to exchange produce, support local agriculture, and promote
          sustainable living.
        </p>
        <h3 class="text-xl font-bold mb-2">Our Mission</h3>
        <p class="text-lg mb-8">
          Our mission is to revolutionize the way vegetables are traded by
          providing a convenient and transparent platform for growers and buyers
          to connect directly. By eliminating the middleman, we empower both
          producers and consumers, promoting fair trade practices and enhancing
          food security.
        </p>
        <h3 class="text-xl font-bold mb-2">How It Works</h3>
        <p class="text-lg mb-8">
          Veggie Trade Hub simplifies the process of buying and selling
          vegetables. Growers can create listings for their available produce,
          detailing the variety, quantity, and pricing. Buyers can then browse
          these listings, connect with sellers, and arrange transactions
          seamlessly through our platform. With our intuitive interface and
          secure communication tools, trading veggies has never been easier.
        </p>
        <h2 class="text-3xl font-bold mb-4">Contact Us</h2>
        <p class="text-lg mb-8">
          Have questions or feedback? We'd love to hear from you! Reach out to
          our dedicated support team at
          <a
            href="mailto:contact@veggietradehub.com"
            class="text-blue-600 hover:underline"
            >contact@veggietradehub.com</a
          >, and we'll be happy to assist you.
        </p>
        <p class="text-lg">
          Connect with us on social media for the latest news, updates, and
          tips:
        </p>
        <div class="flex items-center space-x-4 mt-4">
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600"
            aria-label="Twitter">
            <svg
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path
                d="M22.46 5.54c-.81.36-1.68.6-2.6.71a4.53 4.53 0 001.98-2.5 9.05 9.05 0 01-2.87 1.1 4.52 4.52 0 00-7.7 4.12 12.81 12.81 0 01-9.3-4.73 4.49 4.49 0 001.4 6.01 4.5 4.5 0 01-2.04-.56c-.01.05-.01.1-.01.16a4.5 4.5 0 003.62 4.42 4.54 4.54 0 01-2.02.08 4.51 4.51 0 004.21 3.13 9.03 9.03 0 01-5.6 1.93A9.18 9.18 0 010 18.85a12.8 12.8 0 006.94 2.03c8.3 0 12.84-6.9 12.84-12.84 0-.2 0-.41-.02-.61a9.15 9.15 0 002.24-2.33c-.8.36-1.66.6-2.53.7a4.3 4.3 0 001.97-2.51z" />
            </svg>
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600"
            aria-label="Facebook">
            <svg
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path
                d="M22 2H2a2 2 0 00-2 2v18a2 2 0 002 2h9v-9h-2V9h2V7c0-2.76 2.24-5 5-5h3v4h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2v9h4a2 2 0 002-2V4a2 2 0 00-2-2z" />
            </svg>
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600"
            aria-label="Instagram">
            <svg
              class="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path
                d="M12 2.75c3.15 0 3.53.01 4.78.07 1.13.06 1.9.25 2.43.43.65.26 1.13.59 1.63 1.08.5.5.82.98 1.08 1.63.18.53.37 1.3.43 2.43.06 1.25.07 1.63.07 4.78s-.01 3.53-.07 4.78c-.06 1.13-.25 1.9-.43 2.43-.26.65-.59 1.13-1.08 1.63-.5.5-.98.82-1.63 1.08-.53.18-1.3.37-2.43.43-1.25.06-1.63.07-4.78.07s-3.53-.01-4.78-.07c-1.13-.06-1.9-.25-2.43-.43-.65-.26-1.13-.59-1.63-1.08-.5-.5-.82-.98-1.08-1.63-.18-.53-.37-1.3-.43-2.43-.06-1.25-.07-1.63-.07-4.78s.01-3.53.07-4.78c.06-1.13.25-1.9.43-2.43.26-.65.59-1.13 1.08-1.63.5-.5.98-.82 1.63-1.08.53-.18 1.3-.37 2.43-.43 1.25-.06 1.63-.07 4.78-.07zM12 0C8.1 0 7.55.01 6.3.07c-1.84.1-2.9.51-3.9 1.51S1.17 4.46 1.07 6.3C.97 7.55.96 8.1.96 12s.01 3.45.07 4.7c.1 1.84.51 2.9 1.51 3.9s2.06 1.41 3.9 1.51C8.55 23.99 9.1 24 12 24s3.45-.01 4.7-.07c1.84-.1 2.9-.51 3.9-1.51s1.41-2.06 1.51-3.9c.06-1.25.07-1.8.07-4.7s-.01-3.45-.07-4.7c-.1-1.84-.51-2.9-1.51-3.9s-2.06-1.41-3.9-1.51C15.45.01 14.9 0 12 0zm0 5a7 7 0 110 14 7 7 0 010-14zm0 11a4 4 0 110-8 4 4 0 010 8zm8-11.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
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

<style scoped></style>
