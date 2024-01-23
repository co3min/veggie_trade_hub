<template>
  <button
    @click="handleClick()"
    class="bg-blue-400 hover:bg-blue-500 duration-300 font-sm text-white rounded py-1.5 px-4">{{ message }}</button>
</template>

<script>
export default {
  props: {
    handleClick: Function,
    message: String,
  },
};
</script>
