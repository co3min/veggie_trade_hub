<template>
  <div>
    <h2 id="name">Veggie Trade Hub</h2>
  </div>
  <div class="login-container">
    <form class="login-form">
      <h1>Login</h1>
      <label for="username">Username:</label>
      <input
        v-model="username"
        type="text"
        id="username"
        name="username"
        placeholder="Enter your username"
        required
      />
      <label for="password">Password:</label>
      <input
        v-model="password"
        type="password"
        id="password"
        name="password"
        placeholder="Enter your password"
        required
      />
      <div class="button">
        <button @click.prevent="login">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("Logging in with:", this.username, this.password);
    },
  },
};
</script>

<style scoped>
#name {
  text-align: center;
  margin-bottom: 20px;
}

.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
}

.login-form {
  max-width: 40rem;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 6px;
  margin-bottom: 16px;
}

.button {
  text-align: center;
}

button {
  width: 50%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 600px) {
  .login-container {
    height: 100%;
  }

  .login-form {
    max-width: 100%;
  }
}
</style>
