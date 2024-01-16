<template>
  <div class="signup-container">
    <div class="form-container">
      <h2>Create an Account</h2>
      <form @submit.prevent="handleSubmit" class="signup-form">
        <div class="form-group">
          <label for="firstname">First Name:</label>
          <input v-model="firstname" type="text" id="firstname" required />
        </div>

        <div class="form-group">
          <label for="lastname">Last Name:</label>
          <input v-model="lastname" type="text" id="lastname" required />
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>

          <input
            v-if="showPassword"
            type="text"
            class="input"
            v-model="password"
          />
          <input v-else type="password" class="input" v-model="password" />
          <div class="showclass">
            <button @click="toggleShow">Show Password</button>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>

    <div class="image-container">
      <img src="../assets/veggie_Account.jpg" alt="Signup Image" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      showPassword: false,
    };
  },
  methods: {
    toggleShow() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      try {
        const response = await axios.post(
          "http://localhost:5001/veggie/newUser",
          {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
          }
        );

        console.log("Response from server:", response.data);

        // You can handle the response or perform additional actions here
      } catch (error) {
        console.log(error.response.data);
      }
    },
  },
};
</script>

<style scoped>
.showclass {
  text-align: center;
}

.showclass > button {
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 2px;
  font-size: 12px;
  cursor: pointer;
}

.signup-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80vh;
  padding: 20px;
}

.form-container {
  width: 70%;
  max-width: 700px; /* Limit maximum width for larger screens*/
  padding: 40px;
  box-shadow: 0 4px 8px black;
  border-radius: 8px;
}

h2 {
  text-align: center;
  color: #333;
}

.signup-form {
  display: grid;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.image-container {
  flex: 1;
  margin-left: 20px; /* Add space between the form and image */
}

img {
  width: auto;
  height: auto;
  border-radius: 8px;
}

/* Add responsive styles for smaller screens if needed */
@media screen and (max-width: 1024px) {
  .signup-container {
    flex-direction: column;
  }

  .form-container,
  .image-container {
    width: 100%;
    margin: 20px 0;
  }
}
</style>
