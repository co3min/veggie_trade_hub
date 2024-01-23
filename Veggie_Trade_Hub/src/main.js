import "./assets/style.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store.js";
import getUserFromCookie from "./components/userService.js";
// import VueCookies from "vue-cookies";

const app = createApp(App);

app.use(router);
app.use(store);
// app.use(VueCookies); // Use the VueCookies plugin

let user = await getUserFromCookie();

store.commit("setUser", user);

app.mount("#app");
