<template>
  <div
    class="bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
    <div class="flex items-center cursor-pointer">
      <h1 class="text-xl">Veggie Trade Hub</h1>
    </div>

    <span
      @click="MenuOpen()"
      class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl">
      <i :class="[open ? 'bi bi-x' : 'bi bi-filter-left']"></i>
    </span>

    <ul
      class="md:flex md:items-center md:px-0 px-10 md:pb-0 pb-10 md:static absolute bg-gray-900 md:w-auto w-full top-14 duration-700 ease-in"
      :class="[open ? 'left-0' : 'right-[-100%]']">
      <li class="md:mx-4 md:my-0 my-6" v-for="link in links" :key="link.name">
        <a :href="link.link" class="text-xl hover:text-blue-500">{{
          link.name
        }}</a>
      </li>

      <Button :handleClick="handleLoginUpClick"></Button>
    </ul>
  </div>
</template>

<script>
import Button from "../components/ButtonLogin.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  components: {
    Button,
  },
  setup() {
    let open = ref(false);
    let links = [
      { name: "Home", link: "#" },
      { name: "About", link: "#" },
      { name: "Contact", link: "#" },
    ];

    const router = useRouter();

    const handleLoginUpClick = () => {
      router.push("/login");
      open.value = false;
    };

    function MenuOpen() {
      open.value = !open.value;
    }

    return { links, open, MenuOpen, handleLoginUpClick };
  },
};
</script>
