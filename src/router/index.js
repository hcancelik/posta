import { createRouter, createWebHashHistory } from "vue-router";
import Inbox from "../views/Inbox.vue";
import Settings from "../views/Settings.vue";

const routes = [
  {
    path: "/",
    name: "inbox",
    component: Inbox,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
