<template>
  <div>
    <CreateUpdatePage :veggiePost="veggiePost" />
  </div>
</template>

<script>
import CreateUpdatePage from "./CreateUpdatePage.vue";

export default {
  components: {
    CreateUpdatePage,
  },
  data() {
    return {
      veggiePost: {},
    };
  },
};
</script>
