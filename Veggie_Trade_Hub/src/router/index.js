import { createRouter, createWebHistory } from "vue-router";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import UserInfo from "../components/UserInfo.vue";
import CreatePost from "../components/CreatePost.vue";
import MyVeggiePosts from "../components/MyVeggiePosts.vue";
import UpdatePost from "../components/UpdatePost.vue";
import AboutUs from "../components/AboutUs.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/userInfo",
      name: "userInfo",
      component: UserInfo,
    },
    {
      path: "/createVeggiePost",
      name: "createVeggiePost",
      component: CreatePost,
    },
    {
      path: "/myVeggiePosts",
      name: "myVeggiePosts",
      component: MyVeggiePosts,
    },
    {
      path: "/updateVeggiePost/:id",
      name: "updateVeggiePost",
      component: UpdatePost,
    },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: AboutUs,
    },
  ],
});

export default router;
