import "./assets/style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store.js";
// import VueCookies from "vue-cookies";

const app = createApp(App);

app.use(router);
app.use(store);
// app.use(VueCookies); // Use the VueCookies plugin

await store.dispatch("fetchUser");

app.mount("#app");
