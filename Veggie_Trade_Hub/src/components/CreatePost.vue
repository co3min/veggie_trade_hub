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
};
</script>
